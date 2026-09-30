import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/store/useAuth'
import LevelOneSignUpForm from '@/components/auth/LevelOneSignUpForm'
import React from 'react'

// --- Mocks ---

vi.mock('@/store/useAuth', () => ({ useAuth: vi.fn() }))

vi.mock('@/components/ui/form', () => ({
  FormField: ({ render, name }) =>
    render({ field: { name, value: '', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn() } }),
  FormItem: ({ children }) => <div>{children}</div>,
  FormLabel: ({ children, htmlFor }) => <label htmlFor={htmlFor}>{children}</label>,
  FormControl: ({ children }) => <div>{children}</div>,
  FormMessage: () => null
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ 'data-testid': testId, type, placeholder, onChange, ...rest }) => (
    <input
      data-testid={testId}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  )
}))

vi.mock('@/components/ui/radio-group', () => ({
  RadioGroup: ({ children, onValueChange, defaultValue }) => (
    <div data-testid="radio-group" onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </div>
  ),
  RadioGroupItem: ({ value, id, 'data-testid': testId }) => (
    <input type="radio" value={value} id={id} data-testid={testId} />
  )
}))

vi.mock('../../images/mdi-light_email.png', () => ({ default: 'email-icon.png' }))
vi.mock('../../images/mdi_password-outline.png', () => ({ default: 'password-icon.png' }))

// --- Fixtures ---

const mockForm = {
  control: {}
}

const mockHandleUpload = vi.fn()
const mockPicture = 'upload.png'

// --- Tests ---

describe('LevelOneSignUpForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ role: 'client' })
  })

  describe('common fields — rendered for all roles', () => {
    it('renders the firstName input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('firstName-input')).toBeInTheDocument()
    })

    it('renders the lastName input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('lastName-input')).toBeInTheDocument()
    })

    it('renders the email input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
    })

    it('renders the password input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('password-input')).toBeInTheDocument()
    })

    it('renders the confirmPassword input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('confirmPassword-input')).toBeInTheDocument()
    })

    it('renders the phone input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('phone-input')).toBeInTheDocument()
    })

    it('renders the file input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('file-input')).toBeInTheDocument()
    })

    it('renders male and female radio buttons', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('male-radio')).toBeInTheDocument()
      expect(screen.getByTestId('female-radio')).toBeInTheDocument()
    })

    it('renders the profile picture', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByAltText('Upload Icon')).toBeInTheDocument()
    })

    it('renders "Profile image" label', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByText('Profile image')).toBeInTheDocument()
    })

    it('renders the supported file format hint', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByText(/supports only/i)).toBeInTheDocument()
    })
  })

  describe('client role', () => {
    it('renders the username input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('username-input')).toBeInTheDocument()
    })

    it('does not render the business input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.queryByTestId('business-input')).not.toBeInTheDocument()
    })
  })

  describe('designer role', () => {
    beforeEach(() => {
      useAuth.mockReturnValue({ role: 'designer' })
    })

    it('renders the business input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('business-input')).toBeInTheDocument()
    })

    it('does not render the username input', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.queryByTestId('username-input')).not.toBeInTheDocument()
    })
  })

  describe('file upload', () => {
    it('calls handleUpload when a file is selected', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)

      const fileInput = screen.getByTestId('file-input')
      const file = new File(['img'], 'photo.png', { type: 'image/png' })

      fireEvent.change(fileInput, { target: { files: [file] } })

      expect(mockHandleUpload).toHaveBeenCalledTimes(1)
    })

    it('renders the picture passed via props as the upload preview', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture="custom-pic.png" />)

      const img = screen.getByAltText('Upload Icon')
      expect(img).toHaveAttribute('src', 'custom-pic.png')
    })

    it('file input accepts only image formats', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)

      const fileInput = screen.getByTestId('file-input')
      expect(fileInput).toHaveAttribute('accept', '.jpg,.jpeg,.gif,.png')
    })

    it('file input is hidden', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)

      const fileInput = screen.getByTestId('file-input')
      expect(fileInput).toHaveClass('hidden')
    })
  })

  describe('gender radio group', () => {
    it('renders Male label', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByText('Male')).toBeInTheDocument()
    })

    it('renders Female label', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByText('Female')).toBeInTheDocument()
    })

    it('male radio has value "Male"', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('male-radio')).toHaveAttribute('value', 'Male')
    })

    it('female radio has value "Female"', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('female-radio')).toHaveAttribute('value', 'Female')
    })
  })

  describe('input types', () => {
    it('email input has type "email"', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email')
    })

    it('password input has type "password"', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password')
    })

    it('confirmPassword input has type "password"', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('confirmPassword-input')).toHaveAttribute('type', 'password')
    })

    it('phone input has type "tel"', () => {
      render(<LevelOneSignUpForm form={mockForm} handleUpload={mockHandleUpload} picture={mockPicture} />)
      expect(screen.getByTestId('phone-input')).toHaveAttribute('type', 'tel')
    })
  })
})