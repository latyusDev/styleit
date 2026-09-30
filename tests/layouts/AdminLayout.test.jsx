import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'

// --- Mocks ---

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  }
})

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(),
}))

vi.mock('@/store/global/useGlobal', () => ({
  useGlobalStore: vi.fn(),
}))

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

vi.mock('@/components/admin/sidebar/AdminSidebar', () => ({
  default: () => <div data-testid="admin-sidebar" />,
}))

vi.mock('@/components/global/SidebarContainer', () => ({
  default: () => <div data-testid="sidebar-container" />,
}))

vi.mock('@/pages/ViewTrendingPost', () => ({
  roles: ['admin', 'superadmin'],
}))

import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/store/useAuth'
import { useGlobalStore } from '@/store/global/useGlobal'
import Cookies from 'js-cookie'

// --- Helper ---

const mockNavigate = vi.fn()

const renderLayout = (path = '/admin/dashboard') => {
  useLocation.mockReturnValue({ pathname: path })
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AdminLayout />
    </MemoryRouter>
  )
}

// --- Tests ---

describe('AdminLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useNavigate.mockReturnValue(mockNavigate)
    useLocation.mockReturnValue({ pathname: '/admin/dashboard' })
    useAuth.mockReturnValue({ user: { role: 'admin' } })
    useGlobalStore.mockReturnValue({ isAdminOpened: false })
    Cookies.get.mockReturnValue(null)
  })

  // --- rendering ---

  it('renders the outlet for a valid admin', () => {
    renderLayout()
    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })

  it('renders the admin sidebar', () => {
    renderLayout()
    expect(screen.getByTestId('admin-sidebar')).toBeInTheDocument()
  })

  it('renders the sidebar container', () => {
    renderLayout()
    expect(screen.getByTestId('sidebar-container')).toBeInTheDocument()
  })

  // --- redirect: no user ---

  it('redirects to /login when there is no user', () => {
    useAuth.mockReturnValue({ user: null })
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  // --- redirect: wrong role ---

  it('navigates back when user role is client', () => {
    useAuth.mockReturnValue({ user: { role: 'client' } })
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('navigates back when user role is designer', () => {
    useAuth.mockReturnValue({ user: { role: 'designer' } })
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('navigates back when user role is representative', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('does not navigate back when user role is superadmin', () => {
    useAuth.mockReturnValue({ user: { role: 'superadmin' } })
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalledWith(-1)
  })

  // --- redirect: deactivated account ---

  it('redirects to /verifyAccount when cookie status is deactived', () => {
    Cookies.get.mockReturnValue(JSON.stringify({ status: 'deactived' }))
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith('/verifyAccount')
  })

  // --- no redirect: active/missing cookie ---

  it('does not redirect when cookie status is active', () => {
    Cookies.get.mockReturnValue(JSON.stringify({ status: 'active' }))
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalledWith('/verifyAccount')
  })

  it('does not redirect when there is no cookie', () => {
    Cookies.get.mockReturnValue(null)
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalledWith('/verifyAccount')
  })

  it('does not redirect when cookie has no status field', () => {
    Cookies.get.mockReturnValue(JSON.stringify({ name: 'Admin' }))
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalledWith('/verifyAccount')
  })

  // --- redirect: /admin root routes ---

  it('redirects to /admin/dashboard when path is /admin', () => {
    renderLayout('/admin')
    expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard')
  })

  it('redirects to /admin/dashboard when path is /admin/', () => {
    renderLayout('/admin/')
    expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard')
  })

  it('does not redirect to /admin/dashboard on other admin paths', () => {
    renderLayout('/admin/users')
    expect(mockNavigate).not.toHaveBeenCalledWith('/admin/dashboard')
  })

  // --- cookie key ---

  it('reads the "user" cookie key specifically', () => {
    renderLayout()
    expect(Cookies.get).toHaveBeenCalledWith('user')
  })

  // --- isAdminOpened sidebar layout ---

  it('applies w-0 class to content when admin sidebar is opened', () => {
    useGlobalStore.mockReturnValue({ isAdminOpened: true })
    renderLayout()
    const outlet = screen.getByTestId('outlet')
    expect(outlet.parentElement).toHaveClass('w-0')
  })

  it('applies w-full class to content when admin sidebar is closed', () => {
    useGlobalStore.mockReturnValue({ isAdminOpened: false })
    renderLayout()
    const outlet = screen.getByTestId('outlet')
    expect(outlet.parentElement).toHaveClass('w-full')
  })
})