import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchedCreators from '@/components/dashboard/searchItems/SearchedCreators'



// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/components/dashboard/creator/fashionDesigners/FashionDesignerCard', () => ({
  default: ({ designer }) => (
    <div data-testid={`creator-card-${designer.id}`}>{designer.name}</div>
  ),
}))

vi.mock('@/components/global/loaders/TrendingPostLoader', () => ({
  default: () => <div data-testid="trending-loader">Loading...</div>,
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => (
    <div data-testid="error-message">{error?.message}</div>
  ),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockCreators = [
  { id: 'cr-001', name: 'Alice' },
  { id: 'cr-002', name: 'Bob' },
  { id: 'cr-003', name: 'Charlie' },
]

const noError = { isError: false, error: null }
const withError = { isError: true, error: { message: 'Failed to fetch creators' } }

// ── Tests ──────────────────────────────────────────────────────────────────

describe('SearchedCreators', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Loading state —

  describe('loading state', () => {
    it('shows the loader while loading', () => {
      render(
        <SearchedCreators
          isLoading={true}
          error={noError}
          creators={[]}
          userDashboardSearchData={null}
        />
      )
      expect(screen.getByTestId('trending-loader')).toBeInTheDocument()
    })

    it('does not render creator cards while loading', () => {
      render(
        <SearchedCreators
          isLoading={true}
          error={noError}
          creators={mockCreators}
          userDashboardSearchData="fashion"
        />
      )
      expect(screen.queryByTestId(/^creator-card-/)).not.toBeInTheDocument()
    })

    it('does not show error while loading', () => {
      render(
        <SearchedCreators
          isLoading={true}
          error={withError}
          creators={[]}
          userDashboardSearchData={null}
        />
      )
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  // — Error state —

  describe('error state', () => {
    it('shows error message when isError is true', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={withError}
          creators={[]}
          userDashboardSearchData={null}
        />
      )
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Failed to fetch creators'
      )
    })

    it('does not render creator cards on error', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={withError}
          creators={mockCreators}
          userDashboardSearchData="fashion"
        />
      )
      expect(screen.queryByTestId(/^creator-card-/)).not.toBeInTheDocument()
    })

    it('does not show loader on error', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={withError}
          creators={[]}
          userDashboardSearchData={null}
        />
      )
      expect(screen.queryByTestId('trending-loader')).not.toBeInTheDocument()
    })
  })

  // — Empty state —

  describe('empty state', () => {
    it('shows "No creator found" when creators is empty and userDashboardSearchData is set', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={noError}
          creators={[]}
          userDashboardSearchData="fashion"
        />
      )
      expect(screen.getByText('No creator found')).toBeInTheDocument()
    })

    it('does not show "No creator found" when userDashboardSearchData is falsy', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={noError}
          creators={[]}
          userDashboardSearchData={null}
        />
      )
      expect(screen.queryByText('No creator found')).not.toBeInTheDocument()
    })

    it('does not render creator cards when list is empty', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={noError}
          creators={[]}
          userDashboardSearchData="fashion"
        />
      )
      expect(screen.queryByTestId(/^creator-card-/)).not.toBeInTheDocument()
    })
  })

  // — Success state —

  describe('success state', () => {
    it('renders all creator cards', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={noError}
          creators={mockCreators}
          userDashboardSearchData="fashion"
        />
      )
      mockCreators.forEach(({ id }) => {
        expect(screen.getByTestId(`creator-card-${id}`)).toBeInTheDocument()
      })
    })

    it('renders creator names', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={noError}
          creators={mockCreators}
          userDashboardSearchData="fashion"
        />
      )
      mockCreators.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument()
      })
    })

    it('does not show loader on success', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={noError}
          creators={mockCreators}
          userDashboardSearchData="fashion"
        />
      )
      expect(screen.queryByTestId('trending-loader')).not.toBeInTheDocument()
    })

    it('does not show error message on success', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={noError}
          creators={mockCreators}
          userDashboardSearchData="fashion"
        />
      )
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })

    it('does not show "No creator found" when creators are present', () => {
      render(
        <SearchedCreators
          isLoading={false}
          error={noError}
          creators={mockCreators}
          userDashboardSearchData="fashion"
        />
      )
      expect(screen.queryByText('No creator found')).not.toBeInTheDocument()
    })
  })

  // — Default prop —

  it('renders without crashing when creators prop is omitted (defaults to [])', () => {
    render(
      <SearchedCreators
        isLoading={false}
        error={noError}
        userDashboardSearchData={null}
      />
    )
    expect(screen.queryByTestId(/^creator-card-/)).not.toBeInTheDocument()
  })
})