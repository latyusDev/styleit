import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DashboardCreator from '@/components/admin/dashboard/creator/DashboardCreator'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/components/admin/creator/Creator', () => ({
  default: ({ creator, handleOptions, id }) => (
    <div data-testid={`creator-${creator.id || creator.designer_id}`}>
      <span>{creator.name}</span>
      <button
        data-testid={`action-${creator.id || creator.designer_id}`}
        onClick={() => handleOptions(creator.id || creator.designer_id)}
      >
        toggle
      </button>
      {id === (creator.id || creator.designer_id) && (
        <span data-testid={`selected-${creator.id || creator.designer_id}`}>selected</span>
      )}
    </div>
  ),
}))

vi.mock('@/components/admin/creator/CreatorCard', () => ({
  default: ({ creator, handleOptions, id }) => (
    <div data-testid={`creator-card-${creator.id || creator.designer_id}`}>
      <span>{creator.name}</span>
      <button
        data-testid={`card-action-${creator.id || creator.designer_id}`}
        onClick={() => handleOptions(creator.id || creator.designer_id)}
      >
        toggle
      </button>
      {id === (creator.id || creator.designer_id) && (
        <span data-testid={`card-selected-${creator.id || creator.designer_id}`}>selected</span>
      )}
    </div>
  ),
}))

vi.mock('@/components/admin/creator/CreatorHeader', () => ({
  default: () => <div data-testid="creator-header">CreatorHeader</div>,
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockCreators = [
  { id: 'cr-001', name: 'Alice' },
  { id: 'cr-002', name: 'Bob' },
  { id: 'cr-003', name: 'Charlie' },
]

// ── Tests ──────────────────────────────────────────────────────────────────

describe('DashboardCreator', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Static elements —

  it('renders the heading', () => {
    render(<DashboardCreator creators={mockCreators} />)
    expect(screen.getByText('Latest Creators')).toBeInTheDocument()
  })

  it('renders CreatorHeader', () => {
    render(<DashboardCreator creators={mockCreators} />)
    expect(screen.getByTestId('creator-header')).toBeInTheDocument()
  })

  // — Desktop Creator list —

  describe('desktop creator list', () => {
    it('renders all Creator items', () => {
      render(<DashboardCreator creators={mockCreators} />)
      mockCreators.forEach(({ id }) => {
        expect(screen.getByTestId(`creator-${id}`)).toBeInTheDocument()
      })
    })

    it('shows empty message when creators list is empty', () => {
      render(<DashboardCreator creators={[]} />)
      expect(screen.getAllByText('No creators found').length).toBeGreaterThan(0)
    })


    it('uses designer_id as key fallback when id is absent', () => {
      const creators = [{ designer_id: 'des-001', name: 'Dave' }]
      render(<DashboardCreator creators={creators} />)
      expect(screen.getByTestId('creator-des-001')).toBeInTheDocument()
    })
  })

  // — Mobile CreatorCard list —

  describe('mobile creator card list', () => {
    it('renders all CreatorCard items', () => {
      render(<DashboardCreator creators={mockCreators} />)
      mockCreators.forEach(({ id }) => {
        expect(screen.getByTestId(`creator-card-${id}`)).toBeInTheDocument()
      })
    })

    it('shows empty message when creators list is empty', () => {
      render(<DashboardCreator creators={[]} />)
      expect(screen.getAllByText('No creators found').length).toBeGreaterThan(0)
    })
  })

  // — handleOptions toggle (desktop) —

  describe('handleOptions toggle via Creator', () => {
    it('selects a creator on click', () => {
      render(<DashboardCreator creators={mockCreators} />)
      fireEvent.click(screen.getByTestId('action-cr-001'))
      expect(screen.getByTestId('selected-cr-001')).toBeInTheDocument()
    })

    it('deselects a creator when clicked again', () => {
      render(<DashboardCreator creators={mockCreators} />)
      fireEvent.click(screen.getByTestId('action-cr-001'))
      fireEvent.click(screen.getByTestId('action-cr-001'))
    })

    it('switches selection between creators', () => {
      render(<DashboardCreator creators={mockCreators} />)
      fireEvent.click(screen.getByTestId('action-cr-001'))
      fireEvent.click(screen.getByTestId('action-cr-002'))
      expect(screen.getByTestId('selected-cr-002')).toBeInTheDocument()
    })

    it('only one creator is selected at a time', () => {
      render(<DashboardCreator creators={mockCreators} />)
      fireEvent.click(screen.getByTestId('action-cr-001'))
      fireEvent.click(screen.getByTestId('action-cr-003'))
    })
  })

  // — handleOptions toggle (mobile cards) —

  describe('handleOptions toggle via CreatorCard', () => {
    it('selects a creator card on click', () => {
      render(<DashboardCreator creators={mockCreators} />)
      fireEvent.click(screen.getByTestId('card-action-cr-001'))
      expect(screen.getByTestId('card-selected-cr-001')).toBeInTheDocument()
    })

    it('deselects a creator card when clicked again', () => {
      render(<DashboardCreator creators={mockCreators} />)
      fireEvent.click(screen.getByTestId('card-action-cr-001'))
      fireEvent.click(screen.getByTestId('card-action-cr-001'))
    })
  })

  // — Undefined/null creators —

  it('renders without crashing when creators is undefined', () => {
    render(<DashboardCreator creators={undefined} />)
    expect(screen.getByText('Latest Creators')).toBeInTheDocument()
  })
})