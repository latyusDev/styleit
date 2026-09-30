import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import RepresentativeLayout from '@/layouts/RepresentativeLayout'

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
  default: {
    get: vi.fn(),
  },
}))

import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/useAuth'
import Cookies from 'js-cookie'

// --- Helper ---

const mockNavigate = vi.fn()

const renderLayout = () =>
  render(
    <MemoryRouter>
      <RepresentativeLayout />
    </MemoryRouter>
  )

// --- Tests ---

describe('RepresentativeLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useNavigate.mockReturnValue(mockNavigate)
    Cookies.get.mockReturnValue(null)
  })

  // --- rendering ---

  it('renders the outlet when user is a valid representative', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    renderLayout()
    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })

  // --- redirect: no user ---

  it('redirects to /representative/login when there is no user', () => {
    useAuth.mockReturnValue({ user: null })
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith('/representative/login')
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

  it('navigates back when user role is creator', () => {
    useAuth.mockReturnValue({ user: { role: 'creator' } })
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  // --- redirect: deactivated account ---

  it('redirects to /verifyAccount when cookie user status is deactived', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    Cookies.get.mockReturnValue(JSON.stringify({ status: 'deactived' }))
    renderLayout()
    expect(mockNavigate).toHaveBeenCalledWith('/verifyAccount')
  })

  // --- no redirect: active account ---

  it('does not redirect when cookie user status is active', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    Cookies.get.mockReturnValue(JSON.stringify({ status: 'active' }))
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('does not redirect when there is no cookie at all', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    Cookies.get.mockReturnValue(null)
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  // --- cookie edge cases ---

  it('reads the "user" cookie key specifically', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    renderLayout()
    expect(Cookies.get).toHaveBeenCalledWith('user')
  })

  it('does not redirect when cookie is present but has no status field', () => {
    useAuth.mockReturnValue({ user: { role: 'representative' } })
    Cookies.get.mockReturnValue(JSON.stringify({ name: 'John' }))
    renderLayout()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})