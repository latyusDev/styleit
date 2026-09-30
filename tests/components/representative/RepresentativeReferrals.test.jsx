import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/store/useAuth'
import { useAdminRepresentativeStore } from '@/store/admin/useAdminRepresentativeStore'
import { useParams } from 'react-router-dom'
import React from 'react'
import RepresentativeReferrals from '@/components/representative/RepresentativeReferrals'

// --- Mocks ---

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useQuery: vi.fn() }
})

vi.mock('@/store/useAuth', () => ({ useAuth: vi.fn() }))

vi.mock('@/store/admin/useAdminRepresentativeStore', () => ({
  useAdminRepresentativeStore: vi.fn()
}))

vi.mock('react-router-dom', () => ({ useParams: vi.fn() }))

vi.mock('@/components/global/loaders/AdminUserLoader', () => ({
  default: () => <div data-testid="admin-user-loader" />
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => (
    <div data-testid="error-message">{error?.message ?? 'Something went wrong'}</div>
  )
}))

vi.mock('@/components/representative/RepresentativeReferral', () => ({
  default: ({ user, isClient }) => (
    <div data-testid={`representative-referral-${user.id}`}>
      <span>{user.id}</span>
      <span>{isClient ? 'client-row' : 'creator-row'}</span>
    </div>
  )
}))

vi.mock('@/components/representative/ReferralCard', () => ({
  default: ({ referral, isClient }) => (
    <div data-testid={`referral-card-${referral.id}`}>
      <span>{referral.id}</span>
      <span>{isClient ? 'client-card' : 'creator-card'}</span>
    </div>
  )
}))

// --- Fixtures ---

const mockGetSalesRepresentativeProfile = vi.fn()
const mockGetSalesRepresentativeList = vi.fn()

const mockCreators = [
  { id: 1, name: 'Creator A', business: 'BizA' },
  { id: 2, name: 'Creator B', business: 'BizB' }
]

const mockClients = [
  { id: 10, name: 'Client A', username: 'clienta' },
  { id: 11, name: 'Client B', username: 'clientb' }
]

const mockData = {
  referred_creators: mockCreators,
  referred_clients: mockClients,
  salesrep: { name: 'Yunus Uthman' }
}

const successState = {
  data: mockData,
  isLoading: false,
  error: null,
  isError: false
}

// --- Tests ---

describe('RepresentativeReferrals', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ user: { role: 'admin' } })
    useParams.mockReturnValue({ referCode: '5603' })
    useAdminRepresentativeStore.mockReturnValue({
      getSalesRepresentativeProfile: mockGetSalesRepresentativeProfile,
      getSalesRepresentativeList: mockGetSalesRepresentativeList
    })
    useQuery.mockReturnValue(successState)
  })

  describe('loading state', () => {
    it('renders AdminUserLoader when isLoading is true', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<RepresentativeReferrals />)
      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

    it('does not render content while loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<RepresentativeReferrals />)
      expect(screen.queryByText('Creators')).not.toBeInTheDocument()
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
      render(<RepresentativeReferrals />)
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch')
    })

    it('does not render content when isError is true', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch' },
        isError: true
      })
      render(<RepresentativeReferrals />)
      expect(screen.queryByText('Creators')).not.toBeInTheDocument()
    })
  })

  describe('tab rendering', () => {
    it('renders the Creators and Clients tab buttons', () => {
      render(<RepresentativeReferrals />)
      expect(screen.getByText('Creators')).toBeInTheDocument()
      expect(screen.getByText('Clients')).toBeInTheDocument()
    })

    it('shows Creators tab as active by default', () => {
      render(<RepresentativeReferrals />)
      const creatorsBtn = screen.getByText('Creators')
      expect(creatorsBtn.className).toContain('bg-[#27213c]')
    })

    it('switches to Clients tab when Clients button is clicked', () => {
      render(<RepresentativeReferrals />)
      fireEvent.click(screen.getByText('Clients'))
      const clientsBtn = screen.getByText('Clients')
      expect(clientsBtn.className).toContain('bg-[#27213c]')
    })

    it('switches back to Creators tab when Creators button is clicked', () => {
      render(<RepresentativeReferrals />)
      fireEvent.click(screen.getByText('Clients'))
      fireEvent.click(screen.getByText('Creators'))
      const creatorsBtn = screen.getByText('Creators')
      expect(creatorsBtn.className).toContain('bg-[#27213c]')
    })
  })

  describe('table header', () => {
    it('shows "Business Name" column header on creators tab', () => {
      render(<RepresentativeReferrals />)
      expect(screen.getByText('Business Name')).toBeInTheDocument()
      expect(screen.queryByText('Username')).not.toBeInTheDocument()
    })

    it('shows "Username" column header on clients tab', () => {
      render(<RepresentativeReferrals />)
      fireEvent.click(screen.getByText('Clients'))
      expect(screen.getByText('Username')).toBeInTheDocument()
      expect(screen.queryByText('Business Name')).not.toBeInTheDocument()
    })

    it('renders common column headers', () => {
      render(<RepresentativeReferrals />)
      expect(screen.getByText('User')).toBeInTheDocument()
      expect(screen.getByText('First Name')).toBeInTheDocument()
      expect(screen.getByText('Last Name')).toBeInTheDocument()
      expect(screen.getByText('Ref Code')).toBeInTheDocument()
    })
  })

  describe('creators tab — data rendering', () => {
    it('renders a row for each referred creator', () => {
      render(<RepresentativeReferrals />)
      expect(screen.getByTestId('representative-referral-1')).toBeInTheDocument()
      expect(screen.getByTestId('representative-referral-2')).toBeInTheDocument()
    })

    it('renders a card for each referred creator', () => {
      render(<RepresentativeReferrals />)
      expect(screen.getByTestId('referral-card-1')).toBeInTheDocument()
      expect(screen.getByTestId('referral-card-2')).toBeInTheDocument()
    })

    it('passes isClient=false to rows on creators tab', () => {
      render(<RepresentativeReferrals />)
      expect(screen.getAllByText('creator-row').length).toBeGreaterThan(0)
      expect(screen.getAllByText('creator-card').length).toBeGreaterThan(0)
    })
  })

  describe('clients tab — data rendering', () => {
    it('renders a row for each referred client', () => {
      render(<RepresentativeReferrals />)
      fireEvent.click(screen.getByText('Clients'))
      expect(screen.getByTestId('representative-referral-10')).toBeInTheDocument()
      expect(screen.getByTestId('representative-referral-11')).toBeInTheDocument()
    })

    it('renders a card for each referred client', () => {
      render(<RepresentativeReferrals />)
      fireEvent.click(screen.getByText('Clients'))
      expect(screen.getByTestId('referral-card-10')).toBeInTheDocument()
      expect(screen.getByTestId('referral-card-11')).toBeInTheDocument()
    })

    it('passes isClient=true to rows on clients tab', () => {
      render(<RepresentativeReferrals />)
      fireEvent.click(screen.getByText('Clients'))
      expect(screen.getAllByText('client-row').length).toBeGreaterThan(0)
      expect(screen.getAllByText('client-card').length).toBeGreaterThan(0)
    })
  })

  describe('empty state', () => {
    it('shows empty state message for admin when creators list is empty', () => {
      useQuery.mockReturnValue({
        data: { ...mockData, referred_creators: [] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<RepresentativeReferrals />)
      expect(screen.getByText(/Yunus Uthman.*not referred any creators/i)).toBeInTheDocument()
    })

    it('shows empty state message for admin when clients list is empty', () => {
      useQuery.mockReturnValue({
        data: { ...mockData, referred_clients: [] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<RepresentativeReferrals />)
      fireEvent.click(screen.getByText('Clients'))
      expect(screen.getByText(/Yunus Uthman.*not referred any clients/i)).toBeInTheDocument()
    })

    it('shows "You have not referred any creators" for representative role', () => {
      useAuth.mockReturnValue({
        user: { role: 'representative', referCode: '5603' }
      })
      useQuery.mockReturnValue({
        data: { ...mockData, referred_creators: [] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<RepresentativeReferrals />)
      expect(screen.getByText(/You have.*not referred any creators/i)).toBeInTheDocument()
    })
  })

  describe('role-based query', () => {
    it('calls useQuery with representative-referred-user queryKey', () => {
      render(<RepresentativeReferrals />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['representative-referred-user', '5603']
        })
      )
    })

    it('uses getSalesRepresentativeList for admin role', () => {
      render(<RepresentativeReferrals />)
      const { queryFn } = useQuery.mock.calls[0][0]
      queryFn()
      expect(mockGetSalesRepresentativeList).toHaveBeenCalledWith('5603')
    })

    it('uses getSalesRepresentativeProfile for representative role', () => {
      useAuth.mockReturnValue({
        user: { role: 'representative', referCode: '5603' }
      })
      render(<RepresentativeReferrals />)
      const { queryFn } = useQuery.mock.calls[0][0]
      queryFn()
      expect(mockGetSalesRepresentativeProfile).toHaveBeenCalledWith('5603')
    })
  })
})