import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchModal from '@/components/global/SearchModal'
import CustomQueryClientProvider from '@/components/global/CustomQueryClientProvider'

// --- Mocks ---

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useQuery: vi.fn(),
  }
})

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(),
}))

vi.mock('@/store/global/useGlobal', () => ({
  useGlobalStore: vi.fn(),
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src }) => <img data-testid="logo" src={src} />,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}))

vi.mock('@/components/dashboard/searchItems/SearchedCreators', () => ({
  default: ({ creators, isLoading }) => (
    <div data-testid="searched-creators">
      {isLoading ? 'loading creators' : `creators: ${creators?.length ?? 0}`}
    </div>
  ),
}))

vi.mock('@/components/dashboard/searchItems/SearchedPosts', () => ({
  default: ({ posts, isLoading }) => (
    <div data-testid="searched-posts">
      {isLoading ? 'loading posts' : `posts: ${posts?.length ?? 0}`}
    </div>
  ),
}))

vi.mock('@/components/dashboard/searchItems/StatesFilter', () => ({
  default: ({ handleFilterByState, desginerState }) => (
    <div data-testid="states-filter">
      <span data-testid="current-state">{desginerState}</span>
      <button onClick={() => handleFilterByState('Lagos', false)}>Filter Lagos Desktop</button>
      <button onClick={() => handleFilterByState('Abuja', true)}>Filter Abuja Mobile</button>
    </div>
  ),
}))

vi.mock('lucide-react', () => ({
  Filter: () => <span>Filter</span>,
  Search: () => <span>Search</span>,
  X: ({ onClick }) => <button data-testid="close-btn" onClick={onClick}>X</button>,
}))

vi.mock('../../images/m_logo.png', () => ({ default: 'mock-logo.png' }))

import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/store/useAuth'
import { useGlobalStore } from '@/store/global/useGlobal'

// --- Fixtures ---

const mockSetSearchModal = vi.fn()
const mockSetUserDashboardSearchData = vi.fn()
const mockSearchCreators = vi.fn()
const mockSearchPosts = vi.fn()

const baseGlobalStore = {
  searchModal: true,
  setSearchModal: mockSetSearchModal,
  searchCreators: mockSearchCreators,
  searchPosts: mockSearchPosts,
  userDashboardSearchData: '',
  setUserDashboardSearchData: mockSetUserDashboardSearchData,
}

const baseCreatorQuery = {
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
}

const basePostQuery = {
  data: undefined,
  isLoading: false,
  isPostError: false,
  postError: null,
}

// --- Helper ---

const renderComponent = (props = {}, globalStore = {}, creatorQuery = {}, postQuery = {}) => {
  useAuth.mockReturnValue({ user: { id: 1, role: 'client' } })
  useGlobalStore.mockReturnValue({ ...baseGlobalStore, ...globalStore })

  useQuery
    .mockReturnValueOnce({ ...baseCreatorQuery, ...creatorQuery })
    .mockReturnValueOnce({ ...basePostQuery, ...postQuery })

  return render(
    <CustomQueryClientProvider>
      <SearchModal page={props.page ?? 'user-dashboard'} />
    </CustomQueryClientProvider>
  )
}

// --- Tests ---

describe('SearchModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // --- visibility ---

  it('renders the modal when searchModal is true', () => {
    renderComponent()
    expect(screen.getByPlaceholderText('search...')).toBeInTheDocument()
  })

  it('does not render the modal when searchModal is false', () => {
    renderComponent({}, { searchModal: false })
    expect(screen.queryByPlaceholderText('search...')).not.toBeInTheDocument()
  })

  it('renders the logo', () => {
    renderComponent()
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  // --- close modal ---

  it('calls setSearchModal(false) and clears search data when X is clicked', () => {
    renderComponent()
    fireEvent.click(screen.getByTestId('close-btn'))
    expect(mockSetSearchModal).toHaveBeenCalledWith(false)
    expect(mockSetUserDashboardSearchData).toHaveBeenCalledWith()
  })

  // --- search input ---

  it('calls setUserDashboardSearchData on input change', () => {
    renderComponent()
    fireEvent.change(screen.getByPlaceholderText('search...'), {
      target: { value: 'test query' },
    })
    expect(mockSetUserDashboardSearchData).toHaveBeenCalledWith('test query')
  })

  it('does not show the filter button when there is no search data', () => {
    renderComponent({}, { userDashboardSearchData: '' })
    expect(screen.queryByText(/filter/i)).not.toBeInTheDocument()
  })

  it('shows the filter button when search data exists and not loading/error', () => {
    renderComponent({}, { userDashboardSearchData: 'ankara' })
    expect(screen.getByText(/filter/i)).toBeInTheDocument()
  })

  it('does not show filter button when loading', () => {
    renderComponent(
      {},
      { userDashboardSearchData: 'ankara' },
      { isLoading: true }
    )
    expect(screen.queryByText(/filter/i)).not.toBeInTheDocument()
  })

  it('does not show filter button when there is an error', () => {
    renderComponent(
      {},
      { userDashboardSearchData: 'ankara' },
      { isError: true }
    )
    expect(screen.queryByText(/filter/i)).not.toBeInTheDocument()
  })

  // --- user-dashboard page ---

  describe('page: user-dashboard', () => {
    it('renders the designers tab button', () => {
      renderComponent({ page: 'user-dashboard' })
      expect(screen.getByRole('button', { name: /designers/i })).toBeInTheDocument()
    })

    it('renders the posts tab button', () => {
      renderComponent({ page: 'user-dashboard' })
      expect(screen.getByRole('button', { name: /posts/i })).toBeInTheDocument()
    })

    it('shows SearchedCreators by default', () => {
      renderComponent({ page: 'user-dashboard' })
      expect(screen.getByTestId('searched-creators')).toBeInTheDocument()
      expect(screen.queryByTestId('searched-posts')).not.toBeInTheDocument()
    })

    it('shows SearchedPosts when posts tab is clicked', () => {
      renderComponent({ page: 'user-dashboard' })
      fireEvent.click(screen.getByRole('button', { name: /posts/i }))
      expect(screen.getByTestId('searched-posts')).toBeInTheDocument()
      expect(screen.queryByTestId('searched-creators')).not.toBeInTheDocument()
    })

    it('switches back to designers tab', () => {
      renderComponent({ page: 'user-dashboard' })
      fireEvent.click(screen.getByRole('button', { name: /posts/i }))
      fireEvent.click(screen.getByRole('button', { name: /designers/i }))
      expect(screen.getByTestId('searched-creators')).toBeInTheDocument()
    })
  })

  // --- home page ---

  describe('page: home', () => {
    it('shows SearchedCreators on home page', () => {
      renderComponent({ page: 'home' })
      expect(screen.getByTestId('searched-creators')).toBeInTheDocument()
    })

    it('does not show tab buttons on home page', () => {
      renderComponent({ page: 'home' })
      expect(screen.queryByRole('button', { name: /designers/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /posts/i })).not.toBeInTheDocument()
    })

    it('does not render SearchedPosts on home page', () => {
      renderComponent({ page: 'home' })
      expect(screen.queryByTestId('searched-posts')).not.toBeInTheDocument()
    })
  })

  // --- states filter visibility ---

  it('does not show StatesFilter when there is no search data', () => {
    renderComponent({}, { userDashboardSearchData: '' })
    expect(screen.queryByTestId('states-filter')).not.toBeInTheDocument()
  })

  it('does not show StatesFilter before filter button is clicked', () => {
    renderComponent({}, { userDashboardSearchData: 'ankara' })
    expect(screen.queryByTestId('states-filter')).not.toBeInTheDocument()
  })

  it('shows StatesFilter after filter button is clicked', () => {
    renderComponent({}, { userDashboardSearchData: 'ankara' })
    fireEvent.click(screen.getByText(/filter/i))
    expect(screen.getByTestId('states-filter')).toBeInTheDocument()
  })

  it('hides StatesFilter when filter button is clicked again', () => {
    renderComponent({}, { userDashboardSearchData: 'ankara' })
    fireEvent.click(screen.getByText(/filter/i))
    fireEvent.click(screen.getByText(/filter/i))
    expect(screen.queryByTestId('states-filter')).not.toBeInTheDocument()
  })

  // --- state filtering ---

  it('passes desginerState "all" to StatesFilter initially', () => {
    renderComponent({}, { userDashboardSearchData: 'ankara' })
    fireEvent.click(screen.getByText(/filter/i))
    expect(screen.getByTestId('current-state')).toHaveTextContent('all')
  })

  it('updates desginerState when a desktop state is selected', () => {
    renderComponent({}, { userDashboardSearchData: 'ankara' })
    fireEvent.click(screen.getByText(/filter/i))
    fireEvent.click(screen.getByText('Filter Lagos Desktop'))
    expect(screen.getByTestId('current-state')).toHaveTextContent('Lagos')
  })

  it('closes the filter panel when a mobile state is selected', () => {
    renderComponent({}, { userDashboardSearchData: 'ankara' })
    fireEvent.click(screen.getByText(/filter/i))
    fireEvent.click(screen.getByText('Filter Abuja Mobile'))
    expect(screen.queryByTestId('states-filter')).not.toBeInTheDocument()
  })

  it('updates desginerState when a mobile state is selected', async () => {
    renderComponent({}, { userDashboardSearchData: 'ankara' })
    fireEvent.click(screen.getByText(/filter/i))
    fireEvent.click(screen.getByText('Filter Abuja Mobile'))
    // re-open filter to check state persisted
    fireEvent.click(screen.getByText(/filter/i))
    expect(screen.getByTestId('current-state')).toHaveTextContent('Abuja')
  })

  // --- creator query filtering ---

  it('passes all creators when desginerState is "all"', () => {
    const creators = [
      { id: 1, state: 'Lagos' },
      { id: 2, state: 'Abuja' },
    ]
    renderComponent(
      {},
      { userDashboardSearchData: 'ankara' },
      { data: { results: creators } }
    )
    expect(screen.getByTestId('searched-creators')).toHaveTextContent('creators: 2')
  })

  it('filters creators by selected state', () => {
    const creators = [
      { id: 1, state: 'Lagos' },
      { id: 2, state: 'Abuja' },
    ]
    renderComponent(
      {},
      { userDashboardSearchData: 'ankara' },
      { data: { results: creators } }
    )
    fireEvent.click(screen.getByText(/filter/i))
    fireEvent.click(screen.getByText('Filter Lagos Desktop'))
    expect(screen.getByTestId('searched-creators')).toHaveTextContent('creators: 1')
  })

  // --- query config ---

  it('calls useQuery with correct key for creators', () => {
    renderComponent({}, { userDashboardSearchData: 'dress' })
    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['search-creators', 'dress'] })
    )
  })

  it('calls useQuery with correct key for posts', () => {
    renderComponent({}, { userDashboardSearchData: 'dress' })
    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['search-posts', 'dress'] })
    )
  })
})