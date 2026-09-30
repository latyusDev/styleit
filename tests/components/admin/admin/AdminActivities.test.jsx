import AdminActivities from '@/components/admin/admin/AdminActivities'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
// --- Mocks ---

vi.mock('@/components/admin/superAdmin/staff/StaffActivityIcon', () => ({
  default: ({ activity }) => (
    <div data-testid={`staff-icon-${activity.activityName}`}>icon</div>
  )
}))

vi.mock('@/components/admin/admin/AdminPeriodActivities', () => ({
  default: ({ period }) => (
    <div data-testid="admin-period-activities">Periods: {period.length}</div>
  )
}))

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }) => <div data-testid="skeleton" className={className} />
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => (
    <div data-testid="error-message">{error?.message ?? 'Something went wrong'}</div>
  )
}))

// --- Fixtures ---

const mockPeriod = [
  { id: 1, name: 'daily', times: 6 },
  { id: 2, name: 'weekly', times: 10 },
  { id: 3, name: 'monthly', times: 16 },
  { id: 4, name: 'yearly', times: 16 }
]

const mockAdminActivities = [
  { id: 1, activityName: 'active times', activity: '3hrs' },
  { id: 2, activityName: 'banned users', activity: 5 },
  { id: 4, activityName: 'suspended users', activity: 2 }
]

const noError = { isError: false, error: null }

// --- Tests ---

describe('AdminActivities', () => {
  describe('loading state', () => {
    it('renders the Skeleton when isLoading is true', () => {
      render(
        <AdminActivities
          adminActivities={[]}
          period={[]}
          isLoading={true}
          error={noError}
        />
      )

      expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })

    it('does not render activities content while loading', () => {
      render(
        <AdminActivities
          adminActivities={mockAdminActivities}
          period={mockPeriod}
          isLoading={true}
          error={noError}
        />
      )

      expect(screen.queryByTestId('admin-period-activities')).not.toBeInTheDocument()
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  describe('error state', () => {
    it('renders ErrorMessage when isError is true', () => {
      const mockError = { isError: true, error: { message: 'Failed to fetch' } }

      render(
        <AdminActivities
          adminActivities={mockAdminActivities}
          period={mockPeriod}
          isLoading={false}
          error={mockError}
        />
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch')
    })

    it('does not render activities when isError is true', () => {
      const mockError = { isError: true, error: { message: 'Failed to fetch' } }

      render(
        <AdminActivities
          adminActivities={mockAdminActivities}
          period={mockPeriod}
          isLoading={false}
          error={mockError}
        />
      )

      expect(screen.queryByTestId('admin-period-activities')).not.toBeInTheDocument()
    })
  })

  describe('success state', () => {
    beforeEach(() => {
      render(
        <AdminActivities
          adminActivities={mockAdminActivities}
          period={mockPeriod}
          isLoading={false}
          error={noError}
        />
      )
    })

    it('renders AdminPeriodActivities with the correct period count', () => {
      expect(screen.getByTestId('admin-period-activities')).toHaveTextContent('Periods: 4')
    })

    it('renders a card for each activity', () => {
      expect(screen.getByText('active times')).toBeInTheDocument()
      expect(screen.getByText('banned users')).toBeInTheDocument()
      expect(screen.getByText('suspended users')).toBeInTheDocument()
    })

    it('renders the activity value for each card', () => {
      expect(screen.getByText('3hrs')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('renders a StaffActivityIcon for each activity', () => {
      expect(screen.getByTestId('staff-icon-active times')).toBeInTheDocument()
      expect(screen.getByTestId('staff-icon-banned users')).toBeInTheDocument()
      expect(screen.getByTestId('staff-icon-suspended users')).toBeInTheDocument()
    })

    it('does not render the Skeleton or ErrorMessage', () => {
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  describe('activity card styling', () => {
    it('applies green background class to "active times" card', () => {
      render(
        <AdminActivities
          adminActivities={mockAdminActivities}
          period={mockPeriod}
          isLoading={false}
          error={noError}
        />
      )

      const activeTimesText = screen.getByText('active times')
      expect(activeTimesText.closest('div[class*="bg-green"]')).toBeInTheDocument()
    })

    it('applies red background class to "banned users" card', () => {
      render(
        <AdminActivities
          adminActivities={mockAdminActivities}
          period={mockPeriod}
          isLoading={false}
          error={noError}
        />
      )

      const bannedText = screen.getByText('banned users')
      expect(bannedText.closest('div[class*="bg-red"]')).toBeInTheDocument()
    })

    it('applies black background class to "suspended users" card', () => {
      render(
        <AdminActivities
          adminActivities={mockAdminActivities}
          period={mockPeriod}
          isLoading={false}
          error={noError}
        />
      )

      const suspendedText = screen.getByText('suspended users')
      expect(suspendedText.closest('div[class*="bg-black"]')).toBeInTheDocument()
    })
  })
})