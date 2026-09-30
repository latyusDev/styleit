import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import AllAdminTransaction from '@/components/admin/allTransfer/AllAdminTransaction'
AllAdminTransaction
// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('@/store/admin/useAdmin', () => ({
  useAdminStore: () => ({
    allTransfer: vi.fn().mockResolvedValue({ transfers: [] }),
  }),
}))

vi.mock('@/components/admin/allTransfer/AdminTransaction', () => ({
  default: ({ transaction, handleAction, id }) => (
    <li data-testid={`transaction-${transaction.transfer_id}`}>
      <span>{transaction.depositor}</span>
      <button
        data-testid={`action-${transaction.transfer_id}`}
        onClick={() => handleAction(transaction.transfer_id)}
      >
        toggle
      </button>
      {id === transaction.transfer_id && (
        <span data-testid={`selected-${transaction.transfer_id}`}>selected</span>
      )}
    </li>
  ),
}))

vi.mock('@/components/admin/allTransfer/TransactionHeader', () => ({
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
  { transfer_id: 'txn-001', depositor: 'Alice' },
  { transfer_id: 'txn-002', depositor: 'Bob' },
  { transfer_id: 'txn-003', depositor: 'Charlie' },
]

// ── Tests ──────────────────────────────────────────────────────────────────

describe('AllAdminTransaction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // — Loading state —

  describe('loading state', () => {
    it('shows loader while data is fetching', () => {
      useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })

      render(<AllAdminTransaction />)

      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

    it('does not show transactions while loading', () => {
      useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })

      render(<AllAdminTransaction />)

      expect(screen.queryByTestId('transaction-txn-001')).not.toBeInTheDocument()
    })
  })

  // — Error state —

  describe('error state', () => {
    it('shows error message when query fails', () => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: true,
        error: { message: 'Network error' },
        data: undefined,
      })

      render(<AllAdminTransaction />)

      expect(screen.getByTestId('error-message')).toHaveTextContent('Network error')
    })

    it('does not show loader on error', () => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: true,
        error: { message: 'Failed' },
        data: undefined,
      })

      render(<AllAdminTransaction />)

      expect(screen.queryByTestId('admin-user-loader')).not.toBeInTheDocument()
    })
  })

  // — Success state —

  describe('success state', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { transfers: mockTransactions },
      })
    })

    it('renders all transactions', () => {
      render(<AllAdminTransaction />)

      mockTransactions.forEach(({ transfer_id }) => {
        expect(screen.getByTestId(`transaction-${transfer_id}`)).toBeInTheDocument()
      })
    })

    it('renders TransactionHeader', () => {
      render(<AllAdminTransaction />)
      expect(screen.getByTestId('transaction-header')).toBeInTheDocument()
    })

    it('renders Paginator', () => {
      render(<AllAdminTransaction />)
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('does not show loader', () => {
      render(<AllAdminTransaction />)
      expect(screen.queryByTestId('admin-user-loader')).not.toBeInTheDocument()
    })
  })

  // — Empty state —

  it('renders an empty list when transfers is empty', () => {
    useQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { transfers: [] },
    })

    render(<AllAdminTransaction />)

  })

  // — handleAction (toggle selection) —

  describe('handleAction toggle', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { transfers: mockTransactions },
      })
    })

    it('selects a transaction on click', () => {
      render(<AllAdminTransaction />)

      fireEvent.click(screen.getByTestId('action-txn-001'))

      expect(screen.getByTestId('selected-txn-001')).toBeInTheDocument()
    })

    it('deselects a transaction when clicked again', () => {
      render(<AllAdminTransaction />)

      fireEvent.click(screen.getByTestId('action-txn-001'))
      fireEvent.click(screen.getByTestId('action-txn-001'))

      expect(screen.queryByTestId('selected-txn-001')).not.toBeInTheDocument()
    })

    it('switches selection to another transaction', () => {
      render(<AllAdminTransaction />)

      fireEvent.click(screen.getByTestId('action-txn-001'))
      fireEvent.click(screen.getByTestId('action-txn-002'))

      expect(screen.queryByTestId('selected-txn-001')).not.toBeInTheDocument()
      expect(screen.getByTestId('selected-txn-002')).toBeInTheDocument()
    })
  })

  // — Paginator starts on page 1 —

  it('starts on page 1', () => {
    useQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { transfers: [] },
    })

    render(<AllAdminTransaction />)

    expect(screen.getByTestId('paginator')).toHaveTextContent('Page: 1')
  })
})