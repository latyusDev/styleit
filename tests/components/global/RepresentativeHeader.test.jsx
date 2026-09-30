import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/useAuth'
import { toast } from 'sonner'
import RepresentativeHeader from '@/components/global/RepresentativeHeader'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: ({ to, children, className, 'data-testid': testId }) => (
    <a href={to} className={className} data-testid={testId}>{children}</a>
  ),
  NavLink: ({ to, children, className, 'data-testid': testId }) => (
    <a href={to} className={typeof className === 'function' ? className({ isActive: false }) : className}
      data-testid={testId}>{children}</a>
  ),
}))

vi.mock('@/store/useAuth', () => ({ useAuth: vi.fn() }))
vi.mock('sonner', () => ({ toast: vi.fn() }))
vi.mock('lucide-react', () => ({ X: () => <span>X</span> }))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className }) => <img src={src} className={className} data-testid="user-avatar" alt="avatar" />,
}))

vi.mock('@/images/logo.png',   () => ({ default: '/logo.png'   }))
vi.mock('@/images/m_logo.png', () => ({ default: '/m_logo.png' }))

// ── Helpers ────────────────────────────────────────────────────────────────

const navigate = vi.fn()
const logout   = vi.fn()

const setup = ({ role = 'representative', user = null } = {}) => {
  useNavigate.mockReturnValue(navigate)
  useAuth.mockReturnValue({
    user: user ?? { role, fullname: 'Jane Doe', profilePic: '/pic.jpg' },
    logout,
  })
  return render(<RepresentativeHeader />)
}

const setupNoUser = () => {
  useNavigate.mockReturnValue(navigate)
  useAuth.mockReturnValue({ user: null, logout })
  return render(<RepresentativeHeader />)
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('RepresentativeHeader', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Logo —

  it('renders the mobile logo', () => {
    setup()
    const logos = screen.getAllByRole('img')
    const mLogo = logos.find(img => img.getAttribute('src') === '/m_logo.png')
    expect(mLogo).toBeInTheDocument()
  })

  // — Navigation links —

  it('renders Profile nav links', () => {
    setup()
    expect(screen.getAllByText('Profile').length).toBeGreaterThan(0)
  })

  it('renders Referrals nav links', () => {
    setup()
    expect(screen.getAllByText('Referrals').length).toBeGreaterThan(0)
  })

  it('hides Home link for representative role', () => {
    setup({ role: 'representative' })
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })

  it('shows Home link for non-representative role', () => {
    setup({ role: 'client' })
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  // — User logged in —

  describe('when user is logged in', () => {
    it('shows the first name from fullname', () => {
      setup()
      expect(screen.getByText('Jane')).toBeInTheDocument()
    })

    it('shows user avatar', () => {
      setup()
      expect(screen.getByTestId('user-avatar')).toHaveAttribute('src', '/pic.jpg')
    })

    it('does not show Login link when user is logged in', () => {
      setup()
      expect(screen.queryByTestId('login')).not.toBeInTheDocument()
    })

    it('does not show Sign up link when user is logged in', () => {
      setup()
      expect(screen.queryByTestId('signUp')).not.toBeInTheDocument()
    })
  })

  // — User logged out —

  describe('when user is not logged in', () => {
    it('shows Login link', () => {
      setupNoUser()
      expect(screen.getByTestId('login')).toBeInTheDocument()
    })

    it('shows Sign up link', () => {
      setupNoUser()
      expect(screen.getByTestId('signUp')).toBeInTheDocument()
    })

    it('Login link points to /login', () => {
      setupNoUser()
      expect(screen.getByTestId('login')).toHaveAttribute('href', '/login')
    })

    it('Sign up link points to /signUp', () => {
      setupNoUser()
      expect(screen.getByTestId('signUp')).toHaveAttribute('href', '/signUp')
    })
  })

  // — Logout buttons —

  describe('Logout buttons', () => {
    it('renders Logout button for representative (desktop)', () => {
      setup({ role: 'representative' })
      expect(screen.getAllByText('Logout').length).toBeGreaterThan(0)
    })

    it('renders Logout button on mobile nav', () => {
      setup()
      expect(screen.getAllByText('Logout').length).toBeGreaterThan(0)
    })
  })

  // — handleRepresentativeLogout —

  describe('handleRepresentativeLogout', () => {
    it('calls logout when Logout button is clicked', async () => {
      logout.mockResolvedValue({ message: 'Logged out' })
      setup()
      fireEvent.click(screen.getAllByText('Logout')[0])
      await waitFor(() => expect(logout).toHaveBeenCalled())
    })

    it('toasts success message and navigates to /representative/login on success', async () => {
      logout.mockResolvedValue({ message: 'Logged out successfully' })
      setup()
      fireEvent.click(screen.getAllByText('Logout')[0])
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'Logged out successfully',
          expect.objectContaining({ action: expect.anything() })
        )
        expect(navigate).toHaveBeenCalledWith('/representative/login')
      })
    })

    it('toasts error response message on logout failure', async () => {
      logout.mockRejectedValue({ message: 'Network error' })
      setup()
      fireEvent.click(screen.getAllByText('Logout')[0])
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
      fireEvent.click(screen.getAllByText('Logout')[0])
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'something went wrong, try again',
          expect.objectContaining({ action: expect.anything() })
        )
      })
    })

    it('does not navigate on logout failure', async () => {
      logout.mockRejectedValue({ message: 'Failed' })
      setup()
      fireEvent.click(screen.getAllByText('Logout')[0])
      await waitFor(() => expect(toast).toHaveBeenCalled())
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})