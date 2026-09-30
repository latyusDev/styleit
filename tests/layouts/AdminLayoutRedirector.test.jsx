import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import AdminLayoutRedirector from '@/layouts/AdminLayoutRedirector'

// --- Mocks ---

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

import { useNavigate } from 'react-router-dom'

// --- Helper ---

const mockNavigate = vi.fn()

const renderComponent = () =>
  render(
    <MemoryRouter>
      <AdminLayoutRedirector />
    </MemoryRouter>
  )

// --- Tests ---

describe('AdminLayoutRedirector', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useNavigate.mockReturnValue(mockNavigate)
  })

  it('redirects to /admin/dashboard on mount', () => {
    renderComponent()
    expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard')
  })

  it('redirects exactly once on mount', () => {
    renderComponent()
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  it('renders nothing', () => {
    const { container } = renderComponent()
    expect(container.firstChild).toBeNull()
  })
})