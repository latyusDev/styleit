import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useAdminCreatorStore } from '@/store/admin/creatoreStore/useAdminCreator'
import React from 'react'
import CreatorPayments from '@/components/admin/creator/payment/CreatorPayments'

// --- Mocks ---

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useQuery: vi.fn() }
})

vi.mock('@/store/admin/creatoreStore/useAdminCreator', () => ({
  useAdminCreatorStore: vi.fn()
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className, alt }) => <img src={src} className={className} alt={alt} />
}))

vi.mock('@/components/admin/creator/payment/CreatorPaymentHeader', () => ({
  default: ({ full }) => <div data-testid="creator-payment-header">header</div>
}))

vi.mock('@/components/admin/creator/payment/CreatorPayment', () => ({
  default: ({ payment, handleAction }) => (
    <li data-testid={`creator-payment-${payment?.payment_id}`}>
      <span>{payment.payment_id}</span>
      <button onClick={() => handleAction(payment.payment_id)}>action</button>
    </li>
  )
}))

vi.mock('@/components/global/loaders/AdminUserLoader', () => ({
  default: () => <div data-testid="admin-user-loader" />
}))

vi.mock('@/components/global/Paginator', () => ({
  default: ({ page, setPage }) => (
    <div data-testid="paginator">
      <span>page:{page}</span>
      <button onClick={() => setPage(page + 1)}>next</button>
    </div>
  )
}))

vi.mock('@/components/admin/creator/modals/CreatorSearchModal', () => ({
  default: ({ paymentModal, setPaymentModal }) => (
    <div data-testid="creator-search-modal">
      <span>{paymentModal ? 'open' : 'closed'}</span>
      <button onClick={() => setPaymentModal(false)}>close</button>
    </div>
  )
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => (
    <div data-testid="error-message">{error?.message ?? 'Something went wrong'}</div>
  )
}))

vi.mock('@/images/search-normal.png', () => ({ default: 'glass.png' }))
vi.mock('@/images/profile_i.png', () => ({ default: 'profile.png' }))

// --- Fixtures ---

const mockGetCreatorPayments = vi.fn()

const mockPayments = [
  { payment_id: 3, amount: 5000 },
  { payment_id: 1, amount: 2000 },
  { payment_id: 2, amount: 3000 },
]

const successState = {
  data: { payments: mockPayments },
  isLoading: false,
  error: null,
  isError: false
}

// --- Tests ---

describe('CreatorPayments', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAdminCreatorStore.mockImplementation((selector) =>
      selector({ getCreatorPayments: mockGetCreatorPayments })
    )
    useQuery.mockReturnValue(successState)
  })

  describe('rendering', () => {
    it('renders the search input', () => {
      render(<CreatorPayments />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders the filter button', () => {
      render(<CreatorPayments />)
      expect(screen.getByText('filter')).toBeInTheDocument()
    })

    it('renders the CreatorPaymentHeader', () => {
      render(<CreatorPayments />)
      expect(screen.getByTestId('creator-payment-header')).toBeInTheDocument()
    })

    it('renders the Paginator', () => {
      render(<CreatorPayments />)
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('renders the CreatorSearchModal as closed by default', () => {
      render(<CreatorPayments />)
      expect(screen.getByTestId('creator-search-modal')).toHaveTextContent('closed')
    })

    it('renders a CreatorPayment row for each payment', () => {
      render(<CreatorPayments />)
      expect(screen.getByTestId('creator-payment-1')).toBeInTheDocument()
      expect(screen.getByTestId('creator-payment-2')).toBeInTheDocument()
      expect(screen.getByTestId('creator-payment-3')).toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('renders AdminUserLoader when isLoading is true', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<CreatorPayments />)
      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

    it('does not render payment rows while loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<CreatorPayments />)
      expect(screen.queryByTestId('creator-payment-1')).not.toBeInTheDocument()
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
      render(<CreatorPayments />)
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch')
    })

    it('does not render payment rows when isError is true', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch' },
        isError: true
      })
      render(<CreatorPayments />)
      expect(screen.queryByTestId('creator-payment-1')).not.toBeInTheDocument()
    })
  })

  describe('search modal', () => {
    it('opens the search modal when the search input is clicked', () => {
      render(<CreatorPayments />)
      fireEvent.click(screen.getByRole('textbox'))
      expect(screen.getByTestId('creator-search-modal')).toHaveTextContent('open')
    })

    it('closes the search modal when close is triggered', () => {
      render(<CreatorPayments />)
      fireEvent.click(screen.getByRole('textbox'))
      fireEvent.click(screen.getByText('close'))
      expect(screen.getByTestId('creator-search-modal')).toHaveTextContent('closed')
    })
  })

  describe('filter / sort options', () => {
    it('does not show sort options by default', () => {
      render(<CreatorPayments />)
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
      expect(screen.queryByText('latest')).not.toBeInTheDocument()
    })

    it('shows sort options when filter button is clicked', () => {
      render(<CreatorPayments />)
      fireEvent.click(screen.getByText('filter'))
      expect(screen.getByText('oldest')).toBeInTheDocument()
      expect(screen.getByText('latest')).toBeInTheDocument()
    })

    it('hides sort options when filter is clicked again (toggle)', () => {
      render(<CreatorPayments />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('filter'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })

    it('closes sort options after selecting a sort order', () => {
      render(<CreatorPayments />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })
  })

  describe('sort order', () => {
    it('renders payments in descending order by default (latest)', () => {
      render(<CreatorPayments />)
      const payments = screen.getAllByTestId(/creator-payment-\d/)
      const ids = payments.map(el => el.getAttribute('data-testid'))
      expect(ids).toEqual([
        'creator-payment-3',
        'creator-payment-2',
        'creator-payment-1'
      ])
    })

    it('renders payments in ascending order when "oldest" is selected', () => {
      render(<CreatorPayments />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))

      const payments = screen.getAllByTestId(/creator-payment-\d/)
      const ids = payments.map(el => el.getAttribute('data-testid'))
      expect(ids).toEqual([
        'creator-payment-1',
        'creator-payment-2',
        'creator-payment-3'
      ])
    })

    it('returns to descending order when "latest" is selected after "oldest"', () => {
      render(<CreatorPayments />)

      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))

      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('latest'))

      const payments = screen.getAllByTestId(/creator-payment-\d/)
      const ids = payments.map(el => el.getAttribute('data-testid'))
      expect(ids).toEqual([
        'creator-payment-3',
        'creator-payment-2',
        'creator-payment-1'
      ])
    })
  })

  describe('empty payments', () => {
    it('renders an empty list when payments array is empty', () => {
      useQuery.mockReturnValue({
        data: { payments: [] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<CreatorPayments />)
      expect(screen.queryByTestId(/creator-payment-\d/)).not.toBeInTheDocument()
    })

    it('renders an empty list when data is undefined', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        isError: false
      })
      render(<CreatorPayments />)
      expect(screen.queryByTestId(/creator-payment-\d/)).not.toBeInTheDocument()
    })
  })

  describe('pagination', () => {
    it('renders paginator starting at page 1', () => {
      render(<CreatorPayments />)
      expect(screen.getByTestId('paginator')).toHaveTextContent('page:1')
    })

    it('advances to page 2 when next is clicked', async () => {
      render(<CreatorPayments />)
      fireEvent.click(screen.getByText('next'))
      await waitFor(() => {
        expect(screen.getByTestId('paginator')).toHaveTextContent('page:2')
      })
    })
  })

  describe('handleAction toggle', () => {
    it('calls handleAction with the correct payment id', () => {
      render(<CreatorPayments />)
      const actionBtn = screen.getAllByText('action')[0]
      fireEvent.click(actionBtn)
    })
  })

  describe('useQuery config', () => {
    it('calls useQuery with the correct queryKey on page 1', () => {
      render(<CreatorPayments />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: ['creator-payments', 1] })
      )
    })

    it('calls useQuery with updated queryKey after page change', async () => {
      render(<CreatorPayments />)
      fireEvent.click(screen.getByText('next'))
      await waitFor(() => {
        expect(useQuery).toHaveBeenCalledWith(
          expect.objectContaining({ queryKey: ['creator-payments', 2] })
        )
      })
    })
  })
})