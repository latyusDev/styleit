import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import Transactions from '@/components/admin/client/transaction/Transactions'


// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('@/store/admin/clientStore/useAdminClient', () => ({
  useAdminClientStore: () => ({
    getClientTransactions: vi.fn().mockResolvedValue({ transaction_payments: [] }),
  }),
}))

vi.mock('@/components/admin/client/transaction/Transaction', () => ({
  default: ({ transaction, borderClass, textColorClass }) => (
    <li
      data-testid={`transaction-${transaction.payment_id}`}
      data-border={borderClass}
      data-color={textColorClass}
    >
      {transaction.status}
    </li>
  ),
}))

vi.mock('@/components/admin/client/transaction/TransactionHeader', () => ({
  default: () => <div data-testid="transaction-header">TransactionHeader</div>,
}))

vi.mock('@/components/global/loaders/AdminUserLoader', () => ({
  default: () => <div data-testid="admin-user-loader">Loading...</div>,
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => (
    <div data-testid="error-message">{error?.message || 'Error'}</div>
  ),
}))

vi.mock('@/components/global/Paginator', () => ({
  default: ({ page }) => <div data-testid="paginator">Page: {page}</div>,
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockTransactions = [
  { payment_id: 'pay-001', status: 'success' },
  { payment_id: 'pay-002', status: 'paid' },
  { payment_id: 'pay-003', status: 'pending' },
  { payment_id: 'pay-004', status: 'declined' },
]

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Transactions', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Static elements —

  it('always renders TransactionHeader', () => {
    useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })
    render(<Transactions />)
    expect(screen.getByTestId('transaction-header')).toBeInTheDocument()
  })

  // — Loading state —

  describe('loading state', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })
    })

    it('shows the loader', () => {
      render(<Transactions />)
      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

 
  })

  // — Error state —

  describe('error state', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: true,
        error: { message: 'Failed to load transactions' },
        data: undefined,
      })
    })

    it('shows the error message', () => {
      render(<Transactions />)
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to load transactions')
    })

    it('does not show the loader', () => {
      render(<Transactions />)
      expect(screen.queryByTestId('admin-user-loader')).not.toBeInTheDocument()
    })

 
  })

  // — Empty state —

  describe('when transaction list is empty', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { transaction_payments: [] },
      })
    })

    it('shows the empty state message', () => {
      render(<Transactions />)
      expect(screen.getByText('No transaction is available')).toBeInTheDocument()
    })

    it('does not render the paginator', () => {
      render(<Transactions />)
      expect(screen.queryByTestId('paginator')).not.toBeInTheDocument()
    })

  })

  // — Success state —

  describe('when transactions are returned', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { transaction_payments: mockTransactions },
      })
    })

    it('renders all transaction items', () => {
      render(<Transactions />)
      mockTransactions.forEach(({ payment_id }) => {
        expect(screen.getByTestId(`transaction-${payment_id}`)).toBeInTheDocument()
      })
    })

    it('renders the paginator', () => {
      render(<Transactions />)
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('paginator starts on page 1', () => {
      render(<Transactions />)
      expect(screen.getByTestId('paginator')).toHaveTextContent('Page: 1')
    })

    it('does not show the loader', () => {
      render(<Transactions />)
      expect(screen.queryByTestId('admin-user-loader')).not.toBeInTheDocument()
    })

    it('does not show the empty state message', () => {
      render(<Transactions />)
      expect(screen.queryByText('No transaction is available')).not.toBeInTheDocument()
    })
  })

  // — Status color classes —

  describe('status color class mapping', () => {
    it.each([
      ['success', 'border-green-500', 'text-green-500'],
      ['paid', 'border-blue-500', 'text-blue-500'],
      ['pending', 'border-yellow-500', 'text-yellow-500'],
      ['declined', 'border-red-500', 'text-red-500'],
    ])('passes correct border and text classes for "%s" status', (status, borderColor, textColor) => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { transaction_payments: [{ payment_id: 'pay-test', status }] },
      })

      render(<Transactions />)

      const item = screen.getByTestId('transaction-pay-test')
      expect(item.dataset.border).toContain(borderColor)
      expect(item.dataset.color).toContain(textColor)
    })

    it('passes empty classes for unknown status', () => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { transaction_payments: [{ payment_id: 'pay-unknown', status: 'unknown' }] },
      })

      render(<Transactions />)

      const item = screen.getByTestId('transaction-pay-unknown')
      expect(item.dataset.border).toBe('')
      expect(item.dataset.color).toBe('')
    })
  })
})