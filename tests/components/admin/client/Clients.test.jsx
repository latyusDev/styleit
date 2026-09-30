import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Clients from '@/components/admin/client/Clients'
vi.mock('lucide-react', () => ({
  SortAsc: () => <span data-testid="sort-icon">Sort</span>,
  MoreHorizontal: () => <span data-testid="more-horizontal">More</span>,
  Eye: () => <span data-testid="eye-icon">Eye</span>,
  Loader2: () => <span data-testid="loader-icon">Loading</span>,
  Trash2: () => <span data-testid="trash-icon">Trash</span>,
  UserX: () => <span data-testid="user-x-icon">UserX</span>,
  X: () => <span>X</span>
}))
// --- Mocks ---

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() }))
}))

vi.mock('@/store/admin/clientStore/useAdminClient', () => ({
  useAdminClientStore: vi.fn(() => ({
    getClients: vi.fn(),
    searchClients: vi.fn()
  }))
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className, alt }) => (
    <img src={src} className={className} alt={alt} />
  )
}))

vi.mock('@/images/search-normal.png', () => ({ default: '/search-normal.png' }))


vi.mock('@/components/global/loaders/AdminUserLoader', () => ({
  default: () => <div data-testid="admin-user-loader" />
}))

vi.mock('@/components/global/Paginator', () => ({
  default: ({ page, setPage }) => (
    <div data-testid="paginator">
      <button onClick={() => setPage(page + 1)} data-testid="next-page">Next</button>
    </div>
  )
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => (
    <div data-testid="error-message">{error?.message}</div>
  )
}))

vi.mock('@/components/admin/clients/Client', () => ({
  default: ({ client }) => (
    <li data-testid={`client-${client.id}`}>{client.name}</li>
  )
}))

vi.mock('@/components/admin/clients/ClientHeader', () => ({
  default: () => <div data-testid="client-header" />
}))

// --- Fixtures ---

const mockClients = [
  { id: 3, name: 'Charlie', status: 'actived' },
  { id: 1, name: 'Alice', status: 'deactived' },
  { id: 2, name: 'Bob', status: 'suspended' }
]

// --- Helper ---

const setQueryState = ({ isLoading = false, isError = false, error = null, data = undefined } = {}) => {
  useQuery.mockReturnValue({ isLoading, isError, error, data })
}

// --- Tests ---

describe('Clients', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Loading state
  describe('loading state', () => {
    it('renders the loader while fetching', () => {
      setQueryState({ isLoading: true })
      render(<Clients />)
      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

    it('does not render clients while loading', () => {
      setQueryState({ isLoading: true })
      render(<Clients />)
      expect(screen.queryByTestId('client-1')).not.toBeInTheDocument()
    })

    it('does not render error message while loading', () => {
      setQueryState({ isLoading: true })
      render(<Clients />)
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  // Error state
  describe('error state', () => {
    it('renders the error message on failure', () => {
      setQueryState({ isError: true, error: { message: 'Something went wrong' } })
      render(<Clients />)
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('displays the correct error message text', () => {
      setQueryState({ isError: true, error: { message: 'Network error' } })
      render(<Clients />)
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })

    it('does not render clients on error', () => {
      setQueryState({ isError: true, error: { message: 'fail' } })
      render(<Clients />)
      expect(screen.queryByTestId('client-1')).not.toBeInTheDocument()
    })
  })

  // Empty state
  describe('empty state', () => {
    it('renders empty message when no clients are returned', () => {
      setQueryState({ data: { customers: [] } })
      render(<Clients />)
      expect(screen.getByText('No clients available')).toBeInTheDocument()
    })

    it('does not render the paginator when clients list is empty', () => {
      setQueryState({ data: { customers: [] } })
      render(<Clients />)
      expect(screen.queryByTestId('paginator')).not.toBeInTheDocument()
    })
  })

  // Success state
  describe('success state', () => {
    beforeEach(() => {
      setQueryState({ data: { customers: mockClients } })
    })

   

    it('renders the paginator when clients exist', () => {
      render(<Clients />)
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('does not render the loader', () => {
      render(<Clients />)
      expect(screen.queryByTestId('admin-user-loader')).not.toBeInTheDocument()
    })

    it('does not render the error message', () => {
      render(<Clients />)
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  // Search
  describe('search input', () => {
    it('renders the search input', () => {
      setQueryState({ data: { customers: [] } })
      render(<Clients />)
      expect(screen.getByPlaceholderText('Search clients...')).toBeInTheDocument()
    })

    it('updates search input value on change', () => {
      setQueryState({ data: { customers: [] } })
      render(<Clients />)
      const input = screen.getByPlaceholderText('Search clients...')
      fireEvent.change(input, { target: { value: 'Alice' } })
      expect(input.value).toBe('Alice')
    })
  })

  // Sort / filter
  describe('sort/filter', () => {
    beforeEach(() => {
      setQueryState({ data: { customers: mockClients } })
    })

    it('renders the filter button', () => {
      render(<Clients />)
      expect(screen.getByText('filter')).toBeInTheDocument()
    })

    it('does not show sort options by default', () => {
      render(<Clients />)
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
      expect(screen.queryByText('latest')).not.toBeInTheDocument()
    })

    it('shows sort options when filter button is clicked', () => {
      render(<Clients />)
      fireEvent.click(screen.getByText('filter'))
      expect(screen.getByText('oldest')).toBeInTheDocument()
      expect(screen.getByText('latest')).toBeInTheDocument()
    })

    it('hides sort options after selecting an option', () => {
      render(<Clients />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })

  })

  // Pagination
  describe('pagination', () => {
    it('advances to the next page when next is clicked', async () => {
      setQueryState({ data: { customers: mockClients } })
      render(<Clients />)
      fireEvent.click(screen.getByTestId('next-page'))
      await waitFor(() => {
        expect(useQuery).toHaveBeenLastCalledWith(
          expect.objectContaining({ queryKey: expect.arrayContaining([2]) })
        )
      })
    })
  })

})