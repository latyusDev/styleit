import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import LastSeen from '@/components/admin/shared/LastSeen'

vi.mock('@/static/adminData', () => ({
  months: ['January', 'February', 'March']
}))

describe('LastSeen', () => {
  it('renders the last seen element', () => {
    render(<LastSeen lastSeen="2024-01-01" />)
    expect(screen.getByTestId('last_seen')).toBeInTheDocument()
  })

  it('displays the correct last seen date', () => {
    render(<LastSeen lastSeen="2024-01-01" />)
    expect(screen.getByTestId('last_seen')).toHaveTextContent('Last seen: 2024-01-01')
  })

  it('renders with no date when lastSeen is not provided', () => {
    render(<LastSeen />)
    expect(screen.getByTestId('last_seen')).toHaveTextContent('Last seen:')
  })

  it('renders with no date when lastSeen is null', () => {
    render(<LastSeen lastSeen={null} />)
    expect(screen.getByTestId('last_seen')).toHaveTextContent('Last seen:')
  })

  it('renders with no date when lastSeen is undefined', () => {
    render(<LastSeen lastSeen={undefined} />)
    expect(screen.getByTestId('last_seen')).toHaveTextContent('Last seen:')
  })
})