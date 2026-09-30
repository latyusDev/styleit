import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AdminTransaction from '@/components/admin/allTransfer/AdminTransaction'
import { safeDate } from '@/static/data'

// ── Mock ───────────────────────────────────────────────────────────────────

vi.mock('lucide-react', () => ({
  ChevronRight: ({ onClick, className }) => (
    <button data-testid="chevron-icon" className={className} onClick={onClick} />
  ),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const baseTransaction = {
  transfer_id: 'txn-001',
  depositor: 'John Doe',
  receiver_name: 'Jane Smith',
  amount_remitted: '50000',
  created_at: '2024-01-15T10:30:00Z',
  status: 'success',
  receiver_account_number: '0123456789',
  receiver_bank: 'First Bank',
  reference: 'REF-ABC123',
  transaction_reference: 'TXN-XYZ999',
  receiver_email: 'jane@example.com',
}

const renderComponent = (props = {}) => {
  const defaults = {
    transaction: baseTransaction,
    handleAction: vi.fn(),
    id: null,
    isAll: true,
  }
  return render(<AdminTransaction {...defaults} {...props} />)
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('AdminTransaction', () => {
  let handleAction

  beforeEach(() => {
    handleAction = vi.fn()
  })

  // — Core fields —

  describe('renders transaction fields', () => {
    it('shows depositor name', () => {
      renderComponent({ handleAction })
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('shows receiver name', () => {
      renderComponent({ handleAction })
      expect(screen.getByTestId(`collectionDate-${baseTransaction.transfer_id}`))
        .toHaveTextContent('Jane Smith')
    })

    it('shows amount with naira sign', () => {
      renderComponent({ handleAction })
      expect(screen.getByText('₦50000')).toBeInTheDocument()
    })

    it('shows formatted transaction date', () => {
      renderComponent({ handleAction })
      const expected = new Date(safeDate(baseTransaction.created_at)).toLocaleDateString()
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('shows transaction status', () => {
      renderComponent({ handleAction })
      expect(screen.getByTestId(`status-${baseTransaction.transfer_id}`))
        .toHaveTextContent('success')
    })
  })

  // — Status border colors —

  describe('status border styling', () => {
    it.each([
      ['success', 'border-green-500'],
      ['decline', 'border-red-500'],
      ['completed', 'border-blue-500'],
      ['pending', 'border-yellow-500'],
      ['not decided', 'border-yellow-500'],
    ])('applies correct border for "%s" status', (status, expectedClass) => {
      renderComponent({ transaction: { ...baseTransaction, status } })
      const statusEl = screen.getByTestId(`status-${baseTransaction.transfer_id}`)
      // Walk up to the bordered container
      const borderedDiv = statusEl.closest('div.mt-5')
      expect(borderedDiv?.className).toContain(expectedClass)
    })
  })

  // — Chevron / action button —

  describe('action button', () => {
    it('renders the chevron button', () => {
      renderComponent({ handleAction })
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
    })

    it('calls handleAction with transfer_id when chevron is clicked', () => {
      renderComponent({ handleAction })
      fireEvent.click(screen.getByTestId('chevron-icon'))
      expect(handleAction).toHaveBeenCalledWith(baseTransaction.transfer_id)
    })

    it('applies rotate-90 class when item is selected', () => {
      renderComponent({ handleAction, id: baseTransaction.transfer_id })
      expect(screen.getByTestId('chevron-icon').className).toContain('rotate-90')
    })

    it('does not apply rotate-90 when item is not selected', () => {
      renderComponent({ handleAction, id: 'other-id' })
      expect(screen.getByTestId('chevron-icon').className).not.toContain('rotate-90')
    })
  })

  // — Expanded detail panel —

  describe('expanded details (selected item)', () => {
    it('shows otherColumns panel when transfer_id matches id', () => {
      renderComponent({ handleAction, id: baseTransaction.transfer_id })
      expect(screen.getByTestId('otherColumns')).toBeInTheDocument()
    })

    it('does not show otherColumns when item is not selected', () => {
      renderComponent({ handleAction, id: 'other-id' })
      expect(screen.queryByTestId('otherColumns')).not.toBeInTheDocument()
    })

    it('shows receiver account number in expanded panel', () => {
      renderComponent({ handleAction, id: baseTransaction.transfer_id })
      expect(screen.getByTestId(`receiver-${baseTransaction.transfer_id}`))
        .toHaveTextContent('0123456789')
    })

    it('shows receiver bank in expanded panel', () => {
      renderComponent({ handleAction, id: baseTransaction.transfer_id })
      expect(screen.getByTestId(`collectionTime-${baseTransaction.transfer_id}`))
        .toHaveTextContent('First Bank')
    })

 
  })
})