import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import Cookies from 'js-cookie'
import Comment from '@/components/global/comment/Comment'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('axios')
vi.mock('js-cookie', () => ({ default: { get: vi.fn(() => 'mock-token') } }))

vi.mock('@/components/global/Image', () => ({
  default: ({ src, className, onClick }) => (
    <img src={src} className={className} onClick={onClick} data-testid="image" alt="img" />
  ),
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ onChange, type, className }) => (
    <input
      data-testid="reply-input"
      type={type}
      className={className}
      onChange={onChange}
    />
  ),
}))

vi.mock('@/images/bobby.png', () => ({ default: '/bobby.png' }))
vi.mock('@/images/send.png', () => ({ default: '/send.png' }))

// ── Fixtures ───────────────────────────────────────────────────────────────

const baseComment = {
  comment_id: 'cm-001',
  com_id: 'cm-001',
  client_username: 'johndoe',
  body: 'This is a comment',
  client_reply: null,
}

const mockPost = { id: 'post-001' }
const mockReplies = [
  { id: 'rep-001', body: 'First reply' },
  { id: 'rep-002', body: 'Second reply' },
]

const setup = (props = {}) => {
  const defaults = {
    comment: baseComment,
    commentId: null,
    setCommentId: vi.fn(),
    commentReplies: [],
    post: mockPost,
  }
  return {
    setCommentId: defaults.setCommentId,
    ...render(<Comment {...defaults} {...props} />),
  }
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Comment', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Rendering —

  describe('rendering', () => {
    it('shows the commenter username', () => {
      setup()
      expect(screen.getByText('johndoe')).toBeInTheDocument()
    })

    it('shows the comment body', () => {
      setup()
      expect(screen.getByText('This is a comment')).toBeInTheDocument()
    })

    it('shows reply count', () => {
      setup({ commentReplies: mockReplies })
      expect(screen.getByText('2 replies')).toBeInTheDocument()
    })

    it('shows 0 replies when no replies', () => {
      setup()
      expect(screen.getByText('0 replies')).toBeInTheDocument()
    })

    it('renders the reply button', () => {
      setup()
      expect(screen.getByRole('button', { name: 'reply' })).toBeInTheDocument()
    })

    it('renders profile image', () => {
      setup()
      expect(screen.getAllByTestId('image').length).toBeGreaterThan(0)
    })
  })

  // — client_reply —

  describe('client_reply', () => {
    it('shows client_reply bubble when present', () => {
      setup({ comment: { ...baseComment, client_reply: 'My reply here' } })
      expect(screen.getByText('My reply here')).toBeInTheDocument()
    })

    it('does not show client_reply bubble when null', () => {
      setup()
      expect(screen.queryByText('My reply here')).not.toBeInTheDocument()
    })
  })

  // — Reply button —

  describe('reply button', () => {
    it('calls setCommentId with comment_id when reply is clicked', () => {
      const { setCommentId } = setup()
      fireEvent.click(screen.getByRole('button', { name: 'reply' }))
      expect(setCommentId).toHaveBeenCalledWith('cm-001')
    })
  })

  // — Reply input (shown when commentId matches) —

  describe('reply input', () => {
    it('shows reply input when commentId matches comment_id', () => {
      setup({ commentId: 'cm-001' })
      expect(screen.getByTestId('reply-input')).toBeInTheDocument()
    })

    it('does not show reply input when commentId does not match', () => {
      setup({ commentId: 'other-id' })
      expect(screen.queryByTestId('reply-input')).not.toBeInTheDocument()
    })

    it('does not show reply input when commentId is null', () => {
      setup({ commentId: null })
      expect(screen.queryByTestId('reply-input')).not.toBeInTheDocument()
    })
  })

  // — Expanded replies —

  describe('expanded replies', () => {
    it('shows replies when commentId matches and replies exist', () => {
      setup({ commentId: 'cm-001', commentReplies: mockReplies })
      expect(screen.getByText('First reply', { exact: false })).toBeInTheDocument()
      expect(screen.getByText('Second reply', { exact: false })).toBeInTheDocument()
    })

    it('does not show replies when commentId does not match', () => {
      setup({ commentId: 'other-id', commentReplies: mockReplies })
      expect(screen.queryByText('First reply', { exact: false })).not.toBeInTheDocument()
    })

    it('does not show replies when commentReplies is empty', () => {
      setup({ commentId: 'cm-001', commentReplies: [] })
      expect(screen.queryByText('First reply', { exact: false })).not.toBeInTheDocument()
    })
  })

  // — handleReply (send button) —

  describe('handleReply', () => {
    it('calls axios.post with correct url and token when send is clicked', async () => {
      axios.post.mockResolvedValue({ data: { success: true } })

      setup({ commentId: 'cm-001' })

      // Type a reply
      fireEvent.change(screen.getByTestId('reply-input'), {
        target: { value: 'Hello!' },
      })

      // Click the send image button (last image rendered is the send icon)
      const images = screen.getAllByTestId('image')
      fireEvent.click(images[images.length - 1])

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `reply/${mockPost.id}/${baseComment.com_id}/`,
          { comrep: 'Hello!' },
          expect.objectContaining({
            headers: expect.objectContaining({
              Authorization: 'Bearer mock-token',
            }),
          })
        )
      })
    })

    it('reads the token from cookies when sending', async () => {
      axios.post.mockResolvedValue({ data: {} })
      setup({ commentId: 'cm-001' })

      const images = screen.getAllByTestId('image')
      fireEvent.click(images[images.length - 1])

      await waitFor(() => {
        expect(Cookies.get).toHaveBeenCalledWith('token')
      })
    })
  })
})