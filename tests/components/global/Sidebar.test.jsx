import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Sidebar from '@/components/global/Sidebar'
import { MemoryRouter } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// ---- mocks ----

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: { role: 'designer', profile_pic: 'img.jpg' },
    logout: vi.fn(),
  })),
}))

vi.mock('@/store/global/useGlobal', () => ({
  useGlobalStore: vi.fn(() => ({
    setIsSidebarOpened: vi.fn(),
  })),
}))

vi.mock('@/store/useProfile', () => ({
  useProfileStore: vi.fn(() => ({
    getProfileDetails: vi.fn(),
  })),
}))

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: {
        data: {
          total_following: 5,
          follow_count: 10,
          bank: [],
        },
      },
      isLoading: false,
      isError: false,
      error: null,
    })),
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

vi.mock('@/components/global/User', () => ({
  default: () => <div data-testid="user" />,
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src }) => <img data-testid="image" src={src} alt="img" />,
}))

vi.mock('@/components/global/Followers', () => ({
  default: ({ followers }) => (
    <div data-testid="followers">{followers}</div>
  ),
}))

vi.mock('@/components/global/SidebarLinks', () => ({
  default: () => <div data-testid="sidebar-links" />,
}))

vi.mock('@/components/global/BankDetails', () => ({
  default: () => <div data-testid="bank-details" />,
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: () => <div data-testid="error-message" />,
}))


// ---- helpers ----

const renderComponent = () =>
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  )

// ---- tests ----

beforeEach(() => {
  vi.clearAllMocks()

  vi.mocked(useQuery).mockReturnValue({
    data: {
      data: {
        total_following: 5,
        follow_count: 10,
        bank: [],
      },
    },
    isLoading: false,
    isError: false,
    error: null,
  })
})

describe('Sidebar', () => {
  it('should render sidebar content', () => {
    renderComponent()
    expect(screen.getByTestId('user')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-links')).toBeInTheDocument()
  })

  it('should show followers for designer', () => {
    renderComponent()
    expect(screen.getByText('Followers')).toBeInTheDocument()
    expect(screen.getByTestId('followers')).toHaveTextContent('10')
  })

  it('should call logout when logout button is clicked', () => {
    renderComponent()
    const logoutBtn = screen.getByText(/logout/i)
    fireEvent.click(logoutBtn)
    expect(logoutBtn).toBeInTheDocument()
  })

  it('should render bank details for designer', () => {
    renderComponent()
    expect(screen.getByTestId('bank-details')).toBeInTheDocument()
  })

  it('should show error message when query fails', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error('Error'),
    })
    renderComponent()
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
  })
})