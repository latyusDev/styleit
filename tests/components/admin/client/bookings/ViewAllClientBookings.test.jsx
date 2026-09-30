import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import ViewAllClientBookings from '@/components/admin/client/bookings/ViewAllClientBookings'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}))

vi.mock('@/store/admin/clientStore/useAdminClient', () => ({
  useAdminClientStore: () => ({
    viewAllClientBookings: vi.fn().mockResolvedValue({ appointments: [] }),
  }),
}))

vi.mock('@/components/admin/client/bookings/Booking', () => ({
  default: ({ booking, handleAction, id }) => (
    <li data-testid={`booking-${booking.id}`}>
      <span>{booking.service}</span>
      <button
        data-testid={`action-${booking.id}`}
        onClick={() => handleAction(booking.id)}
      >
        toggle
      </button>
      {id === booking.id && (
        <span data-testid={`selected-${booking.id}`}>selected</span>
      )}
    </li>
  ),
}))

vi.mock('@/components/admin/client/bookings/BookingHeader', () => ({
  default: () => <div data-testid="booking-header">BookingHeader</div>,
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

const mockAppointments = [
  { id: 'bk-001', booking_id: 'bk-001', service: 'Haircut' },
  { id: 'bk-002', booking_id: 'bk-002', service: 'Massage' },
]

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ViewAllClientBookings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useParams.mockReturnValue({ id: 'client-123' })
  })

  // — Static elements —

  it('always renders the page heading', () => {
    useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })
    render(<ViewAllClientBookings />)
    expect(screen.getByText('All Bookings')).toBeInTheDocument()
  })

  it('always renders BookingHeader', () => {
    useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })
    render(<ViewAllClientBookings />)
    expect(screen.getByTestId('booking-header')).toBeInTheDocument()
  })

  // — Loading state —

  describe('loading state', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })
    })

    it('shows the loader', () => {
      render(<ViewAllClientBookings />)
      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

  })

  // — Error state —

  describe('error state', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: true,
        error: { message: 'Failed to fetch bookings' },
        data: undefined,
      })
    })

    it('shows the error message', () => {
      render(<ViewAllClientBookings />)
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch bookings')
    })

    it('does not show the loader', () => {
      render(<ViewAllClientBookings />)
      expect(screen.queryByTestId('admin-user-loader')).not.toBeInTheDocument()
    })
  })

  // — Empty appointments —

  describe('when appointments list is empty', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { appointments: [] },
      })
    })

    it('shows the single booking message', () => {
      render(<ViewAllClientBookings />)
      expect(screen.getByText('This client only has one booking')).toBeInTheDocument()
    })

    it('does not render the paginator', () => {
      render(<ViewAllClientBookings />)
      expect(screen.queryByTestId('paginator')).not.toBeInTheDocument()
    })

   
  })

  // — Success state with appointments —

  describe('when appointments are returned', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { appointments: mockAppointments },
      })
    })

    it('renders all booking items', () => {
      render(<ViewAllClientBookings />)
      mockAppointments.forEach(({ id }) => {
        expect(screen.getByTestId(`booking-${id}`)).toBeInTheDocument()
      })
    })

    it('renders the paginator', () => {
      render(<ViewAllClientBookings />)
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('paginator starts on page 1', () => {
      render(<ViewAllClientBookings />)
      expect(screen.getByTestId('paginator')).toHaveTextContent('Page: 1')
    })

    it('does not show loader', () => {
      render(<ViewAllClientBookings />)
      expect(screen.queryByTestId('admin-user-loader')).not.toBeInTheDocument()
    })

    it('does not show single booking message', () => {
      render(<ViewAllClientBookings />)
      expect(screen.queryByText('This client only has one booking')).not.toBeInTheDocument()
    })
  })

  // — handleAction toggle —

  describe('handleAction toggle', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { appointments: mockAppointments },
      })
    })

    it('selects a booking on click', () => {
      render(<ViewAllClientBookings />)
      fireEvent.click(screen.getByTestId('action-bk-001'))
      expect(screen.getByTestId('selected-bk-001')).toBeInTheDocument()
    })

    it('switches selection between bookings', () => {
      render(<ViewAllClientBookings />)
      fireEvent.click(screen.getByTestId('action-bk-001'))
      fireEvent.click(screen.getByTestId('action-bk-002'))
      expect(screen.queryByTestId('selected-bk-001')).not.toBeInTheDocument()
      expect(screen.getByTestId('selected-bk-002')).toBeInTheDocument()
    })
  })
})