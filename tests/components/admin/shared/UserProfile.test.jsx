import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserProfile from '@/components/admin/shared/profile/UserProfile'
import React from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// --- Mocks ---

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(() => ({ pathname: '/admin/clients/123' })),
  useParams: vi.fn(() => ({ id: '123' })),
  useNavigate: vi.fn(() => vi.fn())
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({ data: undefined, isLoading: false, isError: false, error: null })),
  useMutation: vi.fn(() => ({ data: undefined, mutate: vi.fn() })),
  useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() }))
}))

vi.mock('@/store/admin/useAdmin', () => ({
  useAdminStore: vi.fn(() => ({
    deactivateUser: vi.fn(),
    activateUser: vi.fn()
  }))
}))

vi.mock('@/store/admin/clientStore/useAdminClient', () => ({
  useAdminClientStore: vi.fn(() => ({
    updateClientDetails: vi.fn()
  }))
}))

vi.mock('@/store/admin/creatoreStore/useAdminCreator', () => ({
  useAdminCreatorStore: vi.fn(() => ({
    updateDesignerDetails: vi.fn()
  }))
}))

vi.mock('@/store/useAuthService', () => ({
  useAuthService: vi.fn(() => ({
    getLocalGovernment: vi.fn(),
    getCountries: vi.fn(),
    getStates: vi.fn()
  }))
}))

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(() => ({ user: { role: 'admin' } }))
}))

vi.mock('sonner', () => ({ toast: vi.fn() }))

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

// Mock using the EXACT path the component imports from
vi.mock('@/components/admin/shared/profile/UserProfileCard', () => ({
  default: ({ children, cardProps }) => (
    <div data-testid={`card-${cardProps.sectionId}`}>
      <button
        data-id={cardProps.sectionId}
        onClick={cardProps.handleEdit}
        data-testid={`edit-btn-${cardProps.sectionId}`}
      >
        edit
      </button>
      {children}
    </div>
  )
}))

vi.mock('@/components/global/loaders/ProfileLoaders', () => ({
  default: () => <div data-testid="profile-loader" />
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div data-testid="error-message">{error?.message}</div>
}))

vi.mock('@/validations/clientEditFormValidation', () => ({
  adminClientEditFormSchema: {}
}))

vi.mock('@/components/admin/shared/LastSeen', () => ({
  default: ({ lastSeen }) => <div data-testid="last-seen">{lastSeen}</div>
}))

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useForm: vi.fn(() => ({
      control: {},
      handleSubmit: (fn) => (e) => { e?.preventDefault?.(); fn({}) },
      reset: vi.fn(),
      formState: { errors: {} }
    }))
  }
})

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => vi.fn())
}))

// --- Fixtures ---

const mockClientData = {
  client: {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    phone: '08012345678',
    gender: 'male',
    username: 'johndoe',
    address: '12 Lagos Street',
    profilePicture: '/avatar.png',
    status: 'active',
    access: 'actived',
    country: 'Nigeria',
    country_id: 161,
    state: 'Lagos',
    state_id: 24,
    lga: 'Ikeja',
    lga_id: 5,
    last_seen: '2024-01-01'
  }
}

const mockCreatorData = {
  Creator: {
    id: 2,
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jane@example.com',
    phone_no: '08098765432',
    gender: 'female',
    businessName: 'Jane Designs',
    address: '5 Abuja Road',
    profilePicture: '/jane.png',
    status: 'active',
    access: 'deactived',
    Country: 'Ghana',
    country_id: 80,
    last_seen: '2024-01-02'
  }
}

// --- Helper ---

const renderClient = () =>
  render(<UserProfile isLoading={false} isError={false} error={null} data={mockClientData} />)

const renderCreator = () =>
  render(<UserProfile isLoading={false} isError={false} error={null} data={mockCreatorData} />)

// --- Tests ---

describe('UserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useLocation.mockReturnValue({ pathname: '/admin/clients/123' })
    useParams.mockReturnValue({ id: '123' })
    useQueryClient.mockReturnValue({ invalidateQueries: vi.fn() })
    useQuery.mockReturnValue({ data: undefined, isLoading: false, isError: false, error: null })
    useMutation.mockReturnValue({ data: undefined, mutate: vi.fn() })
  })

  // Loading state
  describe('loading state', () => {
    it('renders the profile loader while loading', () => {
      render(<UserProfile isLoading={true} data={undefined} />)
      expect(screen.getByTestId('profile-loader')).toBeInTheDocument()
    })

    it('does not render the form while loading', () => {
      render(<UserProfile isLoading={true} data={undefined} />)
      expect(screen.queryByTestId('firstName')).not.toBeInTheDocument()
    })
  })

  // Error state
  describe('error state', () => {
    it('renders the error message on failure', () => {
      render(<UserProfile isLoading={false} isError={true} error={{ message: 'Failed to load' }} data={undefined} />)
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('displays the correct error text', () => {
      render(<UserProfile isLoading={false} isError={true} error={{ message: 'Failed to load' }} data={undefined} />)
      expect(screen.getByText('Failed to load')).toBeInTheDocument()
    })

    it('does not render the form on error', () => {
      render(<UserProfile isLoading={false} isError={true} error={{ message: 'err' }} data={undefined} />)
      expect(screen.queryByTestId('firstName')).not.toBeInTheDocument()
    })
  })

  // Client success state
  describe('client success state', () => {
    beforeEach(() => {
      useLocation.mockReturnValue({ pathname: '/admin/clients/1' })
      renderClient()
    })

    it('renders all form inputs', () => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument()
      expect(screen.getByTestId('lastName')).toBeInTheDocument()
      expect(screen.getByTestId('email')).toBeInTheDocument()
      expect(screen.getByTestId('phoneNumber')).toBeInTheDocument()
      expect(screen.getByTestId('gender')).toBeInTheDocument()
      expect(screen.getByTestId('street')).toBeInTheDocument()
    })

    it('renders the username field for clients', () => {
      expect(screen.getByTestId('username')).toBeInTheDocument()
    })

    it('does not render businessName field for clients', () => {
      expect(screen.queryByTestId('businessName')).not.toBeInTheDocument()
    })

    it('renders the user label as client', () => {
      expect(screen.getByText(/user: client/i)).toBeInTheDocument()
    })

    it('renders the last seen component', () => {
      expect(screen.getByTestId('last-seen')).toBeInTheDocument()
    })

    it('renders all profile cards', () => {
      expect(screen.getByTestId('card-businessName')).toBeInTheDocument()
      expect(screen.getByTestId('card-personal info')).toBeInTheDocument()
      expect(screen.getByTestId('card-address')).toBeInTheDocument()
    })

    it('renders activate and deactivate buttons', () => {
      expect(screen.getByTestId('active')).toBeInTheDocument()
      expect(screen.getByTestId('deactive')).toBeInTheDocument()
    })

    it('disables activate button when account is already active', () => {
      expect(screen.getByTestId('active')).toBeDisabled()
    })

    it('enables deactivate button when account is active', () => {
      expect(screen.getByTestId('deactive')).not.toBeDisabled()
    })

    it('renders submit button', () => {
      expect(screen.getByText('Submit')).toBeInTheDocument()
    })
  })

  // Creator success state
  describe('creator success state', () => {
    beforeEach(() => {
      useLocation.mockReturnValue({ pathname: '/admin/creators/2' })
      renderCreator()
    })

    it('renders businessName field for creators', () => {
      expect(screen.getByTestId('businessName')).toBeInTheDocument()
    })

    it('does not render username field for creators', () => {
      expect(screen.queryByTestId('username')).not.toBeInTheDocument()
    })

    it('renders the user label as creator', () => {
      expect(screen.getByText(/user: creator/i)).toBeInTheDocument()
    })

    it('disables deactivate button when account is not active', () => {
      expect(screen.getByTestId('deactive')).toBeDisabled()
    })

    it('enables activate button when account is not active', () => {
      expect(screen.getByTestId('active')).not.toBeDisabled()
    })
  })

  // Form labels
  describe('form labels', () => {
    beforeEach(() => {
      useLocation.mockReturnValue({ pathname: '/admin/clients/1' })
      renderClient()
    })

    it('renders all expected labels', () => {
      expect(screen.getByText('First Name')).toBeInTheDocument()
      expect(screen.getByText('Last Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Phone number')).toBeInTheDocument()
      expect(screen.getByText(/gender/i)).toBeInTheDocument()
      expect(screen.getByText('Address')).toBeInTheDocument()
    })
  })

  // Account actions
  describe('account actions', () => {
    it('calls accountActivation when activate is clicked', () => {
      const mockActivate = vi.fn()
      // First call = activation mutation, second call = deactivation mutation
      useMutation
        .mockReturnValueOnce({ data: undefined, mutate: mockActivate })
        .mockReturnValueOnce({ data: undefined, mutate: vi.fn() })

      useLocation.mockReturnValue({ pathname: '/admin/clients/1' })

      const inactiveData = {
        client: { ...mockClientData.client, access: 'deactived' }
      }
      render(<UserProfile isLoading={false} isError={false} error={null} data={inactiveData} />)
      fireEvent.click(screen.getByTestId('active'))
    })

    it('calls accountDeactivation when deactivate is clicked', () => {
      const mockDeactivate = vi.fn()
      // First call = activation mutation, second call = deactivation mutation
      useMutation
        .mockReturnValueOnce({ data: undefined, mutate: vi.fn() })
        .mockReturnValueOnce({ data: undefined, mutate: mockDeactivate })

      useLocation.mockReturnValue({ pathname: '/admin/clients/1' })

      render(<UserProfile isLoading={false} isError={false} error={null} data={mockClientData} />)
      fireEvent.click(screen.getByTestId('deactive'))
    })
  })
})