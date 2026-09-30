import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/useAuth'
import { toast } from 'sonner'
import React from 'react'
import RepresentativeLoginForm from '@/components/representative/RepresentativeLoginForm'

// --- Mocks ---

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}))

vi.mock('@/store/useAuth', () => ({ useAuth: vi.fn() }))

vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), { error: vi.fn() })
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className }) => <img src={src} className={className} alt="logo" />
}))

vi.mock('@/components/ui/form', () => ({
  Form: ({ children }) => <div>{children}</div>,
  FormField: ({ render, name }) =>
    render({ field: { name, value: '', onChange: vi.fn() } }),
  FormItem: ({ children }) => <div>{children}</div>,
  FormLabel: ({ children }) => <label>{children}</label>,
  FormControl: ({ children }) => <div>{children}</div>,
  FormMessage: () => null
}))

vi.mock('@/components/ui/input', () => ({
  Input: React.forwardRef(({ type, placeholder, ...rest }, ref) => (
    <input
      type={type ?? 'text'}
      placeholder={placeholder}
      ref={ref}
      {...rest}
    />
  ))
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, type }) => (
    <button type={type} disabled={disabled} data-testid="submit-btn">
      {children}
    </button>
  )
}))

vi.mock('@/images/m_logo.png', () => ({ default: 'm_logo.png' }))

vi.mock('@hookform/resolvers/zod', () => ({ zodResolver: vi.fn(() => vi.fn()) }))

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useForm: vi.fn() }
})

// --- Fixtures ---

const mockNavigate = vi.fn()
const mockLogin = vi.fn()
const mockSetRole = vi.fn()

const makeFormMock = (overrides = {}) => ({
  control: {},
  handleSubmit: (fn) => (e) => {
    e?.preventDefault?.()
    fn({ email: 'rep@example.com', password: 'Password1!' })
  },
  formState: { errors: {} },
  ...overrides
})

// --- Tests ---

describe('RepresentativeLoginForm', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    useNavigate.mockReturnValue(mockNavigate)

    // ✅ FIXED HERE
    useAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      role: null,
      setRole: mockSetRole,
    })

    const { useForm } = await import('react-hook-form')
    useForm.mockImplementation(() => makeFormMock())
  })

  describe('rendering', () => {
    it('renders the logo', () => {
      render(<RepresentativeLoginForm />)
      expect(screen.getByAltText('logo')).toBeInTheDocument()
    })

    it('renders the "Representative Login" heading', () => {
      render(<RepresentativeLoginForm />)
      expect(screen.getByText('Representative Login')).toBeInTheDocument()
    })

    it('renders the Email label', () => {
      render(<RepresentativeLoginForm />)
      expect(screen.getByText('Email')).toBeInTheDocument()
    })

    it('renders the Password label', () => {
      render(<RepresentativeLoginForm />)
      expect(screen.getByText('Password')).toBeInTheDocument()
    })

    it('renders the Forgot password link', () => {
      render(<RepresentativeLoginForm />)
      const link = screen.getByText('Forgot password?')
      expect(link).toBeInTheDocument()
      expect(link.closest('a')).toHaveAttribute('href', '/user/forgottenPassword')
    })

    it('renders the Sign up link', () => {
      render(<RepresentativeLoginForm />)
      const link = screen.getByText('Sign up')
      expect(link.closest('a')).toHaveAttribute('href', '/representativeSignup')
    })

    it('renders the Login submit button', () => {
      render(<RepresentativeLoginForm />)
      expect(screen.getByTestId('submit-btn')).toHaveTextContent('Login')
    })

    it('submit button is enabled when isLoading is false', () => {
      render(<RepresentativeLoginForm />)
      expect(screen.getByTestId('submit-btn')).not.toBeDisabled()
    })
  })

  describe('error from store', () => {
    it('renders error message when useAuth returns an error', () => {
      useAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
        error: 'Invalid credentials',
        role: null,
        setRole: mockSetRole
      })
      render(<RepresentativeLoginForm />)
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })

    it('does not render error message when error is null', () => {
      render(<RepresentativeLoginForm />)
      expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument()
    })
  })

  describe('loading state — driven by useAuth', () => {
    it('disables the submit button when isLoading is true', () => {
      useAuth.mockReturnValue({
        login: mockLogin,
        isLoading: true,
        error: null,
        role: null,
        setRole: mockSetRole
      })
      render(<RepresentativeLoginForm />)
      expect(screen.getByTestId('submit-btn')).toBeDisabled()
    })

    it('shows "Logging in..." text when isLoading is true', () => {
      useAuth.mockReturnValue({
        login: mockLogin,
        isLoading: true,
        error: null,
        role: null,
        setRole: mockSetRole
      })
      render(<RepresentativeLoginForm />)
      expect(screen.getByTestId('submit-btn')).toHaveTextContent('Logging in...')
    })

    it('shows "Login" text when isLoading is false', () => {
      render(<RepresentativeLoginForm />)
      expect(screen.getByTestId('submit-btn')).toHaveTextContent('Login')
    })
  })

  describe('form submission — success (200)', () => {
    it('calls login with the correct payload', async () => {
      mockLogin.mockResolvedValue({ status: 200 })
      render(<RepresentativeLoginForm />)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'rep@example.com',
          pwd: 'Password1!' // ✅ FIXED
        })
      })
    })
  })
})