import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import CreatorDetails from '@/components/dashboard/profile/creator/CreatorDetails'
import { ViewDescriptionModal } from '@/components/dashboard/profile/creator/ViewDescriptionModal'
import { AddDescriptionModal } from '@/components/dashboard/profile/creator/AddDescriptionModal'

// ---- mocks ----

// router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Link: ({ children }) => <a>{children}</a>,
  }
})

// auth store
vi.mock('@/store/useAuth', () => ({
  useAuth: () => ({
    user: { profile_pic: null },
  }),
}))

// loader
vi.mock('@/components/global/loaders/ProfileLoaders', () => ({
  default: () => <div data-testid="loader" />,
}))

// error
vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div>{error.message}</div>,
}))

// image
vi.mock('@/components/global/Image', () => ({
  default: ({ src, ...props }) => <img src={src} {...props} />,
}))

// indicator
vi.mock('@/components/global/Indicator', () => ({
  default: () => <div data-testid="indicator" />,
}))

// modals
vi.mock('@/components/dashboard/profile/creator/AddDescriptionModal', () => ({
  AddDescriptionModal: ({ setIsModalOpen }) => (
    <div data-testid="add-modal">
      <button onClick={() => setIsModalOpen(false)}>close</button>
    </div>
  ),
}))


vi.mock('@/components/dashboard/profile/creator/ViewDescriptionModal', () => ({
  ViewDescriptionModal: ({ description }) => (
    <div data-testid="view-modal">{description}</div>
  ),
}))

// ---- test data ----

const creatorData = {
  creator: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@email.com',
    phone: '08012345678',
    address: 'Lagos',
    lga: [{ name: 'Ikeja' }],
    bio: '',
  },
  isLoading: false,
  isError: false,
  error: null,
}

const renderComponent = (props) =>
  render(
    <MemoryRouter>
      <CreatorDetails {...props} />
    </MemoryRouter>
  )

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CreatorDetails', () => {
  it('should show loader when loading', () => {
    renderComponent({ creatorDetails: { isLoading: true } })

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should show error message', () => {
    renderComponent({
      creatorDetails: {
        isLoading: false,
        isError: true,
        error: new Error('Failed'),
      },
    })

    expect(screen.getByText(/failed/i)).toBeInTheDocument()
  })

  it('should render creator details', () => {
    renderComponent({ creatorDetails: creatorData })

    expect(screen.getByTestId('first-name')).toBeInTheDocument()
    expect(screen.getByTestId('last-name')).toBeInTheDocument()
    expect(screen.getByText(/lagos/i)).toBeInTheDocument()
  })

  it('should show empty description state', () => {
    renderComponent({ creatorDetails: creatorData })

    expect(screen.getByText(/no description yet/i)).toBeInTheDocument()
    expect(screen.getByText(/add description/i)).toBeInTheDocument()
  })

  it('should open add description modal when button clicked', () => {
    renderComponent({ creatorDetails: creatorData })

    fireEvent.click(screen.getByText(/add description/i))

    expect(screen.getByTestId('add-modal')).toBeInTheDocument()
  })

  it('should show truncated description and see more button', () => {
    const longText = 'a'.repeat(500)

    renderComponent({
      creatorDetails: {
        ...creatorData,
        creator: { ...creatorData.creator, bio: longText },
      },
    })

    expect(screen.getByText(/see more/i)).toBeInTheDocument()
  })

  it('should open view modal when see more is clicked', () => {
    const longText = 'a'.repeat(500)

    renderComponent({
      creatorDetails: {
        ...creatorData,
        creator: { ...creatorData.creator, bio: longText },
      },
    })

    fireEvent.click(screen.getByText(/see more/i))

    expect(screen.getByTestId('view-modal')).toBeInTheDocument()
  })
})