import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useAdminCreatorStore } from '@/store/admin/creatoreStore/useAdminCreator'
import React from 'react'
import Creators from '@/components/admin/creator/Creators'

// --- Mocks ---

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useQuery: vi.fn() }
})

vi.mock('@/store/admin/creatoreStore/useAdminCreator', () => ({
  useAdminCreatorStore: vi.fn()
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, alt, className }) => <img src={src} alt={alt} className={className} />
}))

vi.mock('@/components/admin/creator/CreatorHeader', () => ({
  default: () => <div data-testid="creator-header">header</div>
}))

vi.mock('@/components/admin/creator/Creator', () => ({
  default: ({ creator, handleOptions }) => (
    <div data-testid={`creator-${creator.id}`}>
      <span>{creator.id}</span>
      <button onClick={() => handleOptions(creator.id)}>options</button>
    </div>
  )
}))

vi.mock('@/components/admin/creator/CreatorCard', () => ({
  default: ({ creator, handleOptions }) => (
    <div data-testid={`creator-card-${creator.id}`}>
      <span>{creator.id}</span>
      <button onClick={() => handleOptions(creator.id)}>options</button>
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

const mockGetCreators = vi.fn()
const mockSearchCreators = vi.fn()

const mockDesigners = [
  { id: 3, name: 'Alice' },
  { id: 1, name: 'Bob' },
  { id: 2, name: 'Charlie' },
]

const successState = {
  data: { designers: mockDesigners },
  isLoading: false,
  error: null,
  isError: false
}

// --- Tests ---

describe('Creators', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAdminCreatorStore.mockReturnValue({
      getCreators: mockGetCreators,
      searchCreators: mockSearchCreators
    })
    useQuery.mockReturnValue(successState)
  })

  describe('rendering', () => {
    it('renders the search input', () => {
      render(<Creators />)
      expect(screen.getByPlaceholderText('Search creators...')).toBeInTheDocument()
    })

    it('renders the filter button', () => {
      render(<Creators />)
      expect(screen.getByText('filter')).toBeInTheDocument()
    })

    it('renders the CreatorHeader', () => {
      render(<Creators />)
      expect(screen.getByTestId('creator-header')).toBeInTheDocument()
    })

    it('renders the Paginator', () => {
      render(<Creators />)
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('renders a Creator row for each designer', () => {
      render(<Creators />)
      expect(screen.getByTestId('creator-1')).toBeInTheDocument()
      expect(screen.getByTestId('creator-2')).toBeInTheDocument()
      expect(screen.getByTestId('creator-3')).toBeInTheDocument()
    })

    it('renders CreatorCard rows for mobile', () => {
      render(<Creators />)
      expect(screen.getByTestId('creator-card-1')).toBeInTheDocument()
      expect(screen.getByTestId('creator-card-2')).toBeInTheDocument()
      expect(screen.getByTestId('creator-card-3')).toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('renders AdminUserLoader when isLoading is true', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<Creators />)
      expect(screen.getByTestId('admin-user-loader')).toBeInTheDocument()
    })

    it('does not render creator rows while loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })
      render(<Creators />)
      expect(screen.queryByTestId('creator-1')).not.toBeInTheDocument()
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
      render(<Creators />)
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch')
    })

    it('does not render creator rows when isError is true', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch' },
        isError: true
      })
      render(<Creators />)
      expect(screen.queryByTestId('creator-1')).not.toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('shows "No creators found" when designers list is empty', () => {
      useQuery.mockReturnValue({
        data: { designers: [] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Creators />)
      expect(screen.getAllByText('No creators found').length).toBeGreaterThan(0)
    })

    it('shows "No creators found" when data is undefined', () => {
      useQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Creators />)
      expect(screen.getAllByText('No creators found').length).toBeGreaterThan(0)
    })
  })

  describe('filter / sort options', () => {
    it('does not show sort options by default', () => {
      render(<Creators />)
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
      expect(screen.queryByText('latest')).not.toBeInTheDocument()
    })

    it('shows sort options when filter is clicked', () => {
      render(<Creators />)
      fireEvent.click(screen.getByText('filter'))
      expect(screen.getByText('oldest')).toBeInTheDocument()
      expect(screen.getByText('latest')).toBeInTheDocument()
    })

    it('hides sort options when filter is clicked again', () => {
      render(<Creators />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('filter'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })

    it('closes sort options after selecting a sort order', () => {
      render(<Creators />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))
      expect(screen.queryByText('oldest')).not.toBeInTheDocument()
    })
  })

  describe('sort order', () => {
    it('renders creators in descending order by default (latest)', () => {
      render(<Creators />)
      const rows = screen.getAllByTestId(/^creator-\d/)
      const ids = rows.map(el => el.getAttribute('data-testid'))
      // desktop + mobile both render, so we check desktop rows only
      expect(ids.filter(id => !id.startsWith('creator-card'))).toEqual([
        'creator-3', 'creator-2', 'creator-1'
      ])
    })

    it('renders creators in ascending order when "oldest" is selected', () => {
      render(<Creators />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))

      const rows = screen.getAllByTestId(/^creator-\d/)
      const ids = rows
        .map(el => el.getAttribute('data-testid'))
        .filter(id => !id.startsWith('creator-card'))
      expect(ids).toEqual(['creator-1', 'creator-2', 'creator-3'])
    })

    it('returns to descending order when "latest" is selected after "oldest"', () => {
      render(<Creators />)
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('oldest'))
      fireEvent.click(screen.getByText('filter'))
      fireEvent.click(screen.getByText('latest'))

      const rows = screen.getAllByTestId(/^creator-\d/)
      const ids = rows
        .map(el => el.getAttribute('data-testid'))
        .filter(id => !id.startsWith('creator-card'))
      expect(ids).toEqual(['creator-3', 'creator-2', 'creator-1'])
    })
  })

  describe('data sources', () => {
    it('renders creators from designers key', () => {
      useQuery.mockReturnValue({
        data: { designers: [{ id: 10, name: 'A' }] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Creators />)
      expect(screen.getByTestId('creator-10')).toBeInTheDocument()
    })

    it('renders creators from results key (search response)', () => {
      useQuery.mockReturnValue({
        data: { results: [{ id: 20, name: 'B' }] },
        isLoading: false,
        error: null,
        isError: false
      })
      render(<Creators />)
      expect(screen.getByTestId('creator-20')).toBeInTheDocument()
    })
  })

  describe('search', () => {
    it('updates the search input value when typed into', () => {
      render(<Creators />)
      const input = screen.getByPlaceholderText('Search creators...')
      fireEvent.change(input, { target: { value: 'Alice' } })
      expect(input.value).toBe('Alice')
    })

    it('calls useQuery with the correct queryKey shape after input', async () => {
      render(<Creators />)
      const input = screen.getByPlaceholderText('Search creators...')

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

  describe('pagination', () => {
    it('renders paginator starting at page 1', () => {
      render(<Creators />)
      expect(screen.getByTestId('paginator')).toHaveTextContent('page:1')
    })

    it('advances to page 2 when next is clicked', async () => {
      render(<Creators />)
      fireEvent.click(screen.getByText('next'))
      await waitFor(() => {
        expect(screen.getByTestId('paginator')).toHaveTextContent('page:2')
      })
    })

    it('calls useQuery with updated page in the queryKey', async () => {
      render(<Creators />)
      fireEvent.click(screen.getByText('next'))
      await waitFor(() => {
        expect(useQuery).toHaveBeenCalledWith(
          expect.objectContaining({ queryKey: ['admin-creators', 2, ''] })
        )
      })
    })
  })

  describe('handleOptions toggle', () => {
    it('does not crash when options button is clicked', () => {
      render(<Creators />)
      const optionsBtns = screen.getAllByText('options')
      fireEvent.click(optionsBtns[0])
    })
  })

  describe('useQuery config', () => {
    it('calls useQuery with correct initial queryKey', () => {
      render(<Creators />)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: ['admin-creators', 1, ''] })
      )
    })
  })
})