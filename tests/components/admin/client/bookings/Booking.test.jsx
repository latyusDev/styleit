import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useLocation } from 'react-router-dom'
import Booking from '@/components/admin/client/bookings/Booking'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  Link: ({ to, children, className }) => (
    <a href={to} className={className} data-testid="view-all-link">
      {children}
    </a>
  ),
}))

vi.mock('lucide-react', () => ({
  ChevronRight: ({ onClick, className }) => (
    <button data-testid="chevron-icon" className={className} onClick={onClick} />
  ),
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className }) => <img src={src} className={className} alt="client" />,
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const baseBooking = {
  id: 'bk-001',
  booking_id: 'bk-001',
  client_firstname: 'John',
  client_lastname: 'Doe',
  client_pic: '/avatar.jpg',
  client_id: 'client-99',
  collection_date: '2024-05-01',
  booking_date: '2024-04-20',
  booking_time: '10:00am',
  collectionTime: '11:00am',
  creator_businessName: 'Top Cuts',
  status: 'pending',
}

const renderBooking = (props = {}, pathname = '/admin/bookings') => {
  useLocation.mockReturnValue({ pathname })
  const defaults = {
    booking: baseBooking,
    handleAction: vi.fn(),
    id: null,
    isAll: true,
  }
  return render(<Booking {...defaults} {...props} />)
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Booking', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Core fields —

  describe('renders booking fields', () => {
    it('shows client full name', () => {
      renderBooking()
      expect(screen.getByTestId('name-bk-001')).toHaveTextContent('John Doe')
    })

    it('shows collection date', () => {
      renderBooking()
      expect(screen.getByTestId('collectionDate-bk-001')).toHaveTextContent('2024-05-01')
    })

    it('shows booking date', () => {
      renderBooking()
      expect(screen.getByTestId('bookingDate-bk-001')).toHaveTextContent('2024-04-20')
    })

    it('shows status', () => {
      renderBooking()
      expect(screen.getByTestId('status-bk-001')).toHaveTextContent('pending')
    })

    it('shows client profile picture', () => {
      renderBooking()
      expect(screen.getByAltText('client')).toHaveAttribute('src', '/avatar.jpg')
    })
  })

  // — Fallback fields (booking_id, collectionDate, booking_Time) —

  it('uses booking_id when id is absent', () => {
    const booking = { ...baseBooking, id: undefined, booking_id: 'bk-fallback' }
    renderBooking({ booking })
    expect(screen.getByTestId('name-bk-fallback')).toBeInTheDocument()
  })

  it('uses collectionDate fallback when collection_date is absent', () => {
    const booking = { ...baseBooking, collection_date: undefined, collectionDate: '2024-06-01' }
    renderBooking({ booking })
    expect(screen.getByTestId('collectionDate-bk-001')).toHaveTextContent('2024-06-01')
  })

  it('uses booking_Time fallback when booking_time is absent', () => {
    const booking = { ...baseBooking, booking_time: undefined, booking_Time: '09:00am' }
    renderBooking({ booking })
    // booking_time renders in the always-visible mobile section
    expect(screen.getAllByText('09:00am').length).toBeGreaterThan(0)
  })

  // — Status colors —

  describe('status text color', () => {
    it.each([
      ['accept', 'text-green-500'],
      ['decline', 'text-red-500'],
      ['completed', 'text-blue-500'],
      ['pending', 'text-yellow-500'],
      ['not decided', 'text-yellow-500'],
    ])('applies %s color for "%s" status', (status, cls) => {
      renderBooking({ booking: { ...baseBooking, status } })
      expect(screen.getByTestId(`status-bk-001`).className).toContain(cls)
    })
  })

  // — Chevron / action button —

  describe('action button', () => {
    it('renders chevron button', () => {
      renderBooking()
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
    })

    it('calls handleAction with booking id on click', () => {
      const handleAction = vi.fn()
      renderBooking({ handleAction })
      fireEvent.click(screen.getByTestId('chevron-icon'))
      expect(handleAction).toHaveBeenCalledWith('bk-001')
    })

    it('applies rotate-90 when booking is selected', () => {
      renderBooking({ id: 'bk-001' })
      expect(screen.getByTestId('chevron-icon').className).toContain('rotate-90')
    })

    it('does not apply rotate-90 when booking is not selected', () => {
      renderBooking({ id: 'other-id' })
      expect(screen.getByTestId('chevron-icon').className).not.toContain('rotate-90')
    })
  })

  // — Expanded detail panel (otherColumns) —

  describe('expanded details panel', () => {
    it('shows otherColumns when booking is selected', () => {
      renderBooking({ id: 'bk-001' })
      expect(screen.getByTestId('otherColumns')).toBeInTheDocument()
    })

    it('hides otherColumns when booking is not selected', () => {
      renderBooking({ id: null })
      expect(screen.queryByTestId('otherColumns')).not.toBeInTheDocument()
    })

    it('shows business name in expanded panel', () => {
      renderBooking({ id: 'bk-001' })
      expect(screen.getAllByTestId(`receiver-bk-001`)[0]).toHaveTextContent('Top Cuts')
    })

    it('shows collection time in expanded panel', () => {
      renderBooking({ id: 'bk-001' })
      expect(screen.getByTestId(`collectionTime-bk-001`)).toHaveTextContent('11:00am')
    })

    it('shows booking time in expanded panel', () => {
      renderBooking({ id: 'bk-001' })
      expect(screen.getByTestId(`bookingTime-bk-001`)).toHaveTextContent('10:00am')
    })
  })

  // — "View all" link —

  describe('"View all" link', () => {


    it('hides view all link in expanded panel when isAll is false', () => {
      renderBooking({ id: 'bk-001', isAll: false })
      // The expanded (desktop) panel should not have the link when isAll=false
      expect(screen.queryByTestId('otherColumns')?.querySelector('a')).toBeNull()
    })

    it('hides view all link on mobile when pathname ends with "b"', () => {
      useLocation.mockReturnValue({ pathname: '/admin/client-99/b' })
      render(
        <Booking
          booking={baseBooking}
          handleAction={vi.fn()}
          id={null}
          isAll={true}
        />
      )
      // isHidden=true so the mobile link is suppressed
      const links = screen.queryAllByTestId('view-all-link')
      expect(links.length).toBe(0)
    })
  })
})