import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import CreatorLayout from '@/layouts/CreatorLayout'

// --- Mocks ---

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />,
    useNavigate: vi.fn(),
  }
})

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(),
}))

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

vi.mock('@/components/global/linkTabs/LinkTabsContainer', () => ({
  default: () => <div data-testid="link-tabs-container" />,
}))

import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/useAuth'
import Cookies from 'js-cookie'

// --- Helper ---

const mockNavigate = vi.fn()

const renderLayout = () =>
  render(
    <MemoryRouter>
      <CreatorLayout />
    </MemoryRouter>
  )

// --- Tests ---

describe('CreatorLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useNavigate.mockReturnValue(mockNavigate)
    Cookies.get.mockReturnValue(null)
  })

  // --- rendering ---

  it('renders the outlet for a valid designer', () => {
    useAuth.mockReturnValue({ user: { role: 'designer' } })
    renderLayout()
    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })

  it('renders the link tabs container for a valid designer', () => {
    useAuth.mockReturnValue({ user: { role: 'designer' } })
    renderLayout()
    expect(screen.getByTestId('link-tabs-container')).toBeInTheDocument()
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

  it('navigates back when user role is admin', () => {
    useAuth.mockReturnValue({ user: { role: 'admin' } })
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('navigates back when user role is representative', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  // --- redirect: deactivated account ---

  it('redirects to /verifyAccount when cookie status is deactived', () => {
    useAuth.mockReturnValue({ user: { role: 'designer' } })
    Cookies.get.mockReturnValue(JSON.stringify({ status: 'deactived' }))
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith('/verifyAccount')
  })

  // --- no redirect: active/missing cookie ---

  it('does not redirect when cookie status is active', () => {
    useAuth.mockReturnValue({ user: { role: 'designer' } })
    Cookies.get.mockReturnValue(JSON.stringify({ status: 'active' }))
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('does not redirect when there is no cookie', () => {
    useAuth.mockReturnValue({ user: { role: 'designer' } })
    Cookies.get.mockReturnValue(null)
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  // --- cookie edge cases ---

  it('reads the "user" cookie key specifically', () => {
    useAuth.mockReturnValue({ user: { role: 'designer' } })
    renderLayout()
    expect(Cookies.get).toHaveBeenCalledWith('user')
  })

  it('does not redirect when cookie has no status field', () => {
    useAuth.mockReturnValue({ user: { role: 'designer' } })
    Cookies.get.mockReturnValue(JSON.stringify({ name: 'Jane' }))
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})