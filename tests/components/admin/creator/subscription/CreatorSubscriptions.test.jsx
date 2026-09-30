import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import CreatorSubscriptions from '@/components/admin/creator/subscription/CreatorSubscriptions'
import { useAdminCreatorStore } from '@/store/admin/creatoreStore/useAdminCreator'
import { useAdminStore } from '@/store/admin/useAdmin'
import { useQuery } from '@tanstack/react-query'


// --- mocks ---


vi.mock('@/components/global/Image', () => ({
  default: (props) => <img {...props} alt="img" />
}))

vi.mock('@/components/global/loaders/AdminUserLoader', () => ({
  default: () => <div>Loading...</div>
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div>Error: {error}</div>
}))

vi.mock('@/components/global/Paginator', () => ({
  default: () => <div>Paginator</div>
}))

vi.mock('@/components/admin/creator/subscription/CreatorSubscription', () => ({
  default: ({ subscription }) => (
    <div data-testid="subscription-item">{subscription.name}</div>
  )
}))

vi.mock('@/components/admin/creator/subscription/CreatorSubscrptionHeader', () => ({
  default: () => <div>Header</div>
}))

vi.mock('@/store/admin/creatoreStore/useAdminCreator', () => ({
  useAdminCreatorStore: vi.fn()
}))

vi.mock('@/store/admin/useAdmin', () => ({
  useAdminStore: vi.fn()
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn()
}))

// --- fixtures ---

const mockGetSubscriptions = vi.fn()
const mockSearchSubscriptions = vi.fn()
const mockGetAwaiting = vi.fn()

// --- tests ---

describe('CreatorSubscriptions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAdminCreatorStore.mockReturnValue({
      getCreatorSubscriptions: mockGetSubscriptions,
      searchSubscriptions: mockSearchSubscriptions
    })

    useAdminStore.mockReturnValue({
      getAwaitingAproval: mockGetAwaiting
    })

    useQuery.mockReturnValue({
      data: {
        subscriptions: [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' }
        ]
      },
      isLoading: false,
      isError: false,
      error: null
    })
  })

  it('renders loading state', () => {

    useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false
    })

    render(<CreatorSubscriptions />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state', () => {

    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: 'Something went wrong'
    })

    render(<CreatorSubscriptions />)

    expect(screen.getByText(/Error:/)).toBeInTheDocument()
  })

  it('renders subscription list', () => {
    render(<CreatorSubscriptions />)

    const items = screen.getAllByTestId('subscription-item')
    expect(items.length).toBe(2)
  })

  it('renders paginator', () => {
    render(<CreatorSubscriptions />)

    expect(screen.getByText('Paginator')).toBeInTheDocument()
  })

  it('toggles sort options dropdown', () => {
    render(<CreatorSubscriptions />)

    const filterBtn = screen.getByText('filter')

    fireEvent.click(filterBtn)

    expect(screen.getByText('oldest')).toBeInTheDocument()
    expect(screen.getByText('latest')).toBeInTheDocument()
  })


  it('updates search input', () => {
    render(<CreatorSubscriptions />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(input.value).toBe('test')
  })

  it('calls getAwaitingAproval on mount', () => {
    render(<CreatorSubscriptions />)

    expect(mockGetAwaiting).toHaveBeenCalled()
  })

  it('sorts subscriptions (latest first by default)', () => {
    render(<CreatorSubscriptions />)

    const items = screen.getAllByTestId('subscription-item')

    // latest means highest id first → B then A
    expect(items[0]).toHaveTextContent('B')
    expect(items[1]).toHaveTextContent('A')
  })
})