import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CustomQueryClientProvider from '@/components/global/CustomQueryClientProvider'
import StatesFilter from '@/components/dashboard/searchItems/StatesFilter'

// --- Mocks ---

vi.mock('@/store/useAuthService', () => ({
  useAuthService: vi.fn(),
}))

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useQuery: vi.fn(),
  }
})

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }) => <div data-testid="skeleton" className={className} />,
}))

vi.mock('motion/react', () => ({
  motion: new Proxy({}, {
    get: (_, tag) => {
      const Component = ({ children, onClick, className }) => {
        const Tag = tag
        return <Tag onClick={onClick} className={className}>{children}</Tag>
      }
      Component.displayName = `motion.${tag}`
      return Component
    },
  }),
}))

import { useAuthService } from '@/store/useAuthService'
import { useQuery } from '@tanstack/react-query'

// --- Fixtures ---

const mockStates = [
  { state_id: 1, state_name: 'Lagos' },
  { state_id: 2, state_name: 'Abuja' },
  { state_id: 3, state_name: 'Kano' },
]

const mockGetStates = vi.fn()

// --- Helper ---

const renderComponent = (props = {}) => {
  const defaultProps = {
    handleFilterByState: vi.fn(),
    desginerState: 'all',
    ...props,
  }

  return {
    ...render(
      <CustomQueryClientProvider>
        <StatesFilter {...defaultProps} />
      </CustomQueryClientProvider>
    ),
    props: defaultProps,
  }
}

// --- Tests ---

describe('StatesFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthService.mockReturnValue({ getStates: mockGetStates })
  })

  // --- loading state ---

  it('renders skeletons while loading', () => {
    useQuery.mockReturnValue({ data: undefined, isLoading: true, isError: false })
    renderComponent()
    const skeletons = screen.getAllByTestId('skeleton')
    expect(skeletons).toHaveLength(5)
  })

  it('renders the loader container while loading', () => {
    useQuery.mockReturnValue({ data: undefined, isLoading: true, isError: false })
    renderComponent()
    expect(screen.getByTestId('state-loader')).toBeInTheDocument()
  })

  it('does not render state items while loading', () => {
    useQuery.mockReturnValue({ data: undefined, isLoading: true, isError: false })
    renderComponent()
    expect(screen.queryByText('Lagos')).not.toBeInTheDocument()
  })

  // --- error state ---

  it('renders error message when fetch fails', () => {
    useQuery.mockReturnValue({ data: undefined, isLoading: false, isError: true })
    renderComponent()
    expect(screen.getByText('Failed to fetch states')).toBeInTheDocument()
  })

  it('does not render skeletons on error', () => {
    useQuery.mockReturnValue({ data: undefined, isLoading: false, isError: true })
    renderComponent()
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  })

  // --- success state ---

  it('renders all state names on success', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent()
    // each state renders twice (desktop + mobile)
    expect(screen.getAllByText('Lagos')).toHaveLength(2)
    expect(screen.getAllByText('Abuja')).toHaveLength(2)
    expect(screen.getAllByText('Kano')).toHaveLength(2)
  })

  it('does not render skeletons on success', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent()
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  })

  it('renders the heading', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent()
    expect(screen.getByText('Filter by states')).toBeInTheDocument()
  })

  it('renders the "All designers" option', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent()
    // renders twice: desktop + mobile
    expect(screen.getAllByText('All designers')).toHaveLength(2)
  })

  it('renders nothing when states array is empty', () => {
    useQuery.mockReturnValue({ data: { states: [] }, isLoading: false, isError: false })
    renderComponent()
    expect(screen.queryByText('Lagos')).not.toBeInTheDocument()
  })

  // --- "All designers" click handlers ---

  it('calls handleFilterByState with "all" and false when desktop "All designers" is clicked', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    const handleFilterByState = vi.fn()
    renderComponent({ handleFilterByState })
    const [desktopAll] = screen.getAllByText('All designers')
    fireEvent.click(desktopAll)
    expect(handleFilterByState).toHaveBeenCalledWith('all', false)
  })

  it('calls handleFilterByState with "all" and true when mobile "All designers" is clicked', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    const handleFilterByState = vi.fn()
    renderComponent({ handleFilterByState })
    const [, mobileAll] = screen.getAllByText('All designers')
    fireEvent.click(mobileAll)
    expect(handleFilterByState).toHaveBeenCalledWith('all', true)
  })

  // --- state item click handlers ---

  it('calls handleFilterByState with state name and false when desktop state is clicked', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    const handleFilterByState = vi.fn()
    renderComponent({ handleFilterByState })
    const [desktopLagos] = screen.getAllByText('Lagos')
    fireEvent.click(desktopLagos)
    expect(handleFilterByState).toHaveBeenCalledWith('Lagos', false)
  })

  it('calls handleFilterByState with state name and true when mobile state is clicked', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    const handleFilterByState = vi.fn()
    renderComponent({ handleFilterByState })
    const [, mobileLagos] = screen.getAllByText('Lagos')
    fireEvent.click(mobileLagos)
    expect(handleFilterByState).toHaveBeenCalledWith('Lagos', true)
  })

  // --- active state highlighting ---

  it('applies active class to "All designers" when desginerState is "all"', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent({ desginerState: 'all' })
    const allItems = screen.getAllByText('All designers')
    allItems.forEach(item => {
      expect(item).toHaveClass('bg-primary', 'text-white')
    })
  })

  it('does not apply active class to "All designers" when a state is selected', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent({ desginerState: 'Lagos' })
    const allItems = screen.getAllByText('All designers')
    allItems.forEach(item => {
      expect(item).not.toHaveClass('bg-primary')
    })
  })

  it('applies active class to the matching state item', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent({ desginerState: 'Lagos' })
    const lagosItems = screen.getAllByText('Lagos')
    lagosItems.forEach(item => {
      expect(item).toHaveClass('bg-primary', 'text-white')
    })
  })

  it('applies active class case-insensitively', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent({ desginerState: 'lagos' })
    const lagosItems = screen.getAllByText('Lagos')
    lagosItems.forEach(item => {
      expect(item).toHaveClass('bg-primary', 'text-white')
    })
  })

  it('does not apply active class to non-selected states', () => {
    useQuery.mockReturnValue({ data: { states: mockStates }, isLoading: false, isError: false })
    renderComponent({ desginerState: 'Lagos' })
    const abujaItems = screen.getAllByText('Abuja')
    abujaItems.forEach(item => {
      expect(item).not.toHaveClass('bg-primary')
    })
  })

  // --- query config ---

  it('calls useQuery with the correct query key', () => {
    useQuery.mockReturnValue({ data: undefined, isLoading: false, isError: false })
    renderComponent()
    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['states'] })
    )
  })

  it('calls useQuery with getStates as the query function', () => {
    useQuery.mockReturnValue({ data: undefined, isLoading: false, isError: false })
    renderComponent()
    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({ queryFn: mockGetStates })
    )
  })
})