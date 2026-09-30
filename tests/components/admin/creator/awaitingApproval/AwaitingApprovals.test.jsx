import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AwaitingApprovals from '@/components/admin/creator/AwaitingApproval/AwaitingApprovals'


// ─── Mocks ─────────────────────────────────────────────────────────────
vi.mock('@/store/admin/useAdmin', () => ({
  useAdminStore: vi.fn(),
}))

vi.mock('@/components/admin/creator/AwaitingApproval/AwaitingApproval', () => ({
  default: ({ awaitingApproval }) => (
    <li data-testid="awaiting-item">
      {awaitingApproval.creator_businessName}
    </li>
  ),
}))

vi.mock('@/components/admin/creator/AwaitingApproval/AwaitingApprovalHeader', () => ({
  default: () => <div data-testid="header">Header</div>,
}))

vi.mock('@/components/global/loaders/AdminUserLoader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div>Error: {error?.message}</div>,
}))

import { useAdminStore } from '@/store/admin/useAdmin'

// ─── Helpers ───────────────────────────────────────────────────────────
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

const renderComponent = () => {
  return render(
    <QueryClientProvider client={createQueryClient()}>
      <AwaitingApprovals />
    </QueryClientProvider>
  )
}

// ─── Tests ─────────────────────────────────────────────────────────────
describe('AwaitingApprovals', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state', () => {
    useAdminStore.mockReturnValue({
      getAwaitingAproval: vi.fn(() => new Promise(() => {})), // never resolves
    })

    renderComponent()

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('renders error state', async () => {
    useAdminStore.mockReturnValue({
      getAwaitingAproval: vi.fn().mockRejectedValue(new Error('Fetch failed')),
    })

    renderComponent()

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
  })

  it('renders list of awaiting approvals', async () => {
    useAdminStore.mockReturnValue({
      getAwaitingAproval: vi.fn().mockResolvedValue({
        payment: [
          { id: '1', creator_businessName: 'Creator One' },
          { id: '2', creator_businessName: 'Creator Two' },
        ],
      }),
    })

    renderComponent()

    const items = await screen.findAllByTestId('awaiting-item')

    expect(items).toHaveLength(2)
    expect(screen.getByText('Creator One')).toBeInTheDocument()
    expect(screen.getByText('Creator Two')).toBeInTheDocument()
  })

})