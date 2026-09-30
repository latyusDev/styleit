import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/store/useAuth'
import { useAdminRepresentativeStore } from '@/store/admin/useAdminRepresentativeStore'
import { useParams, useLocation } from 'react-router-dom'
import React from 'react'
import RepresentativeProfile from '@/components/representative/RepresentativeProfile'

// --- Mocks ---

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useQuery: vi.fn() }
})

vi.mock('@/store/useAuth', () => ({ useAuth: vi.fn() }))

vi.mock('@/store/admin/useAdminRepresentativeStore', () => ({
  useAdminRepresentativeStore: vi.fn()
}))

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useLocation: vi.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}))

vi.mock('@hookform/resolvers/zod', () => ({ zodResolver: vi.fn(() => vi.fn()) }))

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useForm: vi.fn() }
})

vi.mock('@/components/representative/RepresentativeEditForm', () => ({
  default: ({ form }) => <div data-testid="representative-edit-form">edit form</div>
}))

vi.mock('@/components/global/loaders/ProfileLoaders', () => ({
  default: () => <div data-testid="user-profile-loader" />
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => (
    <div data-testid="error-message">{error?.message ?? 'Something went wrong'}</div>
  )
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, className }) => (
    <button className={className} data-testid="pay-btn">{children}</button>
  )
}))

vi.mock('@/validations/representativeFormValidation', () => ({
  representativeFormValidation: {}
}))

// --- Fixtures ---

const mockGetSalesRepresentativeProfile = vi.fn()
const mockGetSalesRepresentativeList = vi.fn()

const mockSalesRep = {
  name: 'Yunus Uthman',
  email: 'uth@gmail.com',
  phone: '11111111111',
  gender: 'male',
  state: 'Akwa Ibom 3',
  lga: 'Etinam 12',
  address: 'ssg',
  pic: 'https://example.com/avatar.png',
  refercode: 5603
}

const successData = {
  salesrep: mockSalesRep,
  subscription_payout: '₦5000',
  client_payout: '₦3000'
}

const makeFormMock = () => ({
  control: {},
  handleSubmit: (fn) => (e) => { e?.preventDefault?.(); fn({}) },
  formState: { errors: {} },
  setValue: vi.fn(),
  reset: vi.fn()
})

// --- Tests ---

describe('RepresentativeProfile', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    useParams.mockReturnValue({ referCode: '5603' })
    useLocation.mockReturnValue({ pathname: '/representative/profile' })
    useAuth.mockReturnValue({ user: { role: 'admin' } })
    useAdminRepresentativeStore.mockReturnValue({
      getSalesRepresentativeList: mockGetSalesRepresentativeList,
      getSalesRepresentativeProfile: mockGetSalesRepresentativeProfile
    })
    useQuery.mockReturnValue({
      data: successData,
      isLoading: false,
      error: null,
      isError: false
    })

    const { useForm } = await import('react-hook-form')
    useForm.mockImplementation(() => makeFormMock())
  })

  describe('loading state', () => {
    it('renders UserProfileLoader when isLoading is true', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<RepresentativeProfile />)
      expect(screen.getByTestId('user-profile-loader')).toBeInTheDocument()
    })

    it('does not render profile content while loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<RepresentativeProfile />)
      expect(screen.queryByText('Yunus Uthman')).not.toBeInTheDocument()
    })
  })

  describe('error state', () => {
    it('renders ErrorMessage when isError is true', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch' },
        isError: true
      })
      render(<RepresentativeProfile />)
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch')
    })

    it('does not render profile content when isError is true', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch' },
        isError: true
      })
      render(<RepresentativeProfile />)
      expect(screen.queryByText('Sales Representative')).not.toBeInTheDocument()
    })
  })

  describe('view mode — hero card', () => {
    it('renders the Sales Representative badge', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Sales Representative')).toBeInTheDocument()
    })

    it('renders the rep name in the hero card', () => {
      render(<RepresentativeProfile />)
      expect(screen.getAllByText('Yunus Uthman').length).toBeGreaterThan(0)
    })

    it('renders the rep email in the hero card', () => {
      render(<RepresentativeProfile />)
      expect(screen.getAllByText('uth@gmail.com').length).toBeGreaterThan(0)
    })

    it('renders the referral code', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('5603')).toBeInTheDocument()
    })

    it('renders the avatar image when pic is present', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByAltText('avatar')).toBeInTheDocument()
    })

    it('renders the Edit Profile button in view mode', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Edit Profile')).toBeInTheDocument()
    })
  })

  describe('view mode — info cards', () => {
    it('renders Personal Info section heading', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Personal Info')).toBeInTheDocument()
    })

    it('renders Location section heading', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Location')).toBeInTheDocument()
    })

    it('renders Payment section heading', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Payment')).toBeInTheDocument()
    })

    it('renders Full Name info card', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Full Name')).toBeInTheDocument()
    })

    it('renders Email info card', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Email')).toBeInTheDocument()
    })

    it('renders Phone info card', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('11111111111')).toBeInTheDocument()
    })

    it('renders Gender info card', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('Gender')).toBeInTheDocument()
      expect(screen.getByText('male')).toBeInTheDocument()
    })

    it('renders payout values in the payment section', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByText('₦5000')).toBeInTheDocument()
      expect(screen.getByText('₦3000')).toBeInTheDocument()
    })
  })

  describe('edit mode toggle', () => {
    it('shows RepresentativeEditForm when Edit Profile is clicked', () => {
      render(<RepresentativeProfile />)
      fireEvent.click(screen.getByText('Edit Profile'))
      expect(screen.getByTestId('representative-edit-form')).toBeInTheDocument()
    })

    it('hides RepresentativeEditForm when Cancel is clicked', () => {
      render(<RepresentativeProfile />)
      fireEvent.click(screen.getByText('Edit Profile'))
      expect(screen.getByTestId('representative-edit-form')).toBeInTheDocument()

      fireEvent.click(screen.getByText('Cancel'))
      expect(screen.queryByTestId('representative-edit-form')).not.toBeInTheDocument()
    })

    it('shows Cancel button while in edit mode', () => {
      render(<RepresentativeProfile />)
      fireEvent.click(screen.getByText('Edit Profile'))
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('does not show Edit Profile button while in edit mode', () => {
      render(<RepresentativeProfile />)
      fireEvent.click(screen.getByText('Edit Profile'))
      expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument()
    })

    it('hides info cards while in edit mode', () => {
      render(<RepresentativeProfile />)
      fireEvent.click(screen.getByText('Edit Profile'))
      expect(screen.queryByText('Personal Info')).not.toBeInTheDocument()
    })
  })

  describe('admin role', () => {
    it('renders the Pay button for admin role', () => {
      render(<RepresentativeProfile />)
      expect(screen.getByTestId('pay-btn')).toBeInTheDocument()
    })

    it('renders the "view referrals" link for admin role', () => {
      render(<RepresentativeProfile />)
      const link = screen.getByText('view referrals')
      expect(link.closest('a')).toHaveAttribute(
        'href',
        '/admin/representatives/profile/5603/referrals'
      )
    })
  })

  describe('representative role', () => {
    beforeEach(() => {
      useAuth.mockReturnValue({ user: { role: 'representative', referCode: '5603' } })
    })

    it('does not render the Pay button for representative role', () => {
      render(<RepresentativeProfile />)
      expect(screen.queryByTestId('pay-btn')).not.toBeInTheDocument()
    })

    it('does not render the "view referrals" link for representative role', () => {
      render(<RepresentativeProfile />)
      expect(screen.queryByText('view referrals')).not.toBeInTheDocument()
    })
  })

  describe('useQuery config', () => {
    it('calls useQuery with admin queryKey for admin role', () => {
      render(<RepresentativeProfile />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['admin-representative-profile']
        })
      )
    })

    it('calls useQuery with representative queryKey for representative role', () => {
      useAuth.mockReturnValue({ user: { role: 'representative' } })
      render(<RepresentativeProfile />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['representative-profile']
        })
      )
    })
  })

  describe('avatar fallback', () => {
    it('renders User icon fallback when pic is missing', () => {
      useQuery.mockReturnValue({
        data: { salesrep: { ...mockSalesRep, pic: null }, subscription_payout: '', client_payout: '' },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<RepresentativeProfile />)
      expect(screen.queryByAltText('avatar')).not.toBeInTheDocument()
    })
  })
})