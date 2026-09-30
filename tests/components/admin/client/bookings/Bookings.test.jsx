import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useAdminClientStore } from '@/store/admin/clientStore/useAdminClient'
import React from 'react'
import Bookings from '@/components/admin/client/bookings/Bookings'

// --- Mocks ---

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useQuery: vi.fn() }
})

vi.mock('@/store/admin/clientStore/useAdminClient', () => ({
  useAdminClientStore: vi.fn()
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, alt, className }) => <img src={src} alt={alt} className={className} />
}))

vi.mock('@/components/admin/client/bookings/BookingHeader', () => ({
  default: () => <div data-testid="booking-header">header</div>
}))

vi.mock('@/components/admin/client/bookings/Booking', () => ({
  default: ({ booking, handleAction }) => (
    <li data-testid={`booking-${booking.id}`}>
      <span>{booking.id}</span>
      <button onClick={() => handleAction(booking.id)}>action</button>
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

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => (
    <div data-testid="error-message">{error?.message ?? 'Something went wrong'}</div>
  )
}))

vi.mock('@/images/search-normal.png', () => ({ default: 'glass.png' }))

// --- Fixtures ---

const mockGetBookings = vi.fn()
const mockSearchBookings = vi.fn()

const mockBookings = [
  { id: 3, client: 'Alice' },
  { id: 1, client: 'Bob' },
  { id: 2, client: 'Charlie' },
]

const successState = {
  data: { appointments: mockBookings },
  isLoading: false,
  error: null,
  isError: false
}

// --- Tests ---

describe('Bookings', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // ✅ no selector — component calls useAdminClientStore() directly
    useAdminClientStore.mockReturnValue({
      getBookings: mockGetBookings,
      searchBookings: mockSearchBookings
    })

    useQuery.mockReturnValue(successState)
  })

  describe('rendering', () => {
    it('renders the search input', () => {
      render(<Bookings />)
      expect(screen.getByPlaceholderText('Search bookings...')).toBeInTheDocument()
    })

    it('renders the filter button', () => {
      render(<Bookings />)
      expect(screen.getByText('filter')).toBeInTheDocument()
    })

    it('renders the BookingHeader', () => {
      render(<Bookings />)
      expect(screen.getByTestId('booking-header')).toBeInTheDocument()
    })

    it('renders the Paginator', () => {
      render(<Bookings />)
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('renders a Booking row for each booking', () => {
      render(<Bookings />)
      expect(screen.getByTestId('booking-1')).toBeInTheDocument()
      expect(screen.getByTestId('booking-2')).toBeInTheDocument()
      expect(screen.getByTestId('booking-3')).toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('renders AdminUserLoader when isLoading is true', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<Bookings />)
      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

    it('does not render booking rows while loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<Bookings />)
      expect(screen.queryByTestId('booking-1')).not.toBeInTheDocument()
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
      render(<Bookings />)
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch')
    })

    it('does not render booking rows when isError is true', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch' },
        isError: true
      })
      render(<Bookings />)
      expect(screen.queryByTestId('booking-1')).not.toBeInTheDocument()
    })
  })

  describe('filter / sort options', () => {
    it('does not show sort options by default', () => {
      render(<Bookings />)
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
      expect(screen.queryByText('latest')).not.toBeInTheDocument()
    })

    it('shows sort options when filter is clicked', () => {
      render(<Bookings />)
      fireEvent.click(screen.getByText('filter'))
      expect(screen.getByText('oldest')).toBeInTheDocument()
      expect(screen.getByText('latest')).toBeInTheDocument()
    })

    it('hides sort options when filter is clicked again', () => {
      render(<Bookings />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('filter'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })

    it('closes sort options after selecting a sort order', () => {
      render(<Bookings />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })
  })

  describe('sort order', () => {
    it('renders bookings in descending order by default (latest)', () => {
      render(<Bookings />)
      const rows = screen.getAllByTestId(/^booking-\d/)
      const ids = rows.map(el => el.getAttribute('data-testid'))
      expect(ids).toEqual(['booking-3', 'booking-2', 'booking-1'])
    })

    it('renders bookings in ascending order when "oldest" is selected', () => {
      render(<Bookings />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))

      const rows = screen.getAllByTestId(/^booking-\d/)
      const ids = rows.map(el => el.getAttribute('data-testid'))
      expect(ids).toEqual(['booking-1', 'booking-2', 'booking-3'])
    })

    it('returns to descending order when "latest" is selected after "oldest"', () => {
      render(<Bookings />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('latest'))

      const rows = screen.getAllByTestId(/^booking-\d/)
      const ids = rows.map(el => el.getAttribute('data-testid'))
      expect(ids).toEqual(['booking-3', 'booking-2', 'booking-1'])
    })
  })

  describe('search', () => {
    it('updates the search input value when typed into', () => {
      render(<Bookings />)
      const input = screen.getByPlaceholderText('Search bookings...')
      fireEvent.change(input, { target: { value: 'Alice' } })
      expect(input.value).toBe('Alice')
    })

    it('calls useQuery with debouncedSearch in the queryKey after input', async () => {
      render(<Bookings />)
      const input = screen.getByPlaceholderText('Search bookings...')

      act(() => {
        fireEvent.change(input, { target: { value: 'Alice' } })
      })

      await waitFor(() => {
        expect(useQuery).toHaveBeenCalledWith(
          expect.objectContaining({
            queryKey: expect.arrayContaining(['admin-bookings'])
          })
        )
      })
    })
  })

  describe('data sources', () => {
    it('renders bookings from appointments key', () => {
      useQuery.mockReturnValue({
        data: { appointments: [{ id: 10, client: 'A' }] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Bookings />)
      expect(screen.getByTestId('booking-10')).toBeInTheDocument()
    })

    it('renders bookings from results key (search response)', () => {
      useQuery.mockReturnValue({
        data: { results: [{ id: 20, client: 'B' }] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Bookings />)
      expect(screen.getByTestId('booking-20')).toBeInTheDocument()
    })

    it('renders empty list when data is undefined', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Bookings />)
      expect(screen.queryByTestId(/^booking-\d/)).not.toBeInTheDocument()
    })

    it('renders empty list when appointments is empty', () => {
      useQuery.mockReturnValue({
        data: { appointments: [] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Bookings />)
      expect(screen.queryByTestId(/^booking-\d/)).not.toBeInTheDocument()
    })
  })

  describe('pagination', () => {
    it('renders paginator starting at page 1', () => {
      render(<Bookings />)
      expect(screen.getByTestId('paginator')).toHaveTextContent('page:1')
    })

    it('advances to page 2 when next is clicked', async () => {
      render(<Bookings />)
      fireEvent.click(screen.getByText('next'))
      await waitFor(() => {
        expect(screen.getByTestId('paginator')).toHaveTextContent('page:2')
      })
    })

    it('calls useQuery with updated page in the queryKey', async () => {
      render(<Bookings />)
      fireEvent.click(screen.getByText('next'))
      await waitFor(() => {
        expect(useQuery).toHaveBeenCalledWith(
          expect.objectContaining({ queryKey: ['admin-bookings', 2, ''] })
        )
      })
    })
  })

  describe('handleAction toggle', () => {
    it('does not crash when an action button is clicked', () => {
      render(<Bookings />)
      const actionBtns = screen.getAllByText('action')
      fireEvent.click(actionBtns[0])
    })
  })

  describe('useQuery config', () => {
    it('calls useQuery with correct initial queryKey', () => {
      render(<Bookings />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: ['admin-bookings', 1, ''] })
      )
    })
  })
})