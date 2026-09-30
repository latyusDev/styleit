import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CreatorEditProfileForm from '@/components/dashboard/creator/CreatorEditProfileForm'

// ─── Mock Dependencies ────────────────────────────────────────────────────────

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(),
}))

vi.mock('@/store/useProfile', () => ({
  useProfileStore: vi.fn(),
}))

vi.mock('@/store/useAuthService', () => ({
  useAuthService: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: vi.fn(),
}))

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(() => 'mock-token'),
    set: vi.fn(),
  },
}))

vi.mock('axios', () => ({
  default: {
    put: vi.fn(),
  },
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className }) => <img src={src} className={className} alt="profile" />,
}))

vi.mock('@/components/global/Indicator', () => ({
  default: ({ className }) => <span className={className} />,
}))

vi.mock('@/components/global/loaders/ProfileLoaders', () => ({
  default: () => <div data-testid="profile-loader">Loading...</div>,
}))

vi.mock('@/components/global/loaders/SingleLoader', () => ({
  default: () => <div data-testid="single-loader">Uploading...</div>,
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div data-testid="error-message">{error?.message}</div>,
}))

vi.mock('@/images/avatar_profile.png', () => ({ default: 'avatar.png' }))

// ─── Shared Test Data ─────────────────────────────────────────────────────────

const nigerianProfileData = {
  data: {
    creator: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '08012345678',
      address: '123 Main St',
      country: 'Nigeria',
      state: [{ id: 25, name: 'Lagos' }],
      lga: [{ id: 10, name: 'Ikeja' }],
      states: '',
      cities: '',
      profile_pic: 'https://example.com/pic.jpg',
    },
    bank: [{ bankName: 'GTBank', accountName: 'John Doe', accountNo: '0123456789' }],
  },
}

const internationalProfileData = {
  data: {
    creator: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+14155552671',
      address: '456 Elm St',
      country: 'United States',
      state: [{}],
      lga: [{}],
      states: 'California',
      cities: 'San Francisco',
      profile_pic: null,
    },
    bank: [null],
  },
}

const countryData = {
  country: [
    { country_id: 161, country_name: 'Nigeria' },
    { country_id: 233, country_name: 'United States' },
  ],
}

const stateData = {
  states: [
    { state_id: 25, state_name: 'Lagos' },
    { state_id: 26, state_name: 'Abuja' },
  ],
}

const lgaData = [
  { id: 10, name: 'Ikeja' },
  { id: 11, name: 'Surulere' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const { useAuth } = await import('@/store/useAuth')
const { useProfileStore } = await import('@/store/useProfile')
const { useAuthService } = await import('@/store/useAuthService')

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

function setupMocks({
  role = 'designer',
  profileData = nigerianProfileData,
  profileLoading = false,
  profileError = null,
} = {}) {
  useAuth.mockReturnValue({ user: { role, id: '1' } })

  const getProfileDetails = vi.fn().mockResolvedValue(profileData)
  const updateProfileDetails = vi.fn().mockResolvedValue({ status: 200 })
  const updateBankDetails = vi.fn().mockResolvedValue({ status: 200 })
  useProfileStore.mockReturnValue({ getProfileDetails, updateProfileDetails, updateBankDetails })

  const getCountries = vi.fn().mockResolvedValue(countryData)
  const getStates = vi.fn().mockResolvedValue(stateData)
  const getLocalGovernment = vi.fn().mockResolvedValue(lgaData)
  useAuthService.mockReturnValue({ getCountries, getStates, getLocalGovernment })

  return { getProfileDetails, updateProfileDetails, getCountries, getStates, getLocalGovernment }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('CreatorEditProfileForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── Loading State ──────────────────────────────────────────────────────────

  describe('Loading state', () => {
    it('renders the profile loader while fetching profile data', async () => {
      useAuth.mockReturnValue({ user: { role: 'designer', id: '1' } })
      useProfileStore.mockReturnValue({
        getProfileDetails: () => new Promise(() => {}), // never resolves
        updateProfileDetails: vi.fn(),
        updateBankDetails: vi.fn(),
      })
      useAuthService.mockReturnValue({
        getCountries: vi.fn().mockResolvedValue(countryData),
        getStates: vi.fn().mockResolvedValue(stateData),
        getLocalGovernment: vi.fn().mockResolvedValue(lgaData),
      })

      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })
      expect(screen.getByTestId('profile-loader')).toBeInTheDocument()
    })
  })

  // ── Error State ────────────────────────────────────────────────────────────

  describe('Error state', () => {
    it('renders an error message when profile fetch fails', async () => {
      useAuth.mockReturnValue({ user: { role: 'designer', id: '1' } })
      useProfileStore.mockReturnValue({
        getProfileDetails: vi.fn().mockRejectedValue(new Error('Network error')),
        updateProfileDetails: vi.fn(),
        updateBankDetails: vi.fn(),
      })
      useAuthService.mockReturnValue({
        getCountries: vi.fn().mockResolvedValue(countryData),
        getStates: vi.fn().mockResolvedValue(stateData),
        getLocalGovernment: vi.fn().mockResolvedValue(lgaData),
      })

      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument()
      })
    })
  })

  // ── Form Rendering ─────────────────────────────────────────────────────────

  describe('Form rendering', () => {
    it('renders all core fields for a Nigerian designer', async () => {
      setupMocks()
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getAllByTestId('firstName')[0]).toBeInTheDocument()
        expect(screen.getAllByTestId('lastName')[0]).toBeInTheDocument()
        expect(screen.getByTestId('email')).toBeInTheDocument()
        expect(screen.getByTestId('address')).toBeInTheDocument()
        expect(screen.getByTestId('mobile')).toBeInTheDocument()
        expect(screen.getByTestId('country')).toBeInTheDocument()
        expect(screen.getByTestId('update-btn')).toBeInTheDocument()
      })
    })
    // renders the state dropdown (not text input) for Nigerian users

    it('renders the state dropdown (not text input) for Nigerian users', async () => {
      setupMocks()
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getAllByTestId('state')[0]).toBeInTheDocument()
        expect(screen.queryByTestId('states')).not.toBeInTheDocument()
      })
    })

    it('renders the LGA dropdown for Nigerian users', async () => {
      setupMocks()
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getByTestId('lga')).toBeInTheDocument()
      })
    })

    it('renders text inputs for state and city for non-Nigerian users', async () => {
      setupMocks({ profileData: internationalProfileData })
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getByTestId('states')).toBeInTheDocument()
        expect(screen.getByTestId('cities')).toBeInTheDocument()
      })
    })

    it('shows bank fields for designer role', async () => {
      setupMocks({ role: 'designer' })
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getByTestId('accountName')).toBeInTheDocument()
        expect(screen.getByTestId('banck_acc')).toBeInTheDocument()
      })
    })

    it('hides bank fields for non-designer (customer) role', async () => {
      setupMocks({ role: 'customer' })
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.queryByTestId('accountName')).not.toBeInTheDocument()
        expect(screen.queryByTestId('bank')).not.toBeInTheDocument()
        expect(screen.queryByTestId('banck_acc')).not.toBeInTheDocument()
      })
    })
  })

  // ── Form Pre-population ────────────────────────────────────────────────────

  describe('Form pre-population', () => {
    it('populates text fields from fetched profile data', async () => {
      setupMocks()
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getAllByTestId('firstName')[0]).toHaveValue('John')
        expect(screen.getAllByTestId('lastName')[0]).toHaveValue('Doe')
        expect(screen.getByTestId('email')).toHaveValue('john@example.com')
        expect(screen.getByTestId('mobile')).toHaveValue('08012345678')
        expect(screen.getByTestId('address')).toHaveValue('123 Main St')
      })
    })

 

    it('populates state and city text inputs for non-Nigerian users', async () => {
      setupMocks({ profileData: internationalProfileData })
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getByTestId('states')).toHaveValue('California')
        expect(screen.getByTestId('cities')).toHaveValue('San Francisco')
      })
    })
  })

  // ── Form Submission ────────────────────────────────────────────────────────

  describe('Form submission', () => {
    it('calls updateProfileDetails with correct payload on submit', async () => {
      const { updateProfileDetails } = setupMocks()
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getAllByTestId('firstName')[0]).toHaveValue('John')
      })

      fireEvent.click(screen.getByTestId('update-btn'))

      await waitFor(() => {
        expect(updateProfileDetails).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              fname: 'John',
              lname: 'Doe',
              email: 'john@example.com',
              phone: '08012345678',
              address: '123 Main St',
            }),
            user: expect.objectContaining({ role: 'designer' }),
          })
        )
      })
    })

    it('shows a loading spinner while the mutation is pending', async () => {
      useAuth.mockReturnValue({ user: { role: 'designer', id: '1' } })
      useProfileStore.mockReturnValue({
        getProfileDetails: vi.fn().mockResolvedValue(nigerianProfileData),
        updateProfileDetails: () => new Promise(() => {}), // never settles
        updateBankDetails: vi.fn(),
      })
      useAuthService.mockReturnValue({
        getCountries: vi.fn().mockResolvedValue(countryData),
        getStates: vi.fn().mockResolvedValue(stateData),
        getLocalGovernment: vi.fn().mockResolvedValue(lgaData),
      })

      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getAllByTestId('firstName')[0]).toHaveValue('John')
      })

      fireEvent.click(screen.getByTestId('update-btn'))

      await waitFor(() => {
        expect(screen.getByText(/Updating.../i)).toBeInTheDocument()
      })
    })

    it('shows a success toast after a successful update', async () => {
      const { toast } = await import('sonner')
      setupMocks()
      render(<CreatorEditProfileForm />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getAllByTestId('firstName')[0]).toHaveValue('John')
      })

      fireEvent.click(screen.getByTestId('update-btn'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'Profile updated successfully',
          expect.anything()
        )
      })
    })
  })
})