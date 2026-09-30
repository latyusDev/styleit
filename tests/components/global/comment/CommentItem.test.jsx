import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useComment } from '@/store/useComment'
import { useAuth } from '@/store/useAuth'
import { toast } from 'sonner'
import CommentItem from '@/components/global/comment/CommentItem'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}))

vi.mock('@/store/useComment', () => ({
  useComment: vi.fn(),
}))

vi.mock('@/store/useAuth', () => ({
  useAuth: vi.fn(),
}))

vi.mock('@/store/admin/useAdmin', () => ({
  useAdminStore: vi.fn(),
}))

vi.mock('sonner', () => ({ toast: vi.fn() }))

vi.mock('lucide-react', () => ({
  Ban:          () => <svg data-testid="ban-icon" />,
  Eye:          () => <svg data-testid="eye-icon" />,
  Loader2:      ({ className }) => <span data-testid="loader" className={className} />,
  MessageCircle:() => <svg data-testid="msg-icon" />,
  MoreHorizontal:({ onClick, className }) => (
    <button data-testid="more-btn" onClick={onClick} className={className} />
  ),
  Send:         () => <svg data-testid="send-icon" />,
  Trash2:       () => <svg data-testid="trash-icon" />,
  Trash2Icon:   () => <svg data-testid="trash2-icon" />,
  X:            () => <span>X</span>,
}))


vi.mock('@/components/global/comment/RepliesModal', () => ({
  default: ({ isOpen, onClose, replies }) =>
    isOpen ? (
      <div data-testid="replies-modal">
        <button onClick={onClose} data-testid="close-modal">close</button>
        {replies.map((r) => <div key={r.com_id}>{r.body}</div>)}
      </div>
    ) : null,
}))

vi.mock('@/components/global/post/PostDescription', () => ({
  default: ({ description }) => <p data-testid="post-description">{description}</p>,
}))

// roles used by the component
vi.mock('@/pages/ViewTrendingPost', () => ({
  roles: ['admin', 'superadmin'],
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const replyMutateFn  = vi.fn()
const banMutateFn    = vi.fn()
const deleteMutateFn = vi.fn()
const invalidateQueries = vi.fn()

const baseComment = {
  com_id: 'cm-001',
  client_username: 'johndoe',
  body: 'Test comment body',
  children: [],
  reply_date: '2024-01-15T10:00:00Z',
  delete: null,
  suspend: null,
}

// ── Setup ──────────────────────────────────────────────────────────────────

/**
 * Component calls useMutation 3 times per render:
 *   1st → reply mutation
 *   2nd → ban mutation
 *   3rd → delete mutation
 * Use mockImplementation with a counter so re-renders never get undefined.
 */
const setupMutations = ({ isReplyPending = false, isBanPending = false, isDeleting = false } = {}) => {
  let callCount = 0
  useMutation.mockImplementation(({ onSuccess, onSettled, onError } = {}) => {
    callCount++
    const call = callCount % 3
    if (call === 1) return { mutate: replyMutateFn,  isPending: isReplyPending, _onSettled: onSettled }
    if (call === 2) return { mutate: banMutateFn,    isPending: isBanPending,   _onSuccess: onSuccess }
    return              { mutate: deleteMutateFn, isPending: isDeleting,     _onSuccess: onSuccess }
  })
}

const setup = (props = {}, { role = 'user', mutationOpts = {} } = {}) => {
  useParams.mockReturnValue({ id: 'post-001' })
  useAuth.mockReturnValue({ user: { role } })
  useComment.mockReturnValue({
    storeReply:    vi.fn(),
    banComment:    vi.fn(),
    deleteComment: vi.fn(),
  })
  useQueryClient.mockReturnValue({ invalidateQueries })
  setupMutations(mutationOpts)

  const setActiveReplyId = vi.fn()
  const defaults = {
    comment: baseComment,
    depth: 0,
    activeReplyId: null,
    setActiveReplyId,
  }

  render(<CommentItem {...defaults} {...props} setActiveReplyId={props.setActiveReplyId ?? setActiveReplyId} />)
  return { setActiveReplyId }
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('CommentItem', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Rendering —

  describe('rendering', () => {
    it('shows the commenter username', () => {
      setup()
      expect(screen.getByText('johndoe')).toBeInTheDocument()
    })

    it('shows the comment body via PostDescription', () => {
      setup()
      expect(screen.getByTestId('post-description')).toHaveTextContent('Test comment body')
    })

    it('shows avatar initials from username', () => {
      setup()
      expect(screen.getByText('JO')).toBeInTheDocument()
    })

    it('uses creator_businessname initials when username is absent', () => {
      setup({ comment: { ...baseComment, client_username: null, creator_businessname: 'TopStyle' } })
      expect(screen.getByText('TO')).toBeInTheDocument()
    })

    it('falls back to "US" when no username or businessname', () => {
      setup({ comment: { ...baseComment, client_username: null, creator_businessname: null } })
      expect(screen.getByText('US')).toBeInTheDocument()
    })

    it('renders the Reply button', () => {
      setup()
      expect(screen.getByText('Reply')).toBeInTheDocument()
    })

    it('shows the reply_date', () => {
      setup()
      // formatDistanceToNow output like "about 1 year ago"
      expect(screen.getByText(/ago/)).toBeInTheDocument()
    })
  })

  // — Deleted / suspended badges —

  describe('status badges', () => {
    it('shows "deleted" badge when comment.delete is "deleted"', () => {
      setup({ comment: { ...baseComment, delete: 'deleted' } })
      expect(screen.getByText('deleted')).toBeInTheDocument()
    })

    it('does not show "deleted" badge when not deleted', () => {
      setup()
      expect(screen.queryByText('deleted')).not.toBeInTheDocument()
    })

    it('shows "suspended" badge when comment.suspend is "suspended"', () => {
      setup({ comment: { ...baseComment, suspend: 'suspended' } })
      expect(screen.getByText('suspended')).toBeInTheDocument()
    })

    it('does not show "suspended" badge when not suspended', () => {
      setup()
      expect(screen.queryByText('suspended')).not.toBeInTheDocument()
    })
  })

  // — Admin action menu —

  describe('admin action menu', () => {
    it('shows MoreHorizontal button for admin users', () => {
      setup({}, { role: 'admin' })
      expect(screen.getByTestId('more-btn')).toBeInTheDocument()
    })

    it('hides MoreHorizontal button for non-admin users', () => {
      setup({}, { role: 'client' })
      expect(screen.queryByTestId('more-btn')).not.toBeInTheDocument()
    })

    it('shows delete/ban buttons when MoreHorizontal is clicked', () => {
      setup({}, { role: 'admin' })
      fireEvent.click(screen.getByTestId('more-btn'))
      expect(screen.getByText('Delete')).toBeInTheDocument()
      expect(screen.getByText('Ban')).toBeInTheDocument()
    })

    it('hides the menu when MoreHorizontal is clicked again', () => {
      setup({}, { role: 'admin' })
      fireEvent.click(screen.getByTestId('more-btn'))
      fireEvent.click(screen.getByTestId('more-btn'))
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })

    it('calls deleteMutate when Delete is clicked', () => {
      setup({}, { role: 'admin' })
      fireEvent.click(screen.getByTestId('more-btn'))
      fireEvent.click(screen.getByText('Delete'))
      expect(deleteMutateFn).toHaveBeenCalled()
    })

    it('calls banMutate when Ban is clicked', () => {
      setup({}, { role: 'admin' })
      fireEvent.click(screen.getByTestId('more-btn'))
      fireEvent.click(screen.getByText('Ban'))
      expect(banMutateFn).toHaveBeenCalled()
    })

    it('shows deleting loader when isDeleting is true', () => {
      setup({}, { role: 'admin', mutationOpts: { isDeleting: true } })
      fireEvent.click(screen.getByTestId('more-btn'))
      expect(screen.getAllByTestId('loader').length).toBeGreaterThan(0)
    })

    it('shows ban loader when isBanPending is true', () => {
      setup({}, { role: 'admin', mutationOpts: { isBanPending: true } })
      fireEvent.click(screen.getByTestId('more-btn'))
      expect(screen.getAllByTestId('loader').length).toBeGreaterThan(0)
    })
  })

  // — Reply input —

  describe('reply input', () => {
    it('shows reply input when activeReplyId matches comment com_id', () => {
      setup({ activeReplyId: 'cm-001' })
      expect(screen.getByPlaceholderText('Write a reply...')).toBeInTheDocument()
    })

    it('does not show reply input when activeReplyId does not match', () => {
      setup({ activeReplyId: 'other-id' })
      expect(screen.queryByPlaceholderText('Write a reply...')).not.toBeInTheDocument()
    })

    it('calls setActiveReplyId to toggle reply on Reply button click', () => {
      const { setActiveReplyId } = setup({ activeReplyId: null })
      fireEvent.click(screen.getByText('Reply'))
      expect(setActiveReplyId).toHaveBeenCalledWith('cm-001')
    })

    it('calls setActiveReplyId(null) when already replying and Reply is clicked', () => {
      const { setActiveReplyId } = setup({ activeReplyId: 'cm-001' })
      fireEvent.click(screen.getByText('Reply'))
      expect(setActiveReplyId).toHaveBeenCalledWith(null)
    })

    it('calls replyMutate when send button is clicked with text', () => {
      setup({ activeReplyId: 'cm-001' })
      fireEvent.change(screen.getByPlaceholderText('Write a reply...'), {
        target: { value: 'My reply' },
      })
      fireEvent.click(screen.getByRole('button', { name: '' }))
      expect(replyMutateFn).toHaveBeenCalledWith({
        postId: 'post-001',
        commentId: 'cm-001',
        reply: 'My reply',
      })
    })

    it('does not call replyMutate when reply text is empty', () => {
      setup({ activeReplyId: 'cm-001' })
      fireEvent.click(screen.getByRole('button', { name: '' }))
      expect(replyMutateFn).not.toHaveBeenCalled()
    })

    it('submits reply on Enter key press', () => {
      setup({ activeReplyId: 'cm-001' })
      const input = screen.getByPlaceholderText('Write a reply...')
      fireEvent.change(input, { target: { value: 'Reply via enter' } })
      fireEvent.keyDown(input, { key: 'Enter', shiftKey: false })
      expect(replyMutateFn).toHaveBeenCalled()
    })

    it('does not submit reply on Shift+Enter key press', () => {
      setup({ activeReplyId: 'cm-001' })
      const input = screen.getByPlaceholderText('Write a reply...')
      fireEvent.change(input, { target: { value: 'Not submitted' } })
      fireEvent.keyDown(input, { key: 'Enter', shiftKey: true })
      expect(replyMutateFn).not.toHaveBeenCalled()
    })

    it('shows pending loader in send button when reply is pending', () => {
      setup({ activeReplyId: 'cm-001' }, { mutationOpts: { isReplyPending: true } })
      expect(screen.getByTestId('loader')).toBeInTheDocument()
    })
  })

  // — Children / replies —

  describe('children replies', () => {
    const children = [
      { com_id: 'ch-001', client_username: 'alice', body: 'Reply 1', children: [], reply_date: null, delete: null, suspend: null },
      { com_id: 'ch-002', client_username: 'bob',   body: 'Reply 2', children: [], reply_date: null, delete: null, suspend: null },
      { com_id: 'ch-003', client_username: 'carol', body: 'Reply 3', children: [], reply_date: null, delete: null, suspend: null },
      { com_id: 'ch-004', client_username: 'dave',  body: 'Reply 4', children: [], reply_date: null, delete: null, suspend: null },
    ]

    it('shows initial 3 replies when more than 3 exist', () => {
      setup({ comment: { ...baseComment, children } })
      expect(screen.getByText(/Reply 1/)).toBeInTheDocument()
      expect(screen.getByText(/Reply 2/)).toBeInTheDocument()
      expect(screen.getByText(/Reply 3/)).toBeInTheDocument()
      expect(screen.queryByText(/Reply 4/)).not.toBeInTheDocument()
    })

    it('shows "View more" button when replies exceed initial limit', () => {
      setup({ comment: { ...baseComment, children } })
      expect(screen.getByText(/View 1 more repl/)).toBeInTheDocument()
    })

    it('shows all replies after "View more" is clicked', () => {
      setup({ comment: { ...baseComment, children } })
      fireEvent.click(screen.getByText(/View 1 more repl/))
      expect(screen.getByText(/Reply 4/)).toBeInTheDocument()
    })

    it('shows "Hide replies" button after expanding', () => {
      setup({ comment: { ...baseComment, children } })
      fireEvent.click(screen.getByText(/View 1 more repl/))
      expect(screen.getByText('Hide replies')).toBeInTheDocument()
    })

    it('hides extra replies after "Hide replies" is clicked', () => {
      setup({ comment: { ...baseComment, children } })
      fireEvent.click(screen.getByText(/View 1 more repl/))
      fireEvent.click(screen.getByText('Hide replies'))
      expect(screen.queryByText(/Reply 4/)).not.toBeInTheDocument()
    })
  })

  // — Depth limit / modal —

  describe('depth limit modal', () => {
    const childWithReplies = {
      com_id: 'ch-deep',
      client_username: 'deep',
      body: 'Deep comment',
      children: [{ com_id: 'deep-ch', client_username: 'deeper', body: 'Deeper', children: [], reply_date: null, delete: null, suspend: null }],
      reply_date: null,
      delete: null,
      suspend: null,
    }

    it('opens RepliesModal when "View more" is clicked at MAX_DEPTH', () => {
      setup({ comment: childWithReplies, depth: 3 })
      fireEvent.click(screen.getByText(/View 1 more repl/))
      expect(screen.getByTestId('replies-modal')).toBeInTheDocument()
    })

    it('closes RepliesModal when close is clicked', () => {
      setup({ comment: childWithReplies, depth: 3 })
      fireEvent.click(screen.getByText(/View 1 more repl/))
      fireEvent.click(screen.getByTestId('close-modal'))
      expect(screen.queryByTestId('replies-modal')).not.toBeInTheDocument()
    })

    it('returns null when depth exceeds MAX_DEPTH', () => {
      const { container } = render(
        <CommentItem
          comment={baseComment}
          depth={4}
          activeReplyId={null}
          setActiveReplyId={vi.fn()}
        />
      )
      // setup mocks inline since setup() calls render
      expect(container.firstChild).toBeNull()
    })
  })
})