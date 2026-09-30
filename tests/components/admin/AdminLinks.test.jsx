import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useLocation } from 'react-router-dom'
import { useGlobalStore } from '@/store/global/useGlobal'
import AdminLink from '@/components/admin/sidebar/AdminLink'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  Link: ({ to, children, className }) => (
    <a href={to} className={className} data-testid={`link-${to}`}>
      {children}
    </a>
  ),
}))

vi.mock('lucide-react', () => ({
  ChevronRight: ({ onClick, className }) => (
    <button data-testid="chevron" className={className} onClick={onClick} />
  ),
}))

vi.mock('@/store/global/useGlobal', () => ({
  useGlobalStore: vi.fn(),
}))

// ── Helpers ────────────────────────────────────────────────────────────────

const setIsAdminOpened = vi.fn()

const renderLink = (link, pathname = '/admin/dashboard') => {
  useLocation.mockReturnValue({ pathname })
  useGlobalStore.mockReturnValue({ setIsAdminOpened })

  // jsdom doesn't set window.location.origin so we mock it
  Object.defineProperty(window, 'location', {
    value: { ...window.location, origin: 'http://localhost' },
    writable: true,
  })

  return render(<AdminLink link={link} />)
}

// ── Fixtures ───────────────────────────────────────────────────────────────

const simpleLink = { name: 'dashboard' }

const linkWithChildren = {
  name: 'settings',
  links: ['profile', 'security', 'billing'],
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('AdminLink', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Rendering —

  it('renders the link name', () => {
    renderLink(simpleLink)
    expect(screen.getByText('dashboard')).toBeInTheDocument()
  })

  it('renders a link pointing to /admin/{name}', () => {
    renderLink(simpleLink)
    expect(screen.getByTestId('link-/admin/dashboard')).toBeInTheDocument()
  })

  it('does not render chevron when link has no children', () => {
    renderLink(simpleLink)
    expect(screen.queryByTestId('chevron')).not.toBeInTheDocument()
  })

  it('renders chevron when link has children', () => {
    renderLink(linkWithChildren)
    expect(screen.getByTestId('chevron')).toBeInTheDocument()
  })

  // — Active link styling —

  it('applies active class when pathname segment matches link name', () => {
    renderLink(simpleLink, '/admin/dashboard')
    const link = screen.getByTestId('link-/admin/dashboard')
    expect(link.className).toContain('text-primary')
  })

  it('does not apply active class when pathname segment does not match', () => {
    renderLink(simpleLink, '/admin/clients')
    const link = screen.getByTestId('link-/admin/dashboard')
    expect(link.className).not.toContain('text-primary')
  })

  // — setIsAdminOpened —

  it('calls setIsAdminOpened(false) when list item is clicked', () => {
    renderLink(simpleLink)
    fireEvent.click(screen.getByText('dashboard').closest('li'))
    expect(setIsAdminOpened).toHaveBeenCalledWith(false)
  })

  // — Children dropdown —

  describe('children dropdown', () => {
    it('does not show child links by default', () => {
      renderLink(linkWithChildren)
      expect(screen.queryByText('profile')).not.toBeInTheDocument()
    })

    it('shows child links after chevron is clicked', () => {
      renderLink(linkWithChildren)
      fireEvent.click(screen.getByTestId('chevron'))
      linkWithChildren.links.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })

    it('hides child links when chevron is clicked again', () => {
      renderLink(linkWithChildren)
      fireEvent.click(screen.getByTestId('chevron'))
      fireEvent.click(screen.getByTestId('chevron'))
      expect(screen.queryByText('profile')).not.toBeInTheDocument()
    })

    it('applies rotate-90 class to chevron when open', () => {
      renderLink(linkWithChildren)
      fireEvent.click(screen.getByTestId('chevron'))
      expect(screen.getByTestId('chevron').className).toContain('rotate-90')
    })

    it('applies rotate-0 class to chevron when closed', () => {
      renderLink(linkWithChildren)
      expect(screen.getByTestId('chevron').className).toContain('rotate-0')
    })

    it('each child link points to the correct path', () => {
      renderLink(linkWithChildren)
      fireEvent.click(screen.getByTestId('chevron'))
      linkWithChildren.links.forEach(item => {
        expect(
          screen.getByTestId(`link-/admin/${linkWithChildren.name}/${item}`)
        ).toBeInTheDocument()
      })
    })
  })
})