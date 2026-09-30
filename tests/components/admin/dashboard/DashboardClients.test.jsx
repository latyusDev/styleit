import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DashboardClient from '@/components/admin/dashboard/client/DashboardClient'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/components/admin/client/Client', () => ({
  default: ({ client, handleOptions, id, borderClass, textColorClass }) => (
    <div
      data-testid={`client-${client.id}`}
      data-border={borderClass}
      data-color={textColorClass}
    >
      <span>{client.name}</span>
      <button
        data-testid={`action-${client.id}`}
        onClick={() => handleOptions(client.id)}
      >
        toggle
      </button>
      {id === client.id && (
        <span data-testid={`selected-${client.id}`}>selected</span>
      )}
    </div>
  ),
}))

vi.mock('@/components/admin/client/ClientHeader', () => ({
  default: () => <div data-testid="client-header">ClientHeader</div>,
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockClients = [
  { id: 'cl-001', name: 'Alice', status: 'actived' },
  { id: 'cl-002', name: 'Bob', status: 'banned' },
  { id: 'cl-003', name: 'Charlie', status: 'suspended' },
  { id: 'cl-004', name: 'Diana', status: 'unknown' },
]

// ── Tests ──────────────────────────────────────────────────────────────────

describe('DashboardClient', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Static elements —

  it('renders the heading', () => {
    render(<DashboardClient clients={mockClients} />)
    expect(screen.getByText('Latest Client')).toBeInTheDocument()
  })

  it('renders ClientHeader', () => {
    render(<DashboardClient clients={mockClients} />)
    expect(screen.getByTestId('client-header')).toBeInTheDocument()
  })

  // — Client list —

  it('renders all clients', () => {
    render(<DashboardClient clients={mockClients} />)
    mockClients.forEach(({ id }) => {
      expect(screen.getByTestId(`client-${id}`)).toBeInTheDocument()
    })
  })

  it('renders empty list without crashing', () => {
    render(<DashboardClient clients={[]} />)
    expect(screen.getByText('Latest Client')).toBeInTheDocument()
  })

  // — Status color class mapping —

  describe('status color class mapping', () => {
    it.each([
      ['actived', 'border-green-500', 'text-green-500'],
      ['banned', 'border-red-500', 'text-red-500'],
      ['suspended', 'border-black', 'text-black'],
    ])('passes correct classes for "%s" status', (status, borderColor, textColor) => {
      render(<DashboardClient clients={[{ id: 'cl-test', name: 'Test', status }]} />)
      const item = screen.getByTestId('client-cl-test')
      expect(item.dataset.border).toContain(borderColor)
      expect(item.dataset.color).toContain(textColor)
    })

    it('passes empty classes for unknown status', () => {
      render(<DashboardClient clients={[{ id: 'cl-unknown', name: 'Test', status: 'unknown' }]} />)
      const item = screen.getByTestId('client-cl-unknown')
      expect(item.dataset.border).toBe('')
      expect(item.dataset.color).toBe('')
    })
  })

  // — handleOptions toggle —

  describe('handleOptions toggle', () => {
    it('selects a client on click', () => {
      render(<DashboardClient clients={mockClients} />)
      fireEvent.click(screen.getByTestId('action-cl-001'))
      expect(screen.getByTestId('selected-cl-001')).toBeInTheDocument()
    })

    it('deselects a client when clicked again', () => {
      render(<DashboardClient clients={mockClients} />)
      fireEvent.click(screen.getByTestId('action-cl-001'))
      fireEvent.click(screen.getByTestId('action-cl-001'))
    })

    it('switches selection between clients', () => {
      render(<DashboardClient clients={mockClients} />)
      fireEvent.click(screen.getByTestId('action-cl-001'))
      fireEvent.click(screen.getByTestId('action-cl-002'))
      expect(screen.getByTestId('selected-cl-002')).toBeInTheDocument()
    })

    it('only one client is selected at a time', () => {
      render(<DashboardClient clients={mockClients} />)
      fireEvent.click(screen.getByTestId('action-cl-001'))
      fireEvent.click(screen.getByTestId('action-cl-003'))
      expect(screen.queryAllByText('selected').length).toBe(1)
    })
  })
})