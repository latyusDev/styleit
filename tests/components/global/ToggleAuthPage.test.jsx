import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useToggleAuthPage from '@/hooks/useToggleAuthPage'
import ToggleAuthPage from '@/components/global/ToggleAuthPage'

// --- Mocks ---

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}))

vi.mock('@/hooks/useToggleAuthPage', () => ({
  default: vi.fn(),
}))


// --- Fixtures ---

const mockTogglePage = vi.fn()

// --- Helper ---

const renderComponent = (props = {}) => {
  const defaultProps = { role: 'client', page: 'login', ...props }
  return render(<ToggleAuthPage {...defaultProps} />)
}

// --- Tests ---

describe('ToggleAuthPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useToggleAuthPage.mockReturnValue({ togglePage: mockTogglePage })
  })

  // --- text rendering ---

  it('shows "log in" when page is login', () => {
    renderComponent({ page: 'login' })
    expect(screen.getByText(/log in/i)).toBeInTheDocument()
  })

  it('shows "sign up" when page is not login', () => {
    renderComponent({ page: 'signup' })
    expect(screen.getByText(/sign up/i)).toBeInTheDocument()
  })

  it('shows "client" when role is designer', () => {
    renderComponent({ role: 'designer' })
    expect(screen.getByText(/client/i)).toBeInTheDocument()
  })

  it('shows "fashion designer" when role is client', () => {
    renderComponent({ role: 'client' })
    expect(screen.getByText(/fashion designer/i)).toBeInTheDocument()
  })

  it('shows "fashion designer" when role is neither designer nor client', () => {
    renderComponent({ role: 'other' })
    expect(screen.getByText(/fashion designer/i)).toBeInTheDocument()
  })

  // --- click handler ---

  it('renders the "click here" button', () => {
    renderComponent()
    expect(screen.getByRole('button', { name: /click here/i })).toBeInTheDocument()
  })

  it('calls togglePage with page, role, and false when button is clicked', () => {
    renderComponent({ page: 'login', role: 'client' })
    fireEvent.click(screen.getByRole('button', { name: /click here/i }))
    expect(mockTogglePage).toHaveBeenCalledWith('login', 'client', false)
  })

  it('calls togglePage with correct args on signup page as designer', () => {
    renderComponent({ page: 'signup', role: 'designer' })
    fireEvent.click(screen.getByRole('button', { name: /click here/i }))
    expect(mockTogglePage).toHaveBeenCalledWith('signup', 'designer', false)
  })

  it('always passes false as the third argument to togglePage', () => {
    renderComponent({ page: 'login', role: 'client' })
    fireEvent.click(screen.getByRole('button', { name: /click here/i }))
    expect(mockTogglePage).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      false
    )
  })

  it('calls togglePage exactly once per click', () => {
    renderComponent()
    fireEvent.click(screen.getByRole('button', { name: /click here/i }))
    expect(mockTogglePage).toHaveBeenCalledTimes(1)
  })
})