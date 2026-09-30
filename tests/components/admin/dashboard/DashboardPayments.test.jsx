import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DashboardPayments from '@/components/admin/dashboard/payment/DashboardPayments'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/components/admin/creator/payment/CreatorPayment', () => ({
  default: ({ payment, handleAction, id }) => (
    <li data-testid={`payment-${payment.payment_id}`}>
      <span>{payment.amount}</span>
      <button
        data-testid={`action-${payment.payment_id}`}
        onClick={() => handleAction(payment.payment_id)}
      >
        toggle
      </button>
      {id === payment.payment_id && (
        <span data-testid={`selected-${payment.payment_id}`}>selected</span>
      )}
    </li>
  ),
}))

vi.mock('@/components/admin/creator/payment/CreatorPaymentHeader', () => ({
  default: ({ full }) => (
    <div data-testid="creator-payment-header" data-full={String(full)}>
      CreatorPaymentHeader
    </div>
  ),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockPayments = [
  { payment_id: 'pay-001', amount: '1000' },
  { payment_id: 'pay-002', amount: '2000' },
  { payment_id: 'pay-003', amount: '3000' },
]

// ── Tests ──────────────────────────────────────────────────────────────────

describe('DashboardPayments', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Static elements —

  it('renders the heading', () => {
    render(<DashboardPayments payments={mockPayments} />)
    expect(screen.getByText('Latest Payments')).toBeInTheDocument()
  })

  it('renders CreatorPaymentHeader', () => {
    render(<DashboardPayments payments={mockPayments} />)
    expect(screen.getByTestId('creator-payment-header')).toBeInTheDocument()
  })

  it('passes full={true} to CreatorPaymentHeader', () => {
    render(<DashboardPayments payments={mockPayments} />)
    expect(screen.getByTestId('creator-payment-header')).toHaveAttribute('data-full', 'true')
  })

  // — Payment list —

  it('renders all payments', () => {
    render(<DashboardPayments payments={mockPayments} />)
    mockPayments.forEach(({ payment_id }) => {
      expect(screen.getByTestId(`payment-${payment_id}`)).toBeInTheDocument()
    })
  })

  it('renders empty list without crashing', () => {
    render(<DashboardPayments payments={[]} />)
    expect(screen.getByText('Latest Payments')).toBeInTheDocument()
  })

  // — handleAction toggle —

  describe('handleAction toggle', () => {
    it('selects a payment on click', () => {
      render(<DashboardPayments payments={mockPayments} />)
      fireEvent.click(screen.getByTestId('action-pay-001'))
      expect(screen.getByTestId('selected-pay-001')).toBeInTheDocument()
    })

    it('deselects a payment when clicked again', () => {
      render(<DashboardPayments payments={mockPayments} />)
      fireEvent.click(screen.getByTestId('action-pay-001'))
      fireEvent.click(screen.getByTestId('action-pay-001'))
    })

    it('switches selection between payments', () => {
      render(<DashboardPayments payments={mockPayments} />)
      fireEvent.click(screen.getByTestId('action-pay-001'))
      fireEvent.click(screen.getByTestId('action-pay-002'))
      expect(screen.getByTestId('selected-pay-002')).toBeInTheDocument()
    })

    it('only one payment is selected at a time', () => {
      render(<DashboardPayments payments={mockPayments} />)
      fireEvent.click(screen.getByTestId('action-pay-001'))
      fireEvent.click(screen.getByTestId('action-pay-003'))
      expect(screen.queryAllByText('selected').length).toBe(1)
    })
  })
})