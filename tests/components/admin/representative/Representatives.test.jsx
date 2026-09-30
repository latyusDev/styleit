import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useAdminCreatorStore } from '@/store/admin/creatoreStore/useAdminCreator'
import { useAdminRepresentativeStore } from '@/store/admin/useAdminRepresentativeStore'
import React from 'react'
import Representatives from '@/components/admin/representative/Representatives'

// --- Mocks ---

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useQuery: vi.fn() }
})

vi.mock('@/store/admin/creatoreStore/useAdminCreator', () => ({
  useAdminCreatorStore: vi.fn()
}))

vi.mock('@/store/admin/useAdminRepresentativeStore', () => ({
  useAdminRepresentativeStore: vi.fn()
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, alt, className }) => <img src={src} alt={alt} className={className} />
}))

vi.mock('@/components/admin/representative/RepresentativeHeader', () => ({
  default: () => <div data-testid="representative-header">header</div>
}))

vi.mock('@/components/admin/representative/Representative', () => ({
  default: ({ representative }) => (
    <div data-testid={`representative-${representative.id}`}>
      <span>{representative.id}</span>
    </div>
  )
}))

vi.mock('@/components/admin/representative/RepresentativeCard', () => ({
  default: ({ representative, handleOptions }) => (
    <div data-testid={`representative-card-${representative.id}`}>
      <span>{representative.id}</span>
      <button onClick={() => handleOptions(representative.id)}>options</button>
    </div>
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

const mockSearchCreators = vi.fn()
const mockGetRepresentatives = vi.fn()

const mockRepresentatives = [
  { id: 3, name: 'Alice' },
  { id: 1, name: 'Bob' },
  { id: 2, name: 'Charlie' },
]

const successState = {
  data: { sales_reps: mockRepresentatives },
  isLoading: false,
  error: null,
  isError: false
}

// --- Tests ---

describe('Representatives', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAdminCreatorStore.mockReturnValue({ searchCreators: mockSearchCreators })
    useAdminRepresentativeStore.mockReturnValue({ getRepresentatives: mockGetRepresentatives })
    useQuery.mockReturnValue(successState)
  })

  describe('rendering', () => {
    it('renders the search input', () => {
      render(<Representatives />)
      expect(screen.getByPlaceholderText('Search representatives...')).toBeInTheDocument()
    })

    it('renders the filter button', () => {
      render(<Representatives />)
      expect(screen.getByText('filter')).toBeInTheDocument()
    })

    it('renders the RepresentativeHeader', () => {
      render(<Representatives />)
      expect(screen.getByTestId('representative-header')).toBeInTheDocument()
    })

    it('renders the Paginator', () => {
      render(<Representatives />)
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('renders a Representative row for each entry', () => {
      render(<Representatives />)
      expect(screen.getByTestId('representative-1')).toBeInTheDocument()
      expect(screen.getByTestId('representative-2')).toBeInTheDocument()
      expect(screen.getByTestId('representative-3')).toBeInTheDocument()
    })

    it('renders a RepresentativeCard for each entry (mobile)', () => {
      render(<Representatives />)
      expect(screen.getByTestId('representative-card-1')).toBeInTheDocument()
      expect(screen.getByTestId('representative-card-2')).toBeInTheDocument()
      expect(screen.getByTestId('representative-card-3')).toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('renders AdminUserLoader when isLoading is true', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<Representatives />)
      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

    it('does not render representative rows while loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<Representatives />)
      expect(screen.queryByTestId('representative-1')).not.toBeInTheDocument()
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
      render(<Representatives />)
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch')
    })

    it('does not render representative rows when isError is true', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch' },
        isError: true
      })
      render(<Representatives />)
      expect(screen.queryByTestId('representative-1')).not.toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('shows "No representatives found" on desktop when list is empty', () => {
      useQuery.mockReturnValue({
        data: { sales_reps: [] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Representatives />)
      expect(screen.getByText('No representatives found')).toBeInTheDocument()
    })

    it('shows "No representatives found" on mobile when list is empty', () => {
      useQuery.mockReturnValue({
        data: { sales_reps: [] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Representatives />)
      expect(screen.getByText('No representatives found')).toBeInTheDocument()
    })

    it('renders no rows when data is undefined', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Representatives />)
      expect(screen.queryByTestId(/^representative-\d/)).not.toBeInTheDocument()
    })
  })

  describe('filter / sort options', () => {
    it('does not show sort options by default', () => {
      render(<Representatives />)
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
      expect(screen.queryByText('latest')).not.toBeInTheDocument()
    })

    it('shows sort options when filter is clicked', () => {
      render(<Representatives />)
      fireEvent.click(screen.getByText('filter'))
      expect(screen.getByText('oldest')).toBeInTheDocument()
      expect(screen.getByText('latest')).toBeInTheDocument()
    })

    it('hides sort options when filter is clicked again', () => {
      render(<Representatives />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('filter'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })

    it('closes sort options after selecting a sort order', () => {
      render(<Representatives />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })
  })

  describe('sort order', () => {
    it('renders representatives in descending order by default (latest)', () => {
      render(<Representatives />)
      const rows = screen.getAllByTestId(/^representative-\d/)
      const ids = rows
        .map(el => el.getAttribute('data-testid'))
        .filter(id => !id.startsWith('representative-card'))
      expect(ids).toEqual(['representative-3', 'representative-2', 'representative-1'])
    })

    it('renders representatives in ascending order when "oldest" is selected', () => {
      render(<Representatives />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))

      const rows = screen.getAllByTestId(/^representative-\d/)
      const ids = rows
        .map(el => el.getAttribute('data-testid'))
        .filter(id => !id.startsWith('representative-card'))
      expect(ids).toEqual(['representative-1', 'representative-2', 'representative-3'])
    })

    it('returns to descending order when "latest" is selected after "oldest"', () => {
      render(<Representatives />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('latest'))

      const rows = screen.getAllByTestId(/^representative-\d/)
      const ids = rows
        .map(el => el.getAttribute('data-testid'))
        .filter(id => !id.startsWith('representative-card'))
      expect(ids).toEqual(['representative-3', 'representative-2', 'representative-1'])
    })
  })

  describe('data sources', () => {
    it('renders representatives from sales_reps key', () => {
      useQuery.mockReturnValue({
        data: { sales_reps: [{ id: 10, name: 'A' }] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Representatives />)
      expect(screen.getByTestId('representative-10')).toBeInTheDocument()
    })

    it('renders representatives from results key (search response)', () => {
      useQuery.mockReturnValue({
        data: { results: [{ id: 20, name: 'B' }] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Representatives />)
      expect(screen.getByTestId('representative-20')).toBeInTheDocument()
    })
  })

  describe('search', () => {
    it('updates the search input value when typed into', () => {
      render(<Representatives />)
      const input = screen.getByPlaceholderText('Search representatives...')
      fireEvent.change(input, { target: { value: 'Alice' } })
      expect(input.value).toBe('Alice')
    })

    it('calls useQuery with the correct queryKey shape after input', async () => {
      render(<Representatives />)
      const input = screen.getByPlaceholderText('Search representatives...')

      act(() => {
        fireEvent.change(input, { target: { value: 'Alice' } })
      })

      await waitFor(() => {
        expect(useQuery).toHaveBeenCalledWith(
          expect.objectContaining({
            queryKey: expect.arrayContaining(['admin-creators'])
          })
        )
      })
    })
  })

  describe('handleOptions toggle', () => {
    it('does not crash when options button is clicked', () => {
      render(<Representatives />)
      const optionsBtns = screen.getAllByText('options')
      fireEvent.click(optionsBtns[0])
    })
  })

  describe('pagination', () => {
    it('renders paginator starting at page 1', () => {
      render(<Representatives />)
      expect(screen.getByTestId('paginator')).toHaveTextContent('page:1')
    })

    it('advances to page 2 when next is clicked', async () => {
      render(<Representatives />)
      fireEvent.click(screen.getByText('next'))
      await waitFor(() => {
        expect(screen.getByTestId('paginator')).toHaveTextContent('page:2')
      })
    })

    it('calls useQuery with updated page in the queryKey', async () => {
      render(<Representatives />)
      fireEvent.click(screen.getByText('next'))
      await waitFor(() => {
        expect(useQuery).toHaveBeenCalledWith(
          expect.objectContaining({ queryKey: ['admin-creators', 2, ''] })
        )
      })
    })
  })

  describe('useQuery config', () => {
    it('calls useQuery with correct initial queryKey', () => {
      render(<Representatives />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: ['admin-creators', 1, ''] })
      )
    })
  })
})