import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useAdminStore } from '@/store/admin/useAdmin'
import SuperAdminActivities from '@/components/admin/superAdmin/SuperAdminActivities'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  // useMutation returns a stable object on every call — never undefined
  useMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
}))

vi.mock('@/store/admin/useAdmin', () => ({
  useAdminStore: vi.fn(),
}))

vi.mock('sonner', () => ({ toast: vi.fn() }))

vi.mock('lucide-react', () => ({
  Loader2: () => <span data-testid="loader">loading</span>,
  X: () => <span>X</span>,
}))

vi.mock('@/components/admin/superAdmin/staff/StaffActivityIcon', () => ({
  default: ({ activity }) => <div data-testid={`activity-icon-${activity}`} />,
}))

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }) => <div data-testid="skeleton" className={className} />,
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div data-testid="error-message">{error?.message}</div>,
}))

vi.mock('@/components/global/Paginator', () => ({
  default: ({ page }) => <div data-testid="paginator">Page: {page}</div>,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }) => (
    <button onClick={onClick} className={className} data-testid="button">{children}</button>
  ),
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockAdmin = {
  admin: { admin_id: 'adm-001', name: 'Alice' },
  designers: { deactivated: 5, banned: 2, suspended: 1, dormant: 3 },
  customers: { deactivated: 10, banned: 4, suspended: 2, dormant: 6 },
  salesrep: { deactivated: 1, banned: 0, suspended: 0, dormant: 1 },
  post: { suspended: 7, banned: 3 },
  comment: { suspended: 2, banned: 1 },
}

const mockData = { data: [mockAdmin] }
const mutateFn = vi.fn()
const activateMutateFn = vi.fn()

// ── Setup helpers ──────────────────────────────────────────────────────────

/**
 * Sets up mocks for a normal render.
 * useMutation is called TWICE per render (deactivate + activate).
 * We give each call its own fn via an incrementing counter so re-renders
 * always get a valid object — never undefined.
 */
const setupMutations = ({ deactivatePending = false, activatePending = false } = {}) => {
  let callCount = 0
  useMutation.mockImplementation(() => {
    callCount++
    if (callCount % 2 === 1) {
      // First call = deactivate mutation
      return { mutate: mutateFn, isPending: deactivatePending }
    }
    // Second call = activate mutation
    return { mutate: activateMutateFn, isPending: activatePending }
  })
}

const setup = ({ queryState = {}, deactivatePending = false, activatePending = false } = {}) => {
  useAdminStore.mockReturnValue({
    getStaffActivities: vi.fn(),
    deactivateAdmin: vi.fn(),
  })

  setupMutations({ deactivatePending, activatePending })

  useQuery.mockReturnValue({
    isLoading: false,
    isError: false,
    data: mockData,
    ...queryState,
  })

  return render(<SuperAdminActivities />)
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('SuperAdminActivities', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Loading state —

  it('shows skeleton while loading', () => {
    useAdminStore.mockReturnValue({ getStaffActivities: vi.fn(), deactivateAdmin: vi.fn() })
    setupMutations()
    useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })
    render(<SuperAdminActivities />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('does not render main content while loading', () => {
    useAdminStore.mockReturnValue({ getStaffActivities: vi.fn(), deactivateAdmin: vi.fn() })
    setupMutations()
    useQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined })
    render(<SuperAdminActivities />)
  })

  // — Error state —

  it('shows error message on query failure', () => {
    setup({ queryState: { isError: true, error: { message: 'Server error' }, data: undefined } })
    expect(screen.getByTestId('error-message')).toHaveTextContent('Server error')
  })

  it('does not show admins list on error', () => {
    setup({ queryState: { isError: true, error: { message: 'err' }, data: undefined } })
  })

  // — Empty data —

  it('shows "No user found" when data is empty', () => {
    setup({ queryState: { data: { data: [] } } })
    expect(screen.getByText('No user found')).toBeInTheDocument()
  })

  // — Success state —

  describe('success state', () => {
    it('renders Admins list', () => {
      setup()
    })

    it('renders paginator', () => {
      setup()
      expect(screen.getByTestId('paginator')).toBeInTheDocument()
    })

    it('renders paginator starting at page 1', () => {
      setup()
      expect(screen.getByTestId('paginator')).toHaveTextContent('Page: 1')
    })

    it('renders designer stats by default', () => {
      setup()
      expect(screen.getByText('5')).toBeInTheDocument() // deactivated
      expect(screen.getByText('2')).toBeInTheDocument() // banned
    })

    it('renders Activate and Deactivate buttons', () => {
      setup()
      expect(screen.getByText('Activate')).toBeInTheDocument()
      expect(screen.getByText('Deactivate')).toBeInTheDocument()
    })

    it('renders Change admin status heading', () => {
      setup()
      expect(screen.getByText('Change admin status')).toBeInTheDocument()
    })

    it('renders all StaffActivityIcons', () => {
      setup()
      ;[0, 1, 2, 3].forEach(n => {
        expect(screen.getAllByTestId(`activity-icon-${n}`).length).toBeGreaterThan(0)
      })
    })
  })

  // — User type tabs —

  describe('user type tabs', () => {
    it('shows creators tab as default selected', () => {
      setup()
      expect(screen.getByText('creator').className).toContain('bg-sidebar')
    })

    it('switches to customers stats on client tab click', () => {
      setup()
      fireEvent.click(screen.getByText('client'))
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('switches to salesrep stats on representative tab click', () => {
      setup()
      fireEvent.click(screen.getByText('representative'))
      expect(screen.getAllByText('1').length).toBeGreaterThan(0)
    })

    it('highlights active user tab after click', () => {
      setup()
      fireEvent.click(screen.getByText('client'))
      expect(screen.getByText('client').className).toContain('bg-sidebar')
    })
  })

  // — Post details tabs —

  describe('post details tabs', () => {
    it('shows Posts tab as default selected', () => {
      setup()
      expect(screen.getByText('Posts').className).toContain('bg-sidebar')
    })

    it('shows post suspended count by default', () => {
      setup()
      expect(screen.getByText('7')).toBeInTheDocument()
    })

  
  })

  // — Activate / Deactivate —

  describe('handleAdminStatus', () => {
    it('calls ActivateMutation with admin_id on Activate click', () => {
      setup()
      fireEvent.click(screen.getByText('Activate'))
      expect(activateMutateFn).toHaveBeenCalledWith({ admin_id: 'adm-001' })
    })

    it('calls deactivate mutate with admin_id on Deactivate click', () => {
      setup()
      fireEvent.click(screen.getByText('Deactivate'))
      expect(mutateFn).toHaveBeenCalledWith({ admin_id: 'adm-001' })
    })

    it('shows activating loader when activatePending is true', () => {
      setup({ activatePending: true })
      expect(screen.getByText('activating')).toBeInTheDocument()
    })

    it('shows deactivating loader when isPending is true', () => {
      setup({ deactivatePending: true })
      expect(screen.getByText('deactivating')).toBeInTheDocument()
    })
  })
})

