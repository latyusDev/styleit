import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DashboardBookings from '@/components/admin/dashboard/booking/DashboardBookings'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/components/admin/client/bookings/Booking', () => ({
  default: ({ booking, handleAction, id }) => (
    <li data-testid={`booking-${booking.id || booking.booking_id}`}>
      <span>{booking.service}</span>
      <button
        data-testid={`action-${booking.id || booking.booking_id}`}
        onClick={() => handleAction(booking.id || booking.booking_id)}
      >
        toggle
      </button>
      {id === (booking.id || booking.booking_id) && (
        <span data-testid={`selected-${booking.id || booking.booking_id}`}>selected</span>
      )}
    </li>
  ),
}))

vi.mock('@/components/admin/client/bookings/BookingHeader', () => ({
  default: () => <div data-testid="booking-header">BookingHeader</div>,
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockBookings = [
  { id: 'bk-001', service: 'Haircut' },
  { id: 'bk-002', service: 'Massage' },
  { id: 'bk-003', service: 'Facial' },
]

// ── Tests ──────────────────────────────────────────────────────────────────

describe('DashboardBookings', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Static elements —

  it('renders the heading', () => {
    render(<DashboardBookings bookings={mockBookings} />)
    expect(screen.getByText('Latest Bookings')).toBeInTheDocument()
  })

  it('renders BookingHeader', () => {
    render(<DashboardBookings bookings={mockBookings} />)
    expect(screen.getByTestId('booking-header')).toBeInTheDocument()
  })

  // — Booking list —

  it('renders all bookings', () => {
    render(<DashboardBookings bookings={mockBookings} />)
    mockBookings.forEach(({ id }) => {
      expect(screen.getByTestId(`booking-${id}`)).toBeInTheDocument()
    })
  })

  it('renders empty list without crashing', () => {
    render(<DashboardBookings bookings={[]} />)
    expect(screen.getByText('Latest Bookings')).toBeInTheDocument()
  })

  it('uses booking_id as key fallback when id is absent', () => {
    const bookings = [{ booking_id: 'bk-fallback', service: 'Waxing' }]
    render(<DashboardBookings bookings={bookings} />)
    expect(screen.getByTestId('booking-bk-fallback')).toBeInTheDocument()
  })

  // — handleAction toggle —

  describe('handleAction toggle', () => {
    it('selects a booking on click', () => {
      render(<DashboardBookings bookings={mockBookings} />)
      fireEvent.click(screen.getByTestId('action-bk-001'))
      expect(screen.getByTestId('selected-bk-001')).toBeInTheDocument()
    })

    it('deselects a booking when clicked again', () => {
      render(<DashboardBookings bookings={mockBookings} />)
      fireEvent.click(screen.getByTestId('action-bk-001'))
      fireEvent.click(screen.getByTestId('action-bk-001'))
    })

    it('switches selection between bookings', () => {
      render(<DashboardBookings bookings={mockBookings} />)
      fireEvent.click(screen.getByTestId('action-bk-001'))
      fireEvent.click(screen.getByTestId('action-bk-002'))
      expect(screen.getByTestId('selected-bk-002')).toBeInTheDocument()
    })

    it('only one booking is selected at a time', () => {
      render(<DashboardBookings bookings={mockBookings} />)
      fireEvent.click(screen.getByTestId('action-bk-001'))
      fireEvent.click(screen.getByTestId('action-bk-003'))
      const selected = screen.queryAllByText('selected')
      expect(selected.length).toBe(1)
    })
  })
})