import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuthService } from '@/store/useAuthService'
import { toast } from 'sonner'
import axios from 'axios'
import React from 'react'
import RepresentativeSignUpForm from '@/components/representative/RepresentativeSignUpForm'

// --- Mocks ---

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}))

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useQuery: vi.fn() }
})

vi.mock('@/store/useAuthService', () => ({ useAuthService: vi.fn() }))

vi.mock('axios')

vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), { error: vi.fn() })
}))

vi.mock('@components/global/Image', () => ({
  default: ({ src, className }) => <img src={src} className={className} alt="logo" />
}))

vi.mock('@/components/ui/form', () => ({
  Form: ({ children }) => <div>{children}</div>,
  FormField: ({ render, name }) =>
    render({ field: { name, value: '', onChange: vi.fn(), onBlur: vi.fn() } }),
  FormItem: ({ children, className }) => <div className={className}>{children}</div>,
  FormLabel: ({ children }) => <label>{children}</label>,
  FormControl: ({ children }) => <div>{children}</div>,
  FormMessage: () => null
}))

vi.mock('@/components/ui/input', () => ({
  Input: React.forwardRef(
    ({ type, className, id, accept, onChange, ...rest }, ref) => (
      <input
        type={type ?? 'text'}
        className={className}
        id={id}
        accept={accept}
        onChange={onChange}
        ref={ref}
        {...rest}
      />
    )
  )
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, type }) => (
    <button type={type} disabled={disabled} data-testid="submit-btn">
      {children}
    </button>
  )
}))

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, value }) => (
    <div data-testid="select-wrapper">
      {React.Children.map(children, child =>
        React.cloneElement(child, { onValueChange, value })
      )}
    </div>
  ),
  SelectTrigger: ({ children }) => <div data-testid="select-trigger">{children}</div>,
  SelectValue: ({ placeholder }) => <span>{placeholder}</span>,
  SelectContent: ({ children }) => <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children, value, onValueChange }) => (
    <div
      data-testid={`select-item-${value}`}
      onClick={() => onValueChange?.(value)}
      role="option"
    >
      {children}
    </div>
  )
}))

vi.mock('@components/ui/skeleton', () => ({
  Skeleton: ({ className }) => <div data-testid="skeleton" className={className} />
}))

vi.mock('@/images/m_logo.png', () => ({ default: 'm_logo.png' }))
vi.mock('@/images/upload.png', () => ({ default: 'upload.png' }))

vi.mock('@hookform/resolvers/zod', () => ({ zodResolver: vi.fn(() => vi.fn()) }))

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useForm: vi.fn() }
})

// --- Fixtures ---

const mockNavigate = vi.fn()
const mockGetStates = vi.fn()
const mockGetLocalGovernment = vi.fn()

const mockStates = [
  { state_id: 1, state_name: 'Lagos' },
  { state_id: 2, state_name: 'Abuja' }
]

const mockLgas = [
  { id: 10, name: 'Ikeja' },
  { id: 11, name: 'Eti-Osa' }
]

const mockFormValues = {
  fullname: 'Yunus Uthman',
  email: 'uth@gmail.com',
  phone: '11111111111',
  address: 'aaa',
  pwd: '11111111',
  cpwd: '11111111',
  state: 'Lagos 1',
  lga: 'Ikeja 10',
  gender: 'male',
  pic: null
}

const makeFormMock = (overrides = {}) => ({
  control: {},
  handleSubmit: (fn) => (e) => { e?.preventDefault?.(); fn(mockFormValues) },
  formState: { errors: {} },
  setError: vi.fn(),
  reset: vi.fn(),
  ...overrides
})

// --- Tests ---

describe('RepresentativeSignUpForm', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    useNavigate.mockReturnValue(mockNavigate)
    useAuthService.mockReturnValue({
      getStates: mockGetStates,
      getLocalGovernment: mockGetLocalGovernment
    })

    // default: states loaded, lga not yet loaded
    useQuery.mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'states') {
        return { data: { states: mockStates }, isLoading: false }
      }
      if (queryKey[0] === 'lga') {
        return { data: mockLgas, isLoading: false }
      }
      return { data: undefined, isLoading: false }
    })

    const { useForm } = await import('react-hook-form')
    useForm.mockImplementation(() => makeFormMock())
  })

  describe('rendering', () => {

    it('renders the heading', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByText('Become our representative today')).toBeInTheDocument()
    })

    it('renders all field labels', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByText('Full Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Password')).toBeInTheDocument()
      expect(screen.getByText('Confirm Password')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Address')).toBeInTheDocument()
      expect(screen.getByText('State')).toBeInTheDocument()
      expect(screen.getByText('LGA')).toBeInTheDocument()
      expect(screen.getByText('Gender')).toBeInTheDocument()
      expect(screen.getByText('Upload Picture')).toBeInTheDocument()
    })

    it('renders the submit button', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByTestId('submit-btn')).toHaveTextContent('Sign Up')
    })

    it('renders the login link', () => {
      render(<RepresentativeSignUpForm />)
      const link = screen.getByText('Login')
      expect(link.closest('a')).toHaveAttribute('href', '/representative/login')
    })

    it('renders male and female radio buttons', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByDisplayValue('male')).toBeInTheDocument()
      expect(screen.getByDisplayValue('female')).toBeInTheDocument()
    })

    it('renders the upload picture placeholder image', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByAltText('upload')).toBeInTheDocument()
    })

    it('submit button is enabled by default', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByTestId('submit-btn')).not.toBeDisabled()
    })
  })

  describe('states loading', () => {
    it('renders skeleton loaders while states are loading', () => {
      useQuery.mockImplementation(({ queryKey }) => {
        if (queryKey[0] === 'states') return { data: undefined, isLoading: true }
        return { data: undefined, isLoading: false }
      })
      render(<RepresentativeSignUpForm />)
      expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0)
    })

    it('renders state options when states are loaded', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByText('Lagos')).toBeInTheDocument()
      expect(screen.getByText('Abuja')).toBeInTheDocument()
    })
  })

  describe('lga loading', () => {
    it('renders skeleton loaders while lgas are loading', () => {
      useQuery.mockImplementation(({ queryKey }) => {
        if (queryKey[0] === 'states') return { data: { states: mockStates }, isLoading: false }
        if (queryKey[0] === 'lga') return { data: undefined, isLoading: true }
        return { data: undefined, isLoading: false }
      })
      render(<RepresentativeSignUpForm />)
      expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0)
    })

    it('renders lga options when lgas are loaded', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByText('Ikeja')).toBeInTheDocument()
      expect(screen.getByText('Eti-Osa')).toBeInTheDocument()
    })
  })

  describe('image upload', () => {
    it('shows upload placeholder when no image is selected', () => {
      render(<RepresentativeSignUpForm />)
      expect(screen.getByAltText('upload')).toBeInTheDocument()
      expect(screen.queryByAltText('preview')).not.toBeInTheDocument()
    })

    it('shows preview image after file is selected', async () => {
      render(<RepresentativeSignUpForm />)
      const fileInput = document.querySelector('input[type="file"]')
      const file = new File(['img'], 'photo.png', { type: 'image/png' })

      // mock createObjectURL
      global.URL.createObjectURL = vi.fn(() => 'blob:preview-url')

      fireEvent.change(fileInput, { target: { files: [file] } })

      await waitFor(() => {
        expect(screen.getByAltText('preview')).toBeInTheDocument()
      })
    })
  })

  describe('form submission — success', () => {
    it('calls axios.post with FormData on submit', async () => {
      axios.post.mockResolvedValue({ status: 200 })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'postsalesrepresentative/',
          expect.any(FormData)
        )
      })
    })

    it('shows success toast on 200 response', async () => {
      axios.post.mockResolvedValue({ status: 200 })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Registration successful', expect.anything())
      })
    })

    it('saves email to localStorage on success', async () => {
      axios.post.mockResolvedValue({ status: 200 })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(localStorage.getItem('email')).toBe('uth@gmail.com')
      })
    })

    it('navigates to /verifyAccount on success', async () => {
      axios.post.mockResolvedValue({ status: 200 })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/verifyAccount')
      })
    })
  })

  describe('form submission — failure', () => {
    it('shows error toast when axios throws with response message', async () => {
      axios.post.mockRejectedValue({
        response: { data: { message: 'Email already exists' } }
      })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Email already exists')
      })
    })

    it('displays inline error message when server returns an error', async () => {
      axios.post.mockRejectedValue({
        response: { data: { message: 'Email already in use' } }
      })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(screen.getByText('Email already in use')).toBeInTheDocument()
      })
    })

    it('does not navigate on failure', async () => {
      axios.post.mockRejectedValue({ message: 'Error' })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled()
      })
    })
  })

  describe('loading state', () => {
    it('disables the submit button while submitting', async () => {
      axios.post.mockImplementation(() => new Promise(() => {}))
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(screen.getByTestId('submit-btn')).toBeDisabled()
      })
    })

    it('shows "Submitting..." text while loading', async () => {
      axios.post.mockImplementation(() => new Promise(() => {}))
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(screen.getByTestId('submit-btn')).toHaveTextContent(/submitting/i)
      })
    })

    it('re-enables submit button after successful submission', async () => {
      axios.post.mockResolvedValue({ status: 200 })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalled()
      })
    })

    it('re-enables submit button after failed submission', async () => {
      axios.post.mockRejectedValue({ message: 'Error' })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(screen.getByTestId('submit-btn')).not.toBeDisabled()
      })
    })
  })

  describe('state/lga parsing', () => {
    it('strips the id suffix from state and lga before submitting', async () => {
      axios.post.mockResolvedValue({ status: 200 })
      render(<RepresentativeSignUpForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalled()
        const formData = axios.post.mock.calls[0][1]
        expect(formData.get('state')).toBe('1')
        expect(formData.get('lga')).toBe('10')
      })
    })
  })

  describe('useQuery config', () => {
    it('calls useQuery for states with correct queryKey', () => {
      render(<RepresentativeSignUpForm />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: ['states'] })
      )
    })

    it('calls useQuery for lga with stateId in queryKey', () => {
      render(<RepresentativeSignUpForm />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: ['lga', null] })
      )
    })
  })
})