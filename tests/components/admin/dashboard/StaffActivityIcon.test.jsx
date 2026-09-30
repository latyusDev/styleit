import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import StaffActivityIcon from '@/components/admin/superAdmin/staff/StaffActivityIcon'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('lucide-react', () => ({
  TrashIcon:          () => <svg data-testid="icon-trash" />,
  Lock:               () => <svg data-testid="icon-lock" />,
  ActivitySquareIcon: () => <svg data-testid="icon-activity" />,
  Trash2:             () => <svg data-testid="icon-trash2" />,
  BanIcon:            () => <svg data-testid="icon-ban" />,
  LockKeyholeOpen:    () => <svg data-testid="icon-lock-open" />,
}))

// ── Tests ──────────────────────────────────────────────────────────────────

describe('StaffActivityIcon', () => {
  it('renders TrashIcon for activity 1', () => {
    render(<StaffActivityIcon activity={1} />)
    expect(screen.getByTestId('icon-trash')).toBeInTheDocument()
  })

  it('renders Lock for activity 2', () => {
    render(<StaffActivityIcon activity={2} />)
    expect(screen.getByTestId('icon-lock')).toBeInTheDocument()
  })

  it('renders ActivitySquareIcon for activity 3', () => {
    render(<StaffActivityIcon activity={3} />)
    expect(screen.getByTestId('icon-activity')).toBeInTheDocument()
  })

  it('renders Trash2 as default for unknown activity', () => {
    render(<StaffActivityIcon activity={99} />)
    expect(screen.getByTestId('icon-trash2')).toBeInTheDocument()
  })

  it('renders Trash2 as default when activity is undefined', () => {
    render(<StaffActivityIcon />)
    expect(screen.getByTestId('icon-trash2')).toBeInTheDocument()
  })

  it('renders Trash2 as default when activity is null', () => {
    render(<StaffActivityIcon activity={null} />)
    expect(screen.getByTestId('icon-trash2')).toBeInTheDocument()
  })

  it('renders only one icon at a time', () => {
    render(<StaffActivityIcon activity={1} />)
    expect(screen.queryByTestId('icon-lock')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-activity')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-trash2')).not.toBeInTheDocument()
  })
})