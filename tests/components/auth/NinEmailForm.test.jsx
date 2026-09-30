import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import NinEmailForm from '@/components/auth/NinEmailForm'
import React from 'react'

// --- Mocks ---

vi.mock('axios')
vi.mock('js-cookie', () => ({ default: { set: vi.fn() } }))
vi.mock('sonner', () => ({ toast: Object.assign(vi.fn(), { error: vi.fn() }) }))

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
  Input: (props) => <input data-testid="email-input" {...props} />
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, type }) => (
    <button type={type} disabled={disabled} data-testid="submit-btn">
      {children}
    </button>
  )
}))

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useForm: vi.fn(() => ({
      control: {},
      handleSubmit: (fn) => (e) => {
        e?.preventDefault?.()
        fn({ email: 'test@example.com' })
      },
      formState: { errors: {} }
    }))
  }
})

// --- Setup ---

const mockSetServerState = vi.fn()

const defaultServerState = { isLoading: false, isReady: false }

// --- Tests ---

describe('NinEmailForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders the email input', () => {
      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      expect(screen.getByTestId('email-input')).toBeInTheDocument()
    })

    it('renders the form label', () => {
      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      expect(screen.getByText(/fill in your email/i)).toBeInTheDocument()
    })

    it('renders the submit button', () => {
      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      expect(screen.getByTestId('submit-btn')).toBeInTheDocument()
    })

    it('renders "Submit" text when not loading', () => {
      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      expect(screen.getByTestId('submit-btn')).toHaveTextContent('Submit')
    })
  })

  describe('loading state', () => {
    it('disables the submit button when isLoading is true', () => {
      render(<NinEmailForm serverState={{ ...defaultServerState, isLoading: true }} setServerState={mockSetServerState} />)

      expect(screen.getByTestId('submit-btn')).toBeDisabled()
    })

    it('shows "Submitting..." text when isLoading is true', () => {
      render(<NinEmailForm serverState={{ ...defaultServerState, isLoading: true }} setServerState={mockSetServerState} />)

      expect(screen.getByTestId('submit-btn')).toHaveTextContent(/submitting/i)
    })

    it('button is enabled when isLoading is false', () => {
      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      expect(screen.getByTestId('submit-btn')).not.toBeDisabled()
    })
  })

  describe('form submission — success (200)', () => {
    it('sets isLoading to true on submit', async () => {
      axios.post.mockResolvedValue({ status: 200, data: { access_token: 'tok_123' } })

      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      fireEvent.submit(screen.getByTestId('submit-btn').closest('form'))

      expect(mockSetServerState).toHaveBeenCalledWith(
        expect.objectContaining({ isLoading: true })
      )
    })

    it('sets the ninToken cookie on success', async () => {
      axios.post.mockResolvedValue({ status: 200, data: { access_token: 'tok_123' } })

      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      fireEvent.submit(screen.getByTestId('submit-btn').closest('form'))

      await waitFor(() => {
        expect(Cookies.set).toHaveBeenCalledWith('ninToken', 'tok_123')
      })
    })

    it('sets isReady to true and isLoading to false on success', async () => {
      axios.post.mockResolvedValue({ status: 200, data: { access_token: 'tok_123' } })

      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      fireEvent.submit(screen.getByTestId('submit-btn').closest('form'))

      await waitFor(() => {
        expect(mockSetServerState).toHaveBeenCalledWith(
          expect.objectContaining({ isReady: true, isLoading: false })
        )
      })
    })

    it('shows the "Upload your nin slip" toast on success', async () => {
      axios.post.mockResolvedValue({ status: 200, data: { access_token: 'tok_123' } })

      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      fireEvent.submit(screen.getByTestId('submit-btn').closest('form'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Upload your nin slip', expect.anything())
      })
    })
  })

  describe('form submission — success (201)', () => {
    it('handles 201 status the same as 200', async () => {
      axios.post.mockResolvedValue({ status: 201, data: { access_token: 'tok_abc' } })

      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      fireEvent.submit(screen.getByTestId('submit-btn').closest('form'))

      await waitFor(() => {
        expect(Cookies.set).toHaveBeenCalledWith('ninToken', 'tok_abc')
        expect(mockSetServerState).toHaveBeenCalledWith(
          expect.objectContaining({ isReady: true, isLoading: false })
        )
      })
    })
  })

  describe('form submission — server error response', () => {
    it('shows the server error toast when response contains an error field', async () => {
      axios.post.mockResolvedValue({ data: { error: 'Email not found' } })

      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      fireEvent.submit(screen.getByTestId('submit-btn').closest('form'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Email not found', expect.anything())
      })
    })

    it('sets isLoading to false when server returns an error field', async () => {
      axios.post.mockResolvedValue({ data: { error: 'Email not found' } })

      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      fireEvent.submit(screen.getByTestId('submit-btn').closest('form'))

      await waitFor(() => {
        expect(mockSetServerState).toHaveBeenCalledWith(
          expect.objectContaining({ isLoading: false })
        )
      })
    })
  })

  describe('form submission — network error', () => {
    it('shows the generic error toast when axios throws', async () => {
      axios.post.mockRejectedValue(new Error('Network Error'))

      render(<NinEmailForm serverState={defaultServerState} setServerState={mockSetServerState} />)

      fireEvent.submit(screen.getByTestId('submit-btn').closest('form'))

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Something went wrong. Try again.')
      })
    })
  })
})