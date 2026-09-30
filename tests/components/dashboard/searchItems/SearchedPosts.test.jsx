import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import SearchedPosts from '@/components/dashboard/searchItems/SearchedPosts'

// --- Mocks ---

vi.mock('@/store/usePost', () => ({
  usePost: vi.fn(() => ({
    isShared: false,
    setIsShared: vi.fn(),
    likePost: vi.fn()
  }))
}))

vi.mock('@/store/global/useGlobal', () => ({
  useGlobalStore: vi.fn(() => ({
    setSearchModal: vi.fn()
  }))
}))

vi.mock('react-router-dom', () => ({
  Link: ({ children, to, onClick }) => (
    <a href={to} onClick={onClick}>{children}</a>
  )
}))

vi.mock('@/components/global/User', () => ({
  default: ({ userProps }) => (
    <div data-testid="user-component">
      {userProps?.name?.userProfile?.fname} {userProps?.name?.userProfile?.lname}
    </div>
  )
}))

vi.mock('@/components/global/Indicator', () => ({
  default: ({ className }) => <span className={className} data-testid="indicator" />
}))

vi.mock('@/components/global/post/PostTitle', () => ({
  default: ({ title }) => <h2 data-testid="post-title">{title}</h2>
}))

vi.mock('@/components/global/post/PostDescription', () => ({
  default: ({ description }) => <p data-testid="post-description">{description}</p>
}))

vi.mock('@/components/global/post/PostActivities', () => ({
  default: () => <div data-testid="post-activities" />
}))

vi.mock('@/components/global/post/SharePostContainer', () => ({
  default: ({ post }) => <div data-testid="share-post-container">{post?.id}</div>
}))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className }) => (
    <img src={src} className={className} alt="" data-testid="post-image" />
  )
}))

vi.mock('@/components/global/imageGallery/ImageGallery', () => ({
  default: ({ _images }) => <div data-testid="image-gallery">{_images?.length}</div>
}))

vi.mock('@/components/global/loaders/TrendingPostLoader', () => ({
  default: () => <div data-testid="trending-post-loader" />
}))

vi.mock('@/components/global/ErrorMessage', () => ({
  default: ({ error }) => <div data-testid="error-message">{error?.message}</div>
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props) => <input {...props} />
}))

vi.mock('../../../images/profile_i.png', () => ({ default: '/profile_i.png' }))
vi.mock('../../../images/send.png', () => ({ default: '/send.png' }))

// --- Fixtures ---

const mockPosts = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    postTitle: 'First Post',
    content: 'First post content',
    image: [],
    Comment_count: 3,
    status: 'actived'
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    postTitle: 'Second Post',
    content: 'Second post content',
    image: ['/img1.png', '/img2.png'],
    Comment_count: 5,
    status: 'actived'
  }
]

const defaultError = { isPostError: false, postError: null }

// --- Tests ---

describe('SearchedPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Loading state
  describe('loading state', () => {
    it('renders the loader while loading', () => {
      render(<SearchedPosts posts={[]} error={defaultError} isLoading={true} />)
      expect(screen.getByTestId('trending-post-loader')).toBeInTheDocument()
    })

    it('does not render posts while loading', () => {
      render(<SearchedPosts posts={mockPosts} error={defaultError} isLoading={true} />)
      expect(screen.queryByTestId('post-title')).not.toBeInTheDocument()
    })

    it('does not render error message while loading', () => {
      render(<SearchedPosts posts={[]} error={defaultError} isLoading={true} />)
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  // Error state
  describe('error state', () => {
    it('renders the error message when isPostError is true', () => {
      const error = { isPostError: true, postError: { message: 'Failed to load posts' } }
      render(<SearchedPosts posts={[]} error={error} isLoading={false} />)
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('displays the correct error text', () => {
      const error = { isPostError: true, postError: { message: 'Network error' } }
      render(<SearchedPosts posts={[]} error={error} isLoading={false} />)
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })

    it('does not render posts on error', () => {
      const error = { isPostError: true, postError: { message: 'err' } }
      render(<SearchedPosts posts={mockPosts} error={error} isLoading={false} />)
      expect(screen.queryByTestId('post-title')).not.toBeInTheDocument()
    })
  })

  // Empty state
  describe('empty state', () => {
    it('renders no posts found when posts is empty and search data exists', () => {
      render(
        <SearchedPosts
          posts={[]}
          error={defaultError}
          isLoading={false}
          userDashboardSearchData="something"
        />
      )
      expect(screen.getByText('No posts found')).toBeInTheDocument()
    })

    it('does not render no posts found when userDashboardSearchData is absent', () => {
      render(<SearchedPosts posts={[]} error={defaultError} isLoading={false} />)
      expect(screen.queryByText('No posts found')).not.toBeInTheDocument()
    })
  })

  // Success state
  describe('success state', () => {
    beforeEach(() => {
      render(<SearchedPosts posts={mockPosts} error={defaultError} isLoading={false} />)
    })

    it('renders all posts', () => {
      expect(screen.getAllByTestId('post-title')).toHaveLength(mockPosts.length)
    })

    it('renders post titles', () => {
      expect(screen.getByText('First Post')).toBeInTheDocument()
      expect(screen.getByText('Second Post')).toBeInTheDocument()
    })

    it('renders post descriptions', () => {
      expect(screen.getByText('First post content')).toBeInTheDocument()
      expect(screen.getByText('Second post content')).toBeInTheDocument()
    })

    it('renders user components for each post', () => {
      expect(screen.getAllByTestId('user-component')).toHaveLength(mockPosts.length)
    })

    it('renders post activities for each post', () => {
      expect(screen.getAllByTestId('post-activities')).toHaveLength(mockPosts.length)
    })

    it('renders comment input for each post', () => {
      expect(screen.getAllByRole('textbox')).toHaveLength(mockPosts.length)
    })

    it('does not render loader', () => {
      expect(screen.queryByTestId('trending-post-loader')).not.toBeInTheDocument()
    })

    it('does not render error message', () => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  // Image gallery
  describe('image gallery', () => {
    it('renders image gallery when post has images', () => {
      render(<SearchedPosts posts={mockPosts} error={defaultError} isLoading={false} />)
      expect(screen.getByTestId('image-gallery')).toBeInTheDocument()
    })

    it('does not render image gallery when post has no images', () => {
      const postsWithNoImages = [{ ...mockPosts[0], image: [] }]
      render(<SearchedPosts posts={postsWithNoImages} error={defaultError} isLoading={false} />)
      expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument()
    })
  })

  // Share post
  describe('share post', () => {
    it('does not render share container when isShared is false', () => {
      render(<SearchedPosts posts={mockPosts} error={defaultError} isLoading={false} />)
      expect(screen.queryByTestId('share-post-container')).not.toBeInTheDocument()
    })

   
  })

  // Link navigation
  describe('post links', () => {
    it('renders a link to each post', () => {
      render(<SearchedPosts posts={mockPosts} error={defaultError} isLoading={false} />)
      const links = screen.getAllByRole('link')
      expect(links.some(link => link.getAttribute('href') === '/trending/1')).toBe(true)
      expect(links.some(link => link.getAttribute('href') === '/trending/2')).toBe(true)
    })
  })
})