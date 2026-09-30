import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Transaction from '@/components/admin/client/transaction/Transaction'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className }) => <img src={src} className={className} alt="client" />,
}))

// ── Fixture ────────────────────────────────────────────────────────────────

const baseTransaction = {
  id: 'txn-001',
  client_firstname: 'Jane',
  client_lastname: 'Doe',
  client_pic: '/avatar.jpg',
  creator_paid: '5000',
  business_businessName: 'Top Cuts',
  ref_no: 'REF-123',
  date: '2024-05-01',
  status: 'success',
}

const renderTransaction = (props = {}) =>
  render(
    <Transaction
      transaction={baseTransaction}
      borderClass="border-l-4 border-green-500"
      textColorClass="text-green-500"
      {...props}
    />
  )

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Transaction', () => {

  // — Rendering —

  it('shows client full name (lastname first)', () => {
    renderTransaction()
    expect(screen.getByTestId('name-txn-001')).toHaveTextContent('Doe Jane')
  })

  it('shows client profile picture', () => {
    renderTransaction()
    expect(screen.getByAltText('client')).toHaveAttribute('src', '/avatar.jpg')
  })

  it('shows creator paid amount', () => {
    renderTransaction()
    expect(screen.getByText('5000')).toBeInTheDocument()
  })

  it('shows business name', () => {
    renderTransaction()
    expect(screen.getByText('Top Cuts')).toBeInTheDocument()
  })

  it('shows reference number', () => {
    renderTransaction()
    expect(screen.getByText('REF-123')).toBeInTheDocument()
  })

  it('shows transaction date', () => {
    renderTransaction()
    expect(screen.getByText('2024-05-01')).toBeInTheDocument()
  })

  it('shows transaction status', () => {
    renderTransaction()
    expect(screen.getByTestId('status-txn-001')).toHaveTextContent('success')
  })

  // — Props passed through —

  it('applies borderClass to the card container', () => {
    renderTransaction({ borderClass: 'border-l-4 border-red-500' })
    const card = screen.getByTestId('name-txn-001').closest('div.mt-5')
    expect(card?.className).toContain('border-red-500')
  })

  it('applies textColorClass to the status element', () => {
    renderTransaction({ textColorClass: 'text-red-500' })
    expect(screen.getByTestId('status-txn-001').className).toContain('text-red-500')
  })

  // — Edge cases —

  it('renders with empty optional fields gracefully', () => {
    const transaction = {
      ...baseTransaction,
      creator_paid: '',
      business_businessName: '',
      ref_no: '',
      date: '',
    }
    renderTransaction({ transaction })
    expect(screen.getByTestId('name-txn-001')).toBeInTheDocument()
  })
})