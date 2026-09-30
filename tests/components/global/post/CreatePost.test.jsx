import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CreatePost from '@/components/global/post/CreatePost'
import { useAuth } from '@/store/useAuth'
import { useGlobalStore } from '@/store/global/useGlobal'

// ---------------- mocks ----------------

const mockSetPostModal = vi.fn()

vi.mock('@/store/global/useGlobal', () => ({
  useGlobalStore: vi.fn(),
}))

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(),
}))

vi.mock('@/components/global/Image', () => ({
  default: (props) => <img {...props} />,
}))

vi.mock('@/components/global/Indicator', () => ({
  default: () => <span data-testid="indicator" />,
}))

vi.mock('@/components/dashboard/profile/creator/PostModal', () => ({
  default: () => <div data-testid="post-modal" />,
}))

// ---------------- setup ----------------

beforeEach(() => {
  vi.clearAllMocks()

  useGlobalStore.mockReturnValue({
    postModal: false,
    setPostModal: mockSetPostModal,
  })

  useAuth.mockReturnValue({ user: { profile_pic: null } })
})

// ---------------- helpers ----------------

const renderComponent = () => render(<CreatePost />)

// ---------------- tests ----------------

describe('CreatePost', () => {
  it('should render create post text', () => {
    renderComponent()
    expect(screen.getByText(/create post/i)).toBeInTheDocument()
  })

  it('should render post button', () => {
    renderComponent()
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument()
  })

  it('should call setPostModal when container is clicked', () => {
    renderComponent()
    fireEvent.click(screen.getByText(/create post/i))
    expect(mockSetPostModal).toHaveBeenCalled()
  })

  it('should not show PostModal when postModal is false', () => {
    renderComponent()
    expect(screen.queryByTestId('post-modal')).not.toBeInTheDocument()
  })

  it('should show PostModal when postModal is true', () => {
    useGlobalStore.mockReturnValue({
      postModal: true,
      setPostModal: mockSetPostModal,
    })
    renderComponent()
    expect(screen.getByTestId('post-modal')).toBeInTheDocument()
  })

  it('should render user profile picture when available', () => {
    useAuth.mockReturnValue({ user: { profile_pic: 'https://example.com/pic.jpg' } })
    renderComponent()
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('src', 'https://example.com/pic.jpg')
  })

  it('should render fallback profile image when user has no profile pic', () => {
    renderComponent()
    const images = screen.getAllByRole('img')
    expect(images[0]).toBeInTheDocument()
  })
})