import AdminPeriodActivities from '@/components/admin/admin/AdminPeriodActivities'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'


const mockPeriod = [
  { id: 1, name: 'daily', times: '3' },
  { id: 2, name: 'weekly', times: '5' },
  { id: 3, name: 'monthly', times: '8' },
  { id: 4, name: 'yearly', times: '16' }
]

// --- Tests ---

describe('AdminPeriodActivities', () => {
  describe('rendering', () => {
    it('renders a card for each period', () => {
      render(<AdminPeriodActivities period={mockPeriod} />)

      const names = screen.getAllByRole('heading', { level: 1 })
      expect(names).toHaveLength(4)
    })

    it('renders the name of each period', () => {
      render(<AdminPeriodActivities period={mockPeriod} />)

      expect(screen.getByText('daily')).toBeInTheDocument()
      expect(screen.getByText('weekly')).toBeInTheDocument()
      expect(screen.getByText('monthly')).toBeInTheDocument()
      expect(screen.getByText('yearly')).toBeInTheDocument()
    })

    it('renders the times value for each period', () => {
      render(<AdminPeriodActivities period={mockPeriod} />)

      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('16')).toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('renders no cards when period is an empty array', () => {
      render(<AdminPeriodActivities period={[]} />)

      const headings = screen.queryAllByRole('heading', { level: 1 })
      expect(headings).toHaveLength(0)
    })
  })

  describe('single period', () => {
    it('renders correctly with a single period entry', () => {
      render(<AdminPeriodActivities period={[{ id: 1, name: 'daily', times: '3' }]} />)

      expect(screen.getByText('daily')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('renders a card with empty times when times is undefined', () => {
      render(<AdminPeriodActivities period={[{ id: 1, name: 'daily', times: undefined }]} />)

      expect(screen.getByText('daily')).toBeInTheDocument()
    })

    it('renders period name in lowercase (capitalize is CSS only)', () => {
      render(<AdminPeriodActivities period={[{ id: 1, name: 'daily', times: '3' }]} />)

      // capitalize is a CSS class — the DOM value is still lowercase
      expect(screen.getByText('daily')).toBeInTheDocument()
    })
  })
})