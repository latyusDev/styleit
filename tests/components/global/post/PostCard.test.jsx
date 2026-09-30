import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import PostCard from '@/components/global/post/PostCard'
import { useComment } from '@/store/useComment'
import { usePost } from '@/store/usePost'
import CustomQueryClientProvider from '@/components/global/CustomQueryClientProvider'
import { useAuth } from '@/store/useAuth'

// ---------------- mocks ----------------

const mockInvalidateQueries = vi.fn()
const mockSetQueryData = vi.fn()
const mockCancelQueries = vi.fn()
const mockGetQueryData = vi.fn()
const mockFollowMutate = vi.fn()
const mockUnFollowMutate = vi.fn()
const mockCommentMutate = vi.fn()
const mockDeleteMutate = vi.fn()

const mockSetComment = vi.fn()
const mockSetIsCommentOpened = vi.fn()
const mockSetShowReport = vi.fn()
const mockSetIsShared = vi.fn()
const mockStoreComment = vi.fn()
const mockDeletePost = vi.fn()
const mockLikePost = vi.fn()
const mockStoreFollow = vi.fn()
const mockStoreUnFollow = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(() => ({ pathname: '/trending' })),
    useNavigate: vi.fn(() => vi.fn()),
  }
})

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(() => ({ user: { role: 'client', profile_pic: null } })),
}))

vi.mock('@/store/usePost', () => ({
  usePost: vi.fn(() => ({
    showReport: false,
    setShowReport: mockSetShowReport,
    isShared: false,
    setIsShared: mockSetIsShared,
    deletePost: mockDeletePost,
    likePost: mockLikePost,
  })),
}))

vi.mock('@/store/useComment', () => ({
  useComment: vi.fn(() => ({
    setComment: mockSetComment,
    isCommentOpened: false,
    setIsCommentOpened: mockSetIsCommentOpened,
    storeComment: mockStoreComment,
    comment: '',
  })),
}))

vi.mock('@/store/useCreator', () => ({
  useCreatorStore: vi.fn(() => ({
    storeFollow: mockStoreFollow,
    storeUnFollow: mockStoreUnFollow,
  })),
}))

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useQueryClient: vi.fn(() => ({
      invalidateQueries: mockInvalidateQueries,
      setQueryData: mockSetQueryData,
      cancelQueries: mockCancelQueries,
      getQueryData: mockGetQueryData,
    })),
    useMutation: vi.fn((options) => {
      let mutate = vi.fn()
      if (options?.mutationFn === mockStoreFollow) mutate = mockFollowMutate
      if (options?.mutationFn === mockStoreUnFollow) mutate = mockUnFollowMutate
      if (options?.mutationFn === mockStoreComment) mutate = mockCommentMutate
      if (options?.mutationFn === mockDeletePost) mutate = mockDeleteMutate
      return { mutate, isPending: false }
    }),
  }
})

vi.mock('@/components/global/User', () => ({
  default: ({ userProps }) => (
    <div data-testid="user">{userProps?.name?.fullName}</div>
  ),
}))

vi.mock('@/components/global/Indicator', () => ({
  default: (props) => <span {...props} />,
}))

vi.mock('@/components/global/Image', () => ({
  default: (props) => <img {...props} />,
}))

vi.mock('@/components/global/post/PostTitle', () => ({
  default: ({ title }) => <h2 data-testid="post-title">{title}</h2>,
}))

vi.mock('@/components/global/post/PostDescription', () => ({
  default: ({ description }) => <p data-testid="post-description">{description}</p>,
}))

vi.mock('@/components/global/imageGallery/ImageGallery', () => ({
  default: () => <div data-testid="image-gallery" />,
}))

// FIXED: mock now exposes a share trigger button so we can set local isShared state
vi.mock('@/components/global/post/PostActivities', () => ({
  default: ({ share }) => (
    <div data-testid="post-activities">
      <button data-testid="trigger-share" onClick={() => share.setIsShared(true)}>
        Share
      </button>
    </div>
  ),
}))

vi.mock('@/components/global/post/CreatorPostActivities', () => ({
  default: () => <div data-testid="creator-post-activities" />,
}))

vi.mock('@/components/global/post/PostFollowButton', () => ({
  default: () => <div data-testid="follow-button" />,
}))

vi.mock('@/components/global/post/SharePostContainer', () => ({
  default: () => <div data-testid="share-post-container" />,
}))

vi.mock('@/components/global/Report', () => ({
  default: () => <div data-testid="report" />,
}))

vi.mock('@/components/admin/AdminTrendingModal', () => ({
  default: () => <div data-testid="admin-trending-modal" />,
}))

vi.mock('sonner', () => ({ toast: vi.fn() }))

// ---------------- data ----------------

const mockPost = {
  id: 1,
  postId: 1,
  postTitle: 'Test Post Title',
  title: 'Test Post Title',
  content: 'Test post content',
  body: 'Test post content',
  img: [],
  comments: [],
  creator: {
    firstName: 'Ariky',
    creator_pic: null,
  },
}

// ---------------- helper ----------------

const renderComponent = (props = {}) =>
  render(
    <CustomQueryClientProvider>
        <MemoryRouter>
            <PostCard post={mockPost} {...props} />
        </MemoryRouter>
    </CustomQueryClientProvider>
  )

// ---------------- tests ----------------

beforeEach(() => {
  vi.clearAllMocks()
})

describe('PostCard', () => {
  describe('Rendering', () => {
    it('should render post title', () => {
      renderComponent()
      expect(screen.getByTestId('post-title')).toHaveTextContent('Test Post Title')
    })

    it('should render post description', () => {
      renderComponent()
      expect(screen.getByTestId('post-description')).toHaveTextContent('Test post content')
    })

    it('should render comment input', () => {
      renderComponent()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should render options icon', () => {
      renderComponent()
      expect(screen.getByTestId('options-icon')).toBeInTheDocument()
    })

    it('should not render image gallery when post has no images', () => {
      renderComponent()
      expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument()
    })

    it('should render image gallery when post has images', () => {
      renderComponent({ post: { ...mockPost, img: ['img1.jpg'] } })
      expect(screen.getByTestId('image-gallery')).toBeInTheDocument()
    })
  })

  describe('Trending page', () => {
    it('should render PostActivities on trending page', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/trending' })
      renderComponent()
      expect(screen.getByTestId('post-activities')).toBeInTheDocument()
      expect(screen.queryByTestId('creator-post-activities')).not.toBeInTheDocument()
    })

    it('should render follow button for client on trending page', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/trending' })
      renderComponent()
      expect(screen.getByTestId('follow-button')).toBeInTheDocument()
    })

    it('should not render follow button on non-trending page', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/profile' })
      renderComponent()
      expect(screen.queryByTestId('follow-button')).not.toBeInTheDocument()
    })
  })

  describe('Non-trending page', () => {
    it('should render CreatorPostActivities on non-trending page', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/profile' })
      renderComponent()
      expect(screen.getByTestId('creator-post-activities')).toBeInTheDocument()
      expect(screen.queryByTestId('post-activities')).not.toBeInTheDocument()
    })
  })

  describe('Options menu', () => {
    it('should show options menu when options icon is clicked', () => {
      renderComponent()
      expect(screen.queryByTestId('options')).not.toBeInTheDocument()
      fireEvent.click(screen.getByTestId('options-icon'))
      expect(screen.getByTestId('options')).toBeInTheDocument()
    })

    it('should show delete option on non-trending page', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/profile' })
      renderComponent()
      fireEvent.click(screen.getByTestId('options-icon'))
      expect(screen.getByText(/delete/i)).toBeInTheDocument()
    })

    it('should not show delete option on trending page', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/trending' })
      renderComponent()
      fireEvent.click(screen.getByTestId('options-icon'))
      expect(screen.queryByText(/delete/i)).not.toBeInTheDocument()
    })

    it('should show report option in options menu', () => {
      renderComponent()
      fireEvent.click(screen.getByTestId('options-icon'))
      expect(screen.getByText(/report/i)).toBeInTheDocument()
    })

    it('should call setShowReport when report is clicked', () => {
      renderComponent()
      fireEvent.click(screen.getByTestId('options-icon'))
      fireEvent.click(screen.getByText(/report/i))
      expect(mockSetShowReport).toHaveBeenCalledWith(true)
    })

    it('should call deleteMutation when delete is clicked', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/profile' })
      renderComponent()
      fireEvent.click(screen.getByTestId('options-icon'))
      fireEvent.click(screen.getByText(/delete/i))
      expect(mockDeleteMutate).toHaveBeenCalledWith(mockPost.postId)
    })
  })

  describe('Comment input', () => {
    it('should call setComment when typing in comment input', () => {
      renderComponent()
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'nice post' },
      })
      expect(mockSetComment).toHaveBeenCalled()
    })

    it('should disable send button when comment is empty', () => {
      renderComponent()
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should call handleComment when Enter is pressed with a comment', () => {
      
      useComment.mockReturnValue({
        setComment: mockSetComment,
        isCommentOpened: false,
        setIsCommentOpened: mockSetIsCommentOpened,
        storeComment: mockStoreComment,
        comment: 'nice post',
      })
      renderComponent()
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' })
      expect(mockCommentMutate).toHaveBeenCalledWith({
        postId: mockPost.id,
        commentText: 'nice post',
      })
    })
  })

  describe('Admin role', () => {
    it('should show admin modal instead of report options for admin', async () => {
      useAuth.mockReturnValue({ user: { role: 'admin', profile_pic: null } })
      renderComponent()
      fireEvent.click(screen.getByTestId('options-icon'))
      await waitFor(() => {
        expect(screen.getByTestId('admin-trending-modal')).toBeInTheDocument()
      })
    })

    it('should not show options menu for admin when options icon is clicked', () => {
      useAuth.mockReturnValue({ user: { role: 'admin', profile_pic: null } })
      renderComponent()
      fireEvent.click(screen.getByTestId('options-icon'))
      expect(screen.queryByTestId('options')).not.toBeInTheDocument()
    })
  })

  describe('Report component', () => {
    it('should render Report component when showReport is true', async () => {
    usePost.mockReturnValue({
        showReport: true,
        setShowReport: mockSetShowReport,
        isShared: false,
        setIsShared: mockSetIsShared,
        deletePost: mockDeletePost,
        likePost: mockLikePost,
    })
    renderComponent()
    await waitFor(() => {
        expect(screen.getByTestId('report')).toBeInTheDocument()
    })
    })
  })

  describe('Share post', () => {
    it('should render SharePostContainer when isShared is true', async () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/trending' })
      renderComponent()

      fireEvent.click(screen.getByTestId('trigger-share'))

      await waitFor(() => {
        expect(screen.getByTestId('share-post-container')).toBeInTheDocument()
      })
    })
  })
})