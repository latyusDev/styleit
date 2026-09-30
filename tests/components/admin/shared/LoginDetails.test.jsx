import React from 'react'
import { render,screen } from '@testing-library/react'
import { describe,expect,it, vi} from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { loginDetails } from '@/static/adminData'
import LoginDetails from '@/components/admin/shared/LoginDetails'


vi.mock('@/components/global/loaders/ProfileLoaders', () => ({
  default: () => <div data-testid="profile-loader" />,
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div data-testid="error-message">{error.message}</div>,
}))

const creator = {
  daily_logins: 5,
  weekly_logins: 20,
  monthly_logins: 80,
}

describe('LoginDetails', () => {
  it('should show loader when loading', () => {
    render(
    <MemoryRouter>
        <LoginDetails isLoading={true} />)
        </MemoryRouter>
        )
    expect(screen.getByTestId('profile-loader')).toBeInTheDocument()
  })

  it('should show error message when request fails', () => {
    const error = new Error('Failed to fetch')
    render(
    <MemoryRouter>
        <LoginDetails isError={true} error={error} />)
        </MemoryRouter>
        )
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
    expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch')
  })

  it('should render login details when data is available', () => {
    render(
    <MemoryRouter>
        <LoginDetails isLoading={false} isError={false} creator={creator} />)
        </MemoryRouter>
        )
    expect(screen.getByTestId('login-details')).toBeInTheDocument()
  })

  it('should display correct daily,weekly and monthly login count', () => {
    render(
    <MemoryRouter>
        <LoginDetails isLoading={false} isError={false} creator={creator} />)
        </MemoryRouter>
        )
    expect(screen.getByTestId('daily-login')).toHaveTextContent('5')
    expect(screen.getByTestId('weekly-login')).toHaveTextContent('20')
    expect(screen.getByTestId('monthly-login')).toHaveTextContent('80')
  })

  it('should show daily, weekly, monthly labels', () => {
    render(
    <MemoryRouter>
        <LoginDetails isLoading={false} isError={false} creator={creator} />)
        </MemoryRouter>
        )
    expect(screen.getByTestId('daily')).toBeInTheDocument()
    expect(screen.getByTestId('weekly')).toBeInTheDocument()
    expect(screen.getByTestId('monthly')).toBeInTheDocument()
  })
})