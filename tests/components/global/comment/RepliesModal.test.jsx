import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import RepliesModal from '@/components/global/comment/RepliesModal'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/components/global/comment/CommentItem', () => ({
  default: ({ comment, depth, activeReplyId, setActiveReplyId, disableLimit }) => (
    <div
      data-testid={`comment-item-${comment.com_id}`}
      data-depth={depth}
      data-disable-limit={String(disableLimit)}
    >
      <span>{comment.body}</span>
      <button
        data-testid={`reply-btn-${comment.com_id}`}
        onClick={() => setActiveReplyId(comment.com_id)}
      >
        Reply
      </button>
      {activeReplyId === comment.com_id && (
        <span data-testid={`active-${comment.com_id}`}>replying</span>
      )}
    </div>
  ),
}))

vi.mock('lucide-react', () => ({
  X: ({ className }) => <svg data-testid="x-icon" className={className} />,
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockReplies = [
  { com_id: 'rep-001', body: 'First reply' },
  { com_id: 'rep-002', body: 'Second reply' },
  { com_id: 'rep-003', body: 'Third reply' },
]

const setup = (props = {}) => {
  const onClose          = vi.fn()
  const setActiveReplyId = vi.fn()

  const defaults = {
    isOpen: true,
    onClose,
    replies: mockReplies,
    onReply: vi.fn(),
    activeReplyId: null,
    setActiveReplyId,
  }

  render(<RepliesModal {...defaults} {...props}
    onClose={props.onClose ?? onClose}
    setActiveReplyId={props.setActiveReplyId ?? setActiveReplyId}
  />)

  return { onClose, setActiveReplyId }
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('RepliesModal', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Visibility —

  describe('visibility', () => {
    it('renders nothing when isOpen is false', () => {
      const { container } = render(
        <RepliesModal
          isOpen={false}
          onClose={vi.fn()}
          replies={mockReplies}
          activeReplyId={null}
          setActiveReplyId={vi.fn()}
        />
      )
      expect(container.firstChild).toBeNull()
    })

    it('renders the modal when isOpen is true', () => {
      setup()
      expect(screen.getByText('More Replies')).toBeInTheDocument()
    })
  })

  // — Header —

  describe('header', () => {
    it('shows the "More Replies" heading', () => {
      setup()
      expect(screen.getByText('More Replies')).toBeInTheDocument()
    })

    it('renders the close button', () => {
      setup()
      expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    })

    it('calls onClose when the close button is clicked', () => {
      const { onClose } = setup()
      fireEvent.click(screen.getByTestId('x-icon').closest('button'))
      expect(onClose).toHaveBeenCalled()
    })
  })

  // — Replies list —

  describe('replies list', () => {
    it('renders all reply CommentItems', () => {
      setup()
      mockReplies.forEach(({ com_id }) => {
        expect(screen.getByTestId(`comment-item-${com_id}`)).toBeInTheDocument()
      })
    })

    it('renders reply bodies', () => {
      setup()
      mockReplies.forEach(({ body }) => {
        expect(screen.getByText(body)).toBeInTheDocument()
      })
    })

    it('passes depth={0} to every CommentItem', () => {
      setup()
      mockReplies.forEach(({ com_id }) => {
        expect(screen.getByTestId(`comment-item-${com_id}`)).toHaveAttribute('data-depth', '0')
      })
    })

    it('passes disableLimit={true} to every CommentItem', () => {
      setup()
      mockReplies.forEach(({ com_id }) => {
        expect(screen.getByTestId(`comment-item-${com_id}`)).toHaveAttribute('data-disable-limit', 'true')
      })
    })

    it('renders empty list without crashing when replies is empty', () => {
      setup({ replies: [] })
      expect(screen.getByText('More Replies')).toBeInTheDocument()
      expect(screen.queryByTestId(/^comment-item-/)).not.toBeInTheDocument()
    })
  })

  // — activeReplyId passthrough —

  describe('activeReplyId passthrough', () => {
    it('passes activeReplyId to CommentItems', () => {
      setup({ activeReplyId: 'rep-001' })
      expect(screen.getByTestId('active-rep-001')).toBeInTheDocument()
    })

    it('does not mark other items as active', () => {
      setup({ activeReplyId: 'rep-001' })
      expect(screen.queryByTestId('active-rep-002')).not.toBeInTheDocument()
    })
  })

  // — setActiveReplyId passthrough —

  describe('setActiveReplyId passthrough', () => {
    it('calls setActiveReplyId with com_id when Reply is clicked', () => {
      const { setActiveReplyId } = setup()
      fireEvent.click(screen.getByTestId('reply-btn-rep-001'))
      expect(setActiveReplyId).toHaveBeenCalledWith('rep-001')
    })
  })
})