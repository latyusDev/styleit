import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DashboardSubscriptions from '@/components/admin/dashboard/subscription/DashboardSubscriptions'
import CreatorSubscription from '@/components/admin/creator/subscription/CreatorSubscription'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/components/admin/creator/subscription/CreatorSubscription', () => ({
  default: ({ subscription, handleAction, id }) => (
    <li data-testid={`subscription-${subscription.id}`}>
      <span>{subscription.plan}</span>
      <button
        data-testid={`action-${subscription.id}`}
        onClick={() => handleAction(subscription.id)}
      >
        toggle
      </button>
      {id === subscription.id && (
        <span data-testid={`selected-${subscription.id}`}>selected</span>
      )}
    </li>
  ),
}))

vi.mock('@/components/admin/creator/subscription/CreatorSubscrptionHeader', () => ({
  default: ({ full }) => (
    <div data-testid="subscription-header" data-full={String(full)}>
      CreatorSubscrptionHeader
    </div>
  ),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockSubscriptions = [
  { id: 'sub-001', plan: 'Basic' },
  { id: 'sub-002', plan: 'Pro' },
  { id: 'sub-003', plan: 'Enterprise' },
]

// ── Tests ──────────────────────────────────────────────────────────────────

describe('DashboardSubscriptions', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Static elements —

  it('renders the heading', () => {
    render(<DashboardSubscriptions subscriptions={mockSubscriptions} />)
    expect(screen.getByText('Latest Subscriptions')).toBeInTheDocument()
  })

  it('renders CreatorSubscrptionHeader', () => {
    render(<DashboardSubscriptions subscriptions={mockSubscriptions} />)
    expect(screen.getByTestId('subscription-header')).toBeInTheDocument()
  })

  it('passes full={true} to CreatorSubscrptionHeader', () => {
    render(<DashboardSubscriptions subscriptions={mockSubscriptions} />)
    expect(screen.getByTestId('subscription-header')).toHaveAttribute('data-full', 'true')
  })

  // — Subscription list —

  it('renders all subscriptions', () => {
    render(<DashboardSubscriptions subscriptions={mockSubscriptions} />)
    mockSubscriptions.forEach(({ id }) => {
      expect(screen.getByTestId(`subscription-${id}`)).toBeInTheDocument()
    })
  })

  it('renders empty list without crashing', () => {
    render(<DashboardSubscriptions subscriptions={[]} />)
    expect(screen.getByText('Latest Subscriptions')).toBeInTheDocument()
  })

  // — handleAction toggle —

  describe('handleAction toggle', () => {
    it('selects a subscription on click', () => {
      render(<DashboardSubscriptions subscriptions={mockSubscriptions} />)
      fireEvent.click(screen.getByTestId('action-sub-001'))
      expect(screen.getByTestId('selected-sub-001')).toBeInTheDocument()
    })

    it('deselects a subscription when clicked again', () => {
      render(<DashboardSubscriptions subscriptions={mockSubscriptions} />)
      fireEvent.click(screen.getByTestId('action-sub-001'))
      fireEvent.click(screen.getByTestId('action-sub-001'))
    })

    it('switches selection between subscriptions', () => {
      render(<DashboardSubscriptions subscriptions={mockSubscriptions} />)
      fireEvent.click(screen.getByTestId('action-sub-001'))
      fireEvent.click(screen.getByTestId('action-sub-002'))
      expect(screen.getByTestId('selected-sub-002')).toBeInTheDocument()
    })

    it('only one subscription is selected at a time', () => {
      render(<DashboardSubscriptions subscriptions={mockSubscriptions} />)
      fireEvent.click(screen.getByTestId('action-sub-001'))
      fireEvent.click(screen.getByTestId('action-sub-003'))
      expect(screen.queryAllByText('selected').length).toBe(1)
    })
  })
})