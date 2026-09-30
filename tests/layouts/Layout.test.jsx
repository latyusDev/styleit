import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Layout from '@/layouts/Layout'

// --- Mocks ---

vi.mock('@/components/global/Header', () => ({
  default: () => <div data-testid="header" />,
}))

vi.mock('@/components/global/AdminHeader', () => ({
  default: () => <div data-testid="admin-header" />,
}))

vi.mock('@/components/global/RepresentativeHeader', () => ({
  default: () => <div data-testid="representative-header" />,
}))

vi.mock('@/components/global/Footer', () => ({
  default: () => <div data-testid="footer" />,
}))

vi.mock('@/components/global/Navbar', () => ({
  default: () => <div data-testid="navbar" />,
}))

vi.mock('@/components/global/SidebarContainer', () => ({
  default: () => <div data-testid="sidebar-container" />,
}))

vi.mock('@/components/global/ScrollButton', () => ({
  default: () => <div data-testid="scroll-to-top" />,
}))

vi.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid="toaster" />,
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />,
  }
})

vi.mock('@/store/global/useGlobal', () => ({
  useGlobalStore: vi.fn(),
}))

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(),
}))

// pull in the mocked modules so we can reconfigure them per test
import { useGlobalStore } from '@/store/global/useGlobal'
import { useAuth } from '@/store/useAuth'

// --- Helper ---

const renderLayout = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Layout />
    </MemoryRouter>
  )

// --- Tests ---

describe('Layout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useGlobalStore.mockReturnValue({ isNavbarOpened: false })
    useAuth.mockReturnValue({ user: null })
  })

  // --- always-present elements ---

  it('always renders the outlet', () => {
    renderLayout()
    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })

  it('always renders the sidebar container', () => {
    renderLayout()
    expect(screen.getByTestId('sidebar-container')).toBeInTheDocument()
  })

  it('always renders the scroll-to-top button', () => {
    renderLayout()
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument()
  })

  it('always renders the toaster', () => {
    renderLayout()
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  // --- header selection ---

  it('renders the default Header for a guest user', () => {
    renderLayout()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.queryByTestId('admin-header')).not.toBeInTheDocument()
    expect(screen.queryByTestId('representative-header')).not.toBeInTheDocument()
  })

  it('renders the default Header for a client role', () => {
    useAuth.mockReturnValue({ user: { role: 'client' } })
    renderLayout()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.queryByTestId('admin-header')).not.toBeInTheDocument()
    expect(screen.queryByTestId('representative-header')).not.toBeInTheDocument()
  })

  it('renders AdminHeader for admin role', () => {
    useAuth.mockReturnValue({ user: { role: 'admin' } })
    renderLayout()
    expect(screen.getByTestId('admin-header')).toBeInTheDocument()
    expect(screen.queryByTestId('header')).not.toBeInTheDocument()
    expect(screen.queryByTestId('representative-header')).not.toBeInTheDocument()
  })

  it('renders AdminHeader for superadmin role', () => {
    useAuth.mockReturnValue({ user: { role: 'superadmin' } })
    renderLayout()
    expect(screen.getByTestId('admin-header')).toBeInTheDocument()
    expect(screen.queryByTestId('header')).not.toBeInTheDocument()
  })

  it('renders RepresentativeHeader for representative role', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    renderLayout()
    expect(screen.getByTestId('representative-header')).toBeInTheDocument()
    expect(screen.queryByTestId('header')).not.toBeInTheDocument()
    expect(screen.queryByTestId('admin-header')).not.toBeInTheDocument()
  })

  // --- navbar ---

  it('does not render Navbar when isNavbarOpened is false', () => {
    useGlobalStore.mockReturnValue({ isNavbarOpened: false })
    renderLayout()
    expect(screen.queryByTestId('navbar')).not.toBeInTheDocument()
  })

  it('renders Navbar when isNavbarOpened is true', () => {
    useGlobalStore.mockReturnValue({ isNavbarOpened: true })
    renderLayout()
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  // --- footer ---

  it('renders Footer on non-admin routes', () => {
    renderLayout('/client/profile')
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders Footer on the root route', () => {
    renderLayout('/')
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('does not render Footer on /admin routes', () => {
    renderLayout('/admin/dashboard')
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
  })

  it('does not render Footer on nested /admin routes', () => {
    renderLayout('/admin/users/123')
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
  })

  // --- scroll to top on navigation ---

  it('calls window.scrollTo when the route changes', () => {
    const scrollTo = vi.fn()
    window.scrollTo = scrollTo

    const { rerender } = render(
      <MemoryRouter initialEntries={['/client/profile']}>
        <Layout />
      </MemoryRouter>
    )

    rerender(
      <MemoryRouter initialEntries={['/client/settings']}>
        <Layout />
      </MemoryRouter>
    )

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })
})