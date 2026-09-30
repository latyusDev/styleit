import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/useAuth'
import { useGlobalStore } from '@/store/global/useGlobal'
import { toast } from 'sonner'
import AdminLinkContainer from '@/components/admin/sidebar/AdminLinkContainer'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
  Link: ({ to, children, className }) => (
    <a href={to} className={className} data-testid={`link-${to}`}>
      {children}
    </a>
  ),
}))

vi.mock('@/store/useAuth', () => ({ useAuth: vi.fn() }))
vi.mock('@/store/global/useGlobal', () => ({ useGlobalStore: vi.fn() }))
vi.mock('sonner', () => ({ toast: vi.fn() }))
vi.mock('lucide-react', () => ({ X: () => <span>X</span> }))

vi.mock('@/static/adminData', () => ({
  adminLinks: [
    { id: 1, name: 'dashboard' },
    { id: 2, name: 'clients' },
  ],
}))

vi.mock('@/components/admin/sidebar/AdminLink', () => ({
  default: ({ link }) => <li data-testid={`admin-link-${link.name}`}>{link.name}</li>,
}))

// ── Helpers ────────────────────────────────────────────────────────────────

const setIsAdminOpened = vi.fn()
const navigate = vi.fn()
const logout = vi.fn()

const setup = ({ pathname = '/admin/dashboard', role = 'admin' } = {}) => {
  useLocation.mockReturnValue({ pathname })
  useNavigate.mockReturnValue(navigate)
  useAuth.mockReturnValue({ user: { role }, logout })
  useGlobalStore.mockReturnValue({ setIsAdminOpened })
  return render(<AdminLinkContainer />)
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('AdminLinkContainer', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Static links from adminLinks —

  it('renders all admin links from static data', () => {
    setup()
    expect(screen.getByTestId('admin-link-dashboard')).toBeInTheDocument()
    expect(screen.getByTestId('admin-link-clients')).toBeInTheDocument()
  })

  // — Always-visible links —

  it('renders Awaiting Approval link', () => {
    setup()
    expect(screen.getByTestId('link-/admin/creators/awaitingApproval')).toBeInTheDocument()
  })

  it('renders Trending link', () => {
    setup()
    expect(screen.getByTestId('link-/trending')).toBeInTheDocument()
  })

  it('renders Logout item', () => {
    setup()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  // — Active link styling —

  describe('currentPage active styling', () => {
    it('applies text-primary to Awaiting Approval when pathname ends with awaitingApproval', () => {
      setup({ pathname: '/admin/creators/awaitingApproval' })
      expect(
        screen.getByTestId('link-/admin/creators/awaitingApproval').className
      ).toContain('text-primary')
    })

    it('does not apply text-primary to Awaiting Approval on other pages', () => {
      setup({ pathname: '/admin/dashboard' })
      expect(
        screen.getByTestId('link-/admin/creators/awaitingApproval').className
      ).not.toContain('text-primary')
    })

    it('applies text-primary to Trending when pathname ends with trending', () => {
      setup({ pathname: '/trending' })
      expect(screen.getByTestId('link-/trending').className).toContain('text-primary')
    })
  })

  // — setIsAdminOpened on link click —

  it('calls setIsAdminOpened(false) when Awaiting Approval li is clicked', () => {
    setup()
    fireEvent.click(
      screen.getByTestId('link-/admin/creators/awaitingApproval').closest('li')
    )
    expect(setIsAdminOpened).toHaveBeenCalledWith(false)
  })

  it('calls setIsAdminOpened(false) when Trending li is clicked', () => {
    setup()
    fireEvent.click(screen.getByTestId('link-/trending').closest('li'))
    expect(setIsAdminOpened).toHaveBeenCalledWith(false)
  })

  // — Superadmin-only links —

  describe('superadmin links', () => {
    it('shows Register Admin, Staff Activities, and Mail Notifications for superadmin', () => {
      setup({ role: 'superadmin' })
      expect(screen.getByTestId('link-/admin/signUp')).toBeInTheDocument()
      expect(screen.getByTestId('link-/admin/superAdmin')).toBeInTheDocument()
      expect(screen.getByTestId('link-/admin/superAdmin/mailNotification')).toBeInTheDocument()
    })

    it('hides superadmin links for regular admin', () => {
      setup({ role: 'admin' })
      expect(screen.queryByTestId('link-/admin/signUp')).not.toBeInTheDocument()
      expect(screen.queryByTestId('link-/admin/superAdmin')).not.toBeInTheDocument()
      expect(screen.queryByTestId('link-/admin/superAdmin/mailNotification')).not.toBeInTheDocument()
    })

    it('applies text-primary to Register Admin when on that page', () => {
      setup({ role: 'superadmin', pathname: '/admin/signUp' })
      expect(screen.getByTestId('link-/admin/signUp').className).toContain('text-primary')
    })

    it('applies text-primary to Staff Activities when on that page', () => {
      setup({ role: 'superadmin', pathname: '/admin/superAdmin' })
      expect(screen.getByTestId('link-/admin/superAdmin').className).toContain('text-primary')
    })

    it('applies text-primary to Mail Notifications when on that page', () => {
      setup({ role: 'superadmin', pathname: '/admin/superAdmin/mailNotification' })
      expect(
        screen.getByTestId('link-/admin/superAdmin/mailNotification').className
      ).toContain('text-primary')
    })
  })

  // — Logout —

  describe('handleLogout', () => {
    it('calls logout on click', async () => {
      logout.mockResolvedValue({ message: 'Logged out' })
      setup()
      fireEvent.click(screen.getByText('Logout'))
      await waitFor(() => expect(logout).toHaveBeenCalled())
    })

    it('toasts success message and navigates to /admin/login on success', async () => {
      logout.mockResolvedValue({ message: 'Logged out successfully' })
      setup()
      fireEvent.click(screen.getByText('Logout'))
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'Logged out successfully',
          expect.objectContaining({ action: expect.anything() })
        )
        expect(setIsAdminOpened).toHaveBeenCalledWith(false)
        expect(navigate).toHaveBeenCalledWith('/admin/login')
      })
    })

    it('toasts error message when logout throws', async () => {
      logout.mockRejectedValue({ message: 'Network error' })
      setup()
      fireEvent.click(screen.getByText('Logout'))
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'Network error',
          expect.objectContaining({ action: expect.anything() })
        )
      })
    })

    it('toasts fallback message when error has no message', async () => {
      logout.mockRejectedValue({})
      setup()
      fireEvent.click(screen.getByText('Logout'))
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'something went wrong, try again',
          expect.objectContaining({ action: expect.anything() })
        )
      })
    })
  })
})