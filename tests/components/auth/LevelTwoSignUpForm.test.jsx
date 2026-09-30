import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import LevelTwoSignUpForm from '@/components/auth/LevelTwoSignUpForm'
import { useAuthService } from '@/store/useAuthService'

// ─── Mocks ───────────────────────────────────────────────────────────────────
vi.mock('@/store/useAuthService', () => ({
  useAuthService: vi.fn(),
}))

vi.mock('../../images/mdi-light_email.png', () => ({ default: 'email-icon.png' }))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <p>Error: {error?.message}</p>,
}))

// Mock shadcn Select to avoid Radix UI portal and pointer event issues in jsdom
vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, value }) => (
    <div data-value={value}>
      {React.Children.map(children, (child) => {
        if (!child) return null
        return React.cloneElement(child, { onValueChange })
      })}
    </div>
  ),
  SelectTrigger: ({ children, 'data-testid': testId, onValueChange, ...rest }) => (
    <button data-testid={testId} type="button" {...rest}>
      {children}
    </button>
  ),
  SelectValue: ({ placeholder }) => <span>{placeholder}</span>,
  SelectContent: ({ children }) => <div>{children}</div>,
  SelectItem: ({ children, value, onValueChange }) => (
    <div
      role="option"
      data-value={value}
      onClick={() => onValueChange?.(value)}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  ),
}))

// ─── Mock data ────────────────────────────────────────────────────────────────
const mockCountries = {
  country: [
    { country_id: '161', country_name: 'Nigeria' },
    { country_id: '1', country_name: 'United States' },
    { country_id: '2', country_name: 'Ghana' },
  ],
}

const mockStates = {
  states: [
    { state_id: '1', state_name: 'Lagos' },
    { state_id: '2', state_name: 'Abuja' },
    { state_id: '3', state_name: 'Oyo' },
  ],
}

const mockLgas = [
  { id: '1', name: 'Surulere' },
  { id: '2', name: 'Ikeja' },
  { id: '3', name: 'Alimosho' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

// ─── Wrapper ─────────────────────────────────────────────────────────────────
const Wrapper = ({ defaultValues = {} }) => {
  const form = useForm({
    defaultValues: {
      country: '',
      state: '',
      address: '',
      city: '',
      lga: '',
      nin: '',
      passport: '',
      code: '',
      check: false,
      ...defaultValues,
    },
  })

  return (
    <QueryClientProvider client={createQueryClient()}>
      <MemoryRouter>
        <Form {...form}>
          <form>
            <LevelTwoSignUpForm form={form} />
          </form>
        </Form>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

// ─── Setup mock store before each test ───────────────────────────────────────
beforeEach(() => {
  useAuthService.mockReturnValue({
    getCountries: vi.fn().mockResolvedValue(mockCountries),
    getStates: vi.fn().mockResolvedValue(mockStates),
    getLocalGovernment: vi.fn().mockResolvedValue(mockLgas),
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe('LevelTwoSignUpForm', () => {

  // ── Rendering ──────────────────────────────────────────────────────────────
  describe('Rendering', () => {
    it('renders the country dropdown trigger', () => {
      render(<Wrapper />)

      expect(screen.getByTestId('country')).toBeInTheDocument()
    })

    it('renders the address input', () => {
      render(<Wrapper />)

      expect(screen.getByPlaceholderText('Address')).toBeInTheDocument()
    })

    it('renders the NIN input', () => {
      render(<Wrapper />)

      expect(screen.getByPlaceholderText('NIN')).toBeInTheDocument()
    })

    it('renders the Passport input', () => {
      render(<Wrapper />)

      expect(screen.getByPlaceholderText('Passport')).toBeInTheDocument()
    })

    it('renders the referral code input', () => {
      render(<Wrapper />)

      expect(screen.getByPlaceholderText('Enter referral code')).toBeInTheDocument()
    })

    it('renders the terms and condition checkbox', () => {
      render(<Wrapper />)

      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders the terms and condition label text', () => {
      render(<Wrapper />)

      expect(screen.getByText(/terms and condition/i)).toBeInTheDocument()
    })

    it('renders the state text input when no country is selected', () => {
      render(<Wrapper />)

      expect(screen.getByPlaceholderText('State')).toBeInTheDocument()
    })

    it('renders the city text input when no country is selected', () => {
      render(<Wrapper />)

      expect(screen.getByPlaceholderText('City')).toBeInTheDocument()
    })

    it('does not render the state dropdown when no country is selected', () => {
      render(<Wrapper />)

      expect(screen.queryByTestId('state')).not.toBeInTheDocument()
    })

    it('does not render the LGA dropdown when no country is selected', () => {
      render(<Wrapper />)

      expect(screen.queryByTestId('lga')).not.toBeInTheDocument()
    })
  })

  // ── Country dropdown ───────────────────────────────────────────────────────
  describe('Country dropdown', () => {
    it('shows loading state while countries are fetching', () => {
      useAuthService.mockReturnValue({
        getCountries: vi.fn(() => new Promise(() => {})), // never resolves
        getStates: vi.fn(),
        getLocalGovernment: vi.fn(),
      })

      render(<Wrapper />)

      // With Select mocked, SelectContent renders inline — loader is in DOM immediately
      expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    it('renders country options after loading', async () => {
      render(<Wrapper />)

      await waitFor(() => {
        expect(screen.getByText('Nigeria')).toBeInTheDocument()
        expect(screen.getByText('United States')).toBeInTheDocument()
        expect(screen.getByText('Ghana')).toBeInTheDocument()
      })
    })

    it('shows error message when countries fail to load', async () => {
      useAuthService.mockReturnValue({
        getCountries: vi.fn().mockRejectedValue(new Error('Network error')),
        getStates: vi.fn(),
        getLocalGovernment: vi.fn(),
      })

      render(<Wrapper />)

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument()
      })
    })
  })

  // ── Nigeria selected ───────────────────────────────────────────────────────
  describe('Nigeria selected', () => {
    it('shows the state dropdown when Nigeria is selected', async () => {
      render(<Wrapper defaultValues={{ country: 'Nigeria 161' }} />)

      await waitFor(() => {
        expect(screen.getByTestId('state')).toBeInTheDocument()
      })
    })

    it('shows the LGA dropdown when Nigeria is selected', async () => {
      render(<Wrapper defaultValues={{ country: 'Nigeria 161' }} />)

      await waitFor(() => {
        expect(screen.getByTestId('lga')).toBeInTheDocument()
      })
    })

    it('hides the state text input when Nigeria is selected', async () => {
      render(<Wrapper defaultValues={{ country: 'Nigeria 161' }} />)

      await waitFor(() => {
        expect(screen.queryByPlaceholderText('State')).not.toBeInTheDocument()
      })
    })

    it('hides the city text input when Nigeria is selected', async () => {
      render(<Wrapper defaultValues={{ country: 'Nigeria 161' }} />)

      await waitFor(() => {
        expect(screen.queryByPlaceholderText('City')).not.toBeInTheDocument()
      })
    })

    it('renders state options after Nigeria is selected', async () => {
      render(<Wrapper defaultValues={{ country: 'Nigeria 161' }} />)

      // With Select mocked, options render inline — no click needed to open dropdown
      await waitFor(() => {
        expect(screen.getByText('Lagos')).toBeInTheDocument()
        expect(screen.getByText('Abuja')).toBeInTheDocument()
        expect(screen.getByText('Oyo')).toBeInTheDocument()
      })
    })

    it('shows states loading state while states are fetching', async () => {
      useAuthService.mockReturnValue({
        getCountries: vi.fn().mockResolvedValue(mockCountries),
        getStates: vi.fn(() => new Promise(() => {})), // never resolves
        getLocalGovernment: vi.fn(),
      })

      render(<Wrapper defaultValues={{ country: 'Nigeria 161' }} />)

      await waitFor(() => {
        expect(screen.getByTestId('states-loader')).toBeInTheDocument()
      })
    })
  })

  // ── Non-Nigeria countries ──────────────────────────────────────────────────
  describe('Non-Nigeria country selected', () => {
    it('shows state text input for non-Nigeria country', () => {
      render(<Wrapper defaultValues={{ country: 'Ghana 2' }} />)

      expect(screen.getByPlaceholderText('State')).toBeInTheDocument()
    })

    it('shows city text input for non-Nigeria country', () => {
      render(<Wrapper defaultValues={{ country: 'Ghana 2' }} />)

      expect(screen.getByPlaceholderText('City')).toBeInTheDocument()
    })

    it('does not show state dropdown for non-Nigeria country', () => {
      render(<Wrapper defaultValues={{ country: 'Ghana 2' }} />)

      expect(screen.queryByTestId('state')).not.toBeInTheDocument()
    })

    it('does not show LGA dropdown for non-Nigeria country', () => {
      render(<Wrapper defaultValues={{ country: 'Ghana 2' }} />)

      expect(screen.queryByTestId('lga')).not.toBeInTheDocument()
    })
  })

  // ── Input interactions ─────────────────────────────────────────────────────
  describe('Input interactions', () => {
    it('types into address input', async () => {
      render(<Wrapper />)

      await userEvent.type(screen.getByPlaceholderText('Address'), '10 Allen Avenue')
      expect(screen.getByPlaceholderText('Address')).toHaveValue('10 Allen Avenue')
    })

    it('types into state text input for non-Nigeria', async () => {
      render(<Wrapper defaultValues={{ country: 'Ghana 2' }} />)

      await userEvent.type(screen.getByPlaceholderText('State'), 'Accra')
      expect(screen.getByPlaceholderText('State')).toHaveValue('Accra')
    })

    it('types into city input for non-Nigeria', async () => {
      render(<Wrapper defaultValues={{ country: 'Ghana 2' }} />)

      await userEvent.type(screen.getByPlaceholderText('City'), 'Kumasi')
      expect(screen.getByPlaceholderText('City')).toHaveValue('Kumasi')
    })

    it('types into NIN input', async () => {
      render(<Wrapper />)

      await userEvent.type(screen.getByPlaceholderText('NIN'), '12345678901')
      expect(screen.getByPlaceholderText('NIN')).toHaveValue('12345678901')
    })

    it('types into Passport input', async () => {
      render(<Wrapper />)

      await userEvent.type(screen.getByPlaceholderText('Passport'), 'AB1234567')
      expect(screen.getByPlaceholderText('Passport')).toHaveValue('AB1234567')
    })

    it('types into referral code input', async () => {
      render(<Wrapper />)

      await userEvent.type(screen.getByPlaceholderText('Enter referral code'), 'REF001')
      expect(screen.getByPlaceholderText('Enter referral code')).toHaveValue('REF001')
    })

    it('checks the terms and condition checkbox', async () => {
      render(<Wrapper />)

      const checkbox = screen.getByRole('checkbox')
      await userEvent.click(checkbox)

      expect(checkbox).toBeChecked()
    })

    it('unchecks the terms and condition checkbox after second click', async () => {
      render(<Wrapper />)

      const checkbox = screen.getByRole('checkbox')
      await userEvent.click(checkbox)
      await userEvent.click(checkbox)

      expect(checkbox).not.toBeChecked()
    })
  })


})