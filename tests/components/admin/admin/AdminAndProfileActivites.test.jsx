import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useAdminStore } from '@/store/admin/useAdmin'
import AdminActivitiesAndProfile from '@/components/admin/admin/AdminActivitiesAndProfile'
import React from 'react'

// --- Mocks ---

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useQuery: vi.fn() }
})

vi.mock('@/store/admin/useAdmin', () => ({
  useAdminStore: vi.fn()
}))

vi.mock('@/components/admin/admin/AdminProfile', () => ({
  default: ({ isLoading, data }) => (
    <div data-testid="admin-profile">
      {isLoading ? 'Loading profile...' : `Profile: ${data?.name ?? 'no data'}`}
    </div>
  )
}))

vi.mock('@/components/admin/admin/AdminActivities', () => ({
  default: ({ isLoading, period, adminActivities, error }) => (
    <div data-testid="admin-activities">
      {isLoading ? 'Loading activities...' : `Activities count: ${adminActivities.length}`}
    </div>
  )
}))

vi.mock('@/components/admin/shared/LastSeen', () => ({
  default: () => <div data-testid="last-seen">Last Seen</div>
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }) => (
    <button onClick={onClick} className={className}>{children}</button>
  )
}))

// --- Setup ---

const mockGetAdminProfileDetails = vi.fn()

const mockData = {
  name: 'Admin User',
  daily_active_login_time: '3hrs',
  total_banned_users: 5,
  total_suspended_users: 2,
  day_activity: 4,
  week_activity: 5,
  month_activity:7,
  year_activity: 50
}

beforeEach(() => {
  vi.clearAllMocks()

  useAdminStore.mockReturnValue({ getAdminProfileDetails: mockGetAdminProfileDetails })

  useQuery.mockReturnValue({
    data: mockData,
    isLoading: false,
    error: null,
    isError: false
  })
})

// --- Tests ---

describe('AdminActivitiesAndProfile', () => {
  describe('rendering', () => {
    it('renders the profile and activities tab buttons', () => {
      render(<AdminActivitiesAndProfile />)

      expect(screen.getByRole('button', { name: /my profile/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /my activities/i })).toBeInTheDocument()
    })

    it('renders the LastSeen component', () => {
      render(<AdminActivitiesAndProfile />)

      expect(screen.getByTestId('last-seen')).toBeInTheDocument()
    })

    it('shows AdminProfile by default (profile tab active)', () => {
      render(<AdminActivitiesAndProfile />)

      expect(screen.getByTestId('admin-profile')).toBeInTheDocument()
      expect(screen.queryByTestId('admin-activities')).not.toBeInTheDocument()
    })
  })

  describe('tab switching', () => {
    it('switches to AdminActivities when "my activities" tab is clicked', () => {
      render(<AdminActivitiesAndProfile />)

      fireEvent.click(screen.getByRole('button', { name: /my activities/i }))

      expect(screen.getByTestId('admin-activities')).toBeInTheDocument()
      expect(screen.queryByTestId('admin-profile')).not.toBeInTheDocument()
    })

    it('switches back to AdminProfile when "my profile" tab is clicked', () => {
      render(<AdminActivitiesAndProfile />)

      fireEvent.click(screen.getByRole('button', { name: /my activities/i }))
      fireEvent.click(screen.getByRole('button', { name: /my profile/i }))

      expect(screen.getByTestId('admin-profile')).toBeInTheDocument()
      expect(screen.queryByTestId('admin-activities')).not.toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('passes isLoading=true to AdminProfile while query is loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })

      render(<AdminActivitiesAndProfile />)

      expect(screen.getByTestId('admin-profile')).toHaveTextContent('Loading profile...')
    })

    it('passes isLoading=true to AdminActivities while query is loading', () => {
      useQuery.mockReturnValue({ data: undefined, isLoading: true, error: null, isError: false })

      render(<AdminActivitiesAndProfile />)

      fireEvent.click(screen.getByRole('button', { name: /my activities/i }))

      expect(screen.getByTestId('admin-activities')).toHaveTextContent('Loading activities...')
    })
  })

  describe('data passing', () => {
    it('passes fetched data to AdminProfile', () => {
      render(<AdminActivitiesAndProfile />)

      expect(screen.getByTestId('admin-profile')).toHaveTextContent('Profile: Admin User')
    })

    it('passes correct adminActivities array (3 items) to AdminActivities', () => {
      render(<AdminActivitiesAndProfile />)

      fireEvent.click(screen.getByRole('button', { name: /my activities/i }))

      expect(screen.getByTestId('admin-activities')).toHaveTextContent('Activities count: 3')
    })
  })

  describe('useQuery config', () => {
    it('calls useQuery with the correct queryKey and queryFn', () => {
      render(<AdminActivitiesAndProfile />)

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['admin-profile'],
          queryFn: mockGetAdminProfileDetails
        })
      )
    })
  })
})
