import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ClientEditProfile from '@/components/dashboard/client/ClientEditProfileForm'

// --- Mocks ---

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() }))
}))

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(() => ({ user: { role: 'customer' } }))
}))

vi.mock('@/store/useProfile', () => ({
  useProfileStore: vi.fn(() => ({
    getProfileDetails: vi.fn(),
    updateProfileDetails: vi.fn()
  }))
}))

vi.mock('@/store/useAuthService', () => ({
  useAuthService: vi.fn(() => ({
    getLocalGovernment: vi.fn(),
    getCountries: vi.fn(),
    getStates: vi.fn()
  }))
}))

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(() => ({ pathname: '/client/profile' })),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}))

vi.mock('sonner', () => ({ toast: vi.fn() }))

vi.mock('axios', () => ({ default: { put: vi.fn() } }))

vi.mock('js-cookie', () => ({
  default: { get: vi.fn(), set: vi.fn() }
}))

vi.mock('lucide-react', () => ({
  X: () => <span>X</span>,
  Loader2: () => <span data-testid="loader-icon">loading</span>
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className }) => (
    <img src={src} className={className} alt="profile" data-testid="profile-image" />
  )
}))

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: () => <div data-testid="skeleton" />
}))

vi.mock('@/components/ui/form', () => ({
  Form: ({ children }) => <div>{children}</div>,
  FormField: ({ render, name }) => render({ field: { value: '', onChange: vi.fn(), name } }),
  FormItem: ({ children }) => <div>{children}</div>,
  FormLabel: ({ children }) => <label>{children}</label>,
  FormControl: ({ children }) => <div>{children}</div>,
  FormMessage: () => null
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props) => <input {...props} />
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, type, ...props }) => (
    <button type={type || 'button'} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}))

vi.mock('@/components/ui/select', () => ({
  Select: ({ children }) => <div>{children}</div>,
  SelectTrigger: ({ children, ...props }) => <button {...props}>{children}</button>,
  SelectContent: ({ children }) => <div>{children}</div>,
  SelectItem: ({ children, value }) => <option value={value}>{children}</option>,
  SelectValue: ({ placeholder }) => <span>{placeholder}</span>
}))

vi.mock('@/components/global/Indicator', () => ({
  default: ({ className }) => <span className={className} data-testid="indicator" />
}))

vi.mock('@/components/global/loaders/ProfileLoaders', () => ({
  default: () => <div data-testid="profile-loader" />
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div data-testid="error-message">{error?.message}</div>
}))

vi.mock('@/components/global/loaders/SingleLoader', () => ({
  default: () => <div data-testid="single-loader" />
}))

vi.mock('@/validations/clientEditFormValidation', () => ({
  clientEditFormSchema: {}
}))

vi.mock('@/validations/designerEditFormValidation', () => ({
  designerEditFormSchema: {}
}))

vi.mock('@/images/avatar_profile.png', () => ({ default: '/avatar.png' }))

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useForm: vi.fn(() => ({
      control: {},
      handleSubmit: (fn) => (e) => { e?.preventDefault?.(); fn({}) },
      reset: vi.fn(),
      setValue: vi.fn(),
      formState: { errors: {} }
    }))
  }
})

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => vi.fn())
}))

// --- Fixtures ---

const mockProfileData = {
  data: {
    customer: {
      fname: 'John',
      lname: 'Doe',
      email: 'john@example.com',
      phone: '08012345678',
      address: '12 Lagos Street',
      country: 'Nigeria',
      profilePic: '/avatar.png',
      state: [{ id: 24, name: 'Lagos' }],
      lga: [{ id: 5, name: 'Ikeja' }],
      cities: '',
      states: ''
    }
  }
}

// --- Helper ---

const setQueryState = (overrides = {}) => {
  useQuery.mockImplementation(({ queryKey }) => {
    const key = queryKey?.[0]

    if (key === 'user-profile') return { data: mockProfileData, isLoading: false, isError: false, error: null, ...overrides }
    if (key === 'countries') return { data: { country: [{ country_id: 161, country_name: 'Nigeria' }] }, isLoading: false, isError: false, error: null }
    if (key === 'states') return { data: { states: [{ state_id: 24, state_name: 'Lagos' }] }, isLoading: false, isError: false, error: null }
    if (key === 'lga') return { data: [{ id: 5, name: 'Ikeja' }], isLoading: false, isError: false, error: null }

    return { data: undefined, isLoading: false, isError: false, error: null }
  })
}

// --- Tests ---

describe('ClientEditProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useMutation.mockReturnValue({ mutate: vi.fn(), isPending: false })
    useQueryClient.mockReturnValue({ invalidateQueries: vi.fn() })
  })

  // Loading state
  describe('loading state', () => {
    it('renders the profile loader while loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, isError: false, error: null })
      render(<ClientEditProfile />)
      expect(screen.getByTestId('profile-loader')).toBeInTheDocument()
    })

    it('does not render form inputs while loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, isError: false, error: null })
      render(<ClientEditProfile />)
      expect(screen.queryByTestId('email')).not.toBeInTheDocument()
    })
  })

  // Error state
  describe('error state', () => {
    it('renders the error message on failure', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: false, isError: true, error: { message: 'Failed to load' } })
      render(<ClientEditProfile />)
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('displays the correct error text', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: false, isError: true, error: { message: 'Network error' } })
      render(<ClientEditProfile />)
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })

    it('does not render form inputs on error', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: false, isError: true, error: { message: 'err' } })
      render(<ClientEditProfile />)
      expect(screen.queryByTestId('firstName')).not.toBeInTheDocument()
    })
  })

  // Success state
  describe('success state', () => {
    beforeEach(() => {
      setQueryState()
      render(<ClientEditProfile />)
    })

    it('renders the firstName input', () => {
      expect(screen.getAllByTestId('firstName')[0]).toBeInTheDocument()
    })

    it('renders the lastName input', () => {
      expect(screen.getAllByTestId('lastName')[0]).toBeInTheDocument()
    })

    it('renders the email input', () => {
      expect(screen.getByTestId('email')).toBeInTheDocument()
    })

    it('renders the mobile input', () => {
      expect(screen.getByTestId('mobile')).toBeInTheDocument()
    })

    it('renders the address input', () => {
      expect(screen.getByTestId('address')).toBeInTheDocument()
    })

    it('renders the country select', () => {
      expect(screen.getByTestId('country')).toBeInTheDocument()
    })

    it('renders the profile image', () => {
      expect(screen.getByTestId('profile-image')).toBeInTheDocument()
    })

    it('renders the update button', () => {
      expect(screen.getByTestId('update-btn')).toBeInTheDocument()
    })

    it('shows Update text when not pending', () => {
      expect(screen.getByTestId('update-btn')).toHaveTextContent('Update')
    })

    it('does not render profile loader', () => {
      expect(screen.queryByTestId('profile-loader')).not.toBeInTheDocument()
    })

    it('does not render error message', () => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  // Submit button pending state
  describe('submit button', () => {
    it('shows updating text when mutation is pending', () => {
      useMutation.mockReturnValue({ mutate: vi.fn(), isPending: true })
      setQueryState()
      render(<ClientEditProfile />)
      expect(screen.getByText(/updating/i)).toBeInTheDocument()
    })
  })

  // Non-Nigerian fields (cities/states inputs instead of selects)
  describe('non-Nigerian fields', () => {
    it('renders cities input when country is not Nigeria', () => {
      useQuery.mockImplementation(({ queryKey }) => {
        const key = queryKey?.[0]
        if (key === 'user-profile') return {
          data: {
            data: {
              customer: {
                ...mockProfileData.data.customer,
                country: 'Ghana',
                state: [],
                lga: []
              }
            }
          },
          isLoading: false, isError: false, error: null
        }
        if (key === 'countries') return { data: { country: [{ country_id: 80, country_name: 'Ghana' }] }, isLoading: false, isError: false, error: null }
        if (key === 'states') return { data: { states: [] }, isLoading: false, isError: false, error: null }
        if (key === 'lga') return { data: [], isLoading: false, isError: false, error: null }
        return { data: undefined, isLoading: false, isError: false, error: null }
      })
      render(<ClientEditProfile />)
      expect(screen.getByTestId('cities')).toBeInTheDocument()
    })

    it('renders states input when country is not Nigeria', () => {
      useQuery.mockImplementation(({ queryKey }) => {
        const key = queryKey?.[0]
        if (key === 'user-profile') return {
          data: {
            data: {
              customer: {
                ...mockProfileData.data.customer,
                country: 'Ghana',
                state: [],
                lga: []
              }
            }
          },
          isLoading: false, isError: false, error: null
        }
        if (key === 'countries') return { data: { country: [{ country_id: 80, country_name: 'Ghana' }] }, isLoading: false, isError: false, error: null }
        if (key === 'states') return { data: { states: [] }, isLoading: false, isError: false, error: null }
        if (key === 'lga') return { data: [], isLoading: false, isError: false, error: null }
        return { data: undefined, isLoading: false, isError: false, error: null }
      })
      render(<ClientEditProfile />)
      expect(screen.getByTestId('states')).toBeInTheDocument()
    })
  })
})