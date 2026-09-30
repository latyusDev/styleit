import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePost } from '@/store/usePost'
import { toast } from 'sonner'
import AdminTrendingModal from '@/components/admin/AdminTrendingModal'

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}))

vi.mock('@/store/usePost', () => ({
  usePost: vi.fn(),
}))

vi.mock('sonner', () => ({ toast: vi.fn() }))

vi.mock('lucide-react', () => ({
  Ban:       () => <svg data-testid="ban-icon" />,
  Loader2:   () => <span data-testid="loader">loading</span>,
  Trash:     () => <svg data-testid="trash-icon" />,
  Trash2Icon:() => <svg data-testid="trash2-icon" />,
  X:         () => <span data-testid="x-icon">X</span>,
}))

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockPost = {
  id: 'post-001',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
}

const deleteMutateFn = vi.fn()
const banMutateFn    = vi.fn()
const invalidateQueries = vi.fn()
const setAdminModal  = vi.fn()

// ── Setup ──────────────────────────────────────────────────────────────────

/**
 * useMutation is called twice per render (delete + ban).
 * mockImplementation with a counter gives each call its own fn
 * and keeps re-renders stable (never returns undefined).
 */
const setupMutations = ({ isDelete = false, isPending = false } = {}) => {
  let callCount = 0
  useMutation.mockImplementation(({ onSuccess, onError }) => {
    callCount++
    if (callCount % 2 === 1) {
      // First call → delete mutation
      return {
        mutate: deleteMutateFn,
        isPending: isDelete,
        _onSuccess: onSuccess,
        _onError: onError,
      }
    }
    // Second call → ban mutation
    return {
      mutate: banMutateFn,
      isPending,
      _onSuccess: onSuccess,
      _onError: onError,
    }
  })
}

const setup = (props = {}, mutationOpts = {}) => {
  usePost.mockReturnValue({ deletePost: vi.fn(), banPost: vi.fn() })
  useQueryClient.mockReturnValue({ invalidateQueries })
  setupMutations(mutationOpts)

  return render(
    <AdminTrendingModal
      post={mockPost}
      setAdminModal={setAdminModal}
      {...props}
    />
  )
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('AdminTrendingModal', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Rendering —

  describe('rendering', () => {
    it('shows the post author full name', () => {
      setup()
      expect(screen.getByText('Doe Jane')).toBeInTheDocument()
    })

    it('shows the post author email', () => {
      setup()
      expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    })

    it('renders the Delete button', () => {
      setup()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })

    it('renders the Ban button', () => {
      setup()
      expect(screen.getByText('Ban')).toBeInTheDocument()
    })

    it('renders the close button', () => {
      setup()
      // The close X button in the header
      expect(screen.getAllByTestId('x-icon').length).toBeGreaterThan(0)
    })
  })

  // — Close button —

  it('calls setAdminModal(null) when close button is clicked', () => {
    setup()
    // The header close button (first button in the modal header)
    const closeBtn = screen.getByRole('button', { name: /x/i })
    fireEvent.click(closeBtn)
    expect(setAdminModal).toHaveBeenCalledWith(null)
  })

  // — Delete action —

  describe('Delete button', () => {
    it('calls deleteMutate when Delete is clicked', () => {
      setup()
      fireEvent.click(screen.getByText('Delete'))
      expect(deleteMutateFn).toHaveBeenCalled()
    })

    it('shows loader when delete is pending', () => {
      setup({}, { isDelete: true })
      expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    it('does not show loader when delete is not pending', () => {
      setup({}, { isDelete: false })
      // loader only appears for pending state; ban also not pending
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    })
  })

  // — Ban action —

  describe('Ban button', () => {
    it('calls banMutate when Ban is clicked', () => {
      setup()
      fireEvent.click(screen.getByText('Ban'))
      expect(banMutateFn).toHaveBeenCalled()
    })

    it('shows loader when ban is pending', () => {
      setup({}, { isPending: true })
      expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    it('does not show ban loader when not pending', () => {
      setup({}, { isPending: false })
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    })
  })

  // — onSuccess callbacks —

  describe('onSuccess', () => {
    it('calls setAdminModal(null) and toasts on successful delete (status 200)', () => {
      let capturedOnSuccess
      let callCount = 0
      useMutation.mockImplementation(({ onSuccess }) => {
        callCount++
        if (callCount % 2 === 1) {
          capturedOnSuccess = onSuccess
          return { mutate: deleteMutateFn, isPending: false }
        }
        return { mutate: banMutateFn, isPending: false }
      })

      usePost.mockReturnValue({ deletePost: vi.fn(), banPost: vi.fn() })
      useQueryClient.mockReturnValue({ invalidateQueries })
      render(<AdminTrendingModal post={mockPost} setAdminModal={setAdminModal} />)

      capturedOnSuccess({ status: 200 })

      expect(setAdminModal).toHaveBeenCalledWith(null)
      expect(toast).toHaveBeenCalledWith(
        'post deleted successfully',
        expect.objectContaining({ action: expect.anything() })
      )
      expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trending'] })
    })

    it('calls setAdminModal(null) and toasts on successful ban (status 200)', () => {
      let capturedOnSuccess
      let callCount = 0
      useMutation.mockImplementation(({ onSuccess }) => {
        callCount++
        if (callCount % 2 === 0) {
          capturedOnSuccess = onSuccess
          return { mutate: banMutateFn, isPending: false }
        }
        return { mutate: deleteMutateFn, isPending: false }
      })

      usePost.mockReturnValue({ deletePost: vi.fn(), banPost: vi.fn() })
      useQueryClient.mockReturnValue({ invalidateQueries })
      render(<AdminTrendingModal post={mockPost} setAdminModal={setAdminModal} />)

      capturedOnSuccess({ status: 200 })

      expect(setAdminModal).toHaveBeenCalledWith(null)
      expect(toast).toHaveBeenCalledWith(
        'post banned successfully',
        expect.objectContaining({ action: expect.anything() })
      )
    })
  })

  // — onError callbacks —

  describe('onError', () => {
    it('toasts error message when delete fails', () => {
      let capturedOnError
      let callCount = 0
      useMutation.mockImplementation(({ onError }) => {
        callCount++
        if (callCount % 2 === 1) {
          capturedOnError = onError
          return { mutate: deleteMutateFn, isPending: false }
        }
        return { mutate: banMutateFn, isPending: false }
      })

      usePost.mockReturnValue({ deletePost: vi.fn(), banPost: vi.fn() })
      useQueryClient.mockReturnValue({ invalidateQueries })
      render(<AdminTrendingModal post={mockPost} setAdminModal={setAdminModal} />)

      capturedOnError(new Error('Network error'))

      expect(toast).toHaveBeenCalledWith(
        'something went wrong, try again',
        expect.objectContaining({ action: expect.anything() })
      )
    })

    it('toasts error message when ban fails', () => {
      let capturedOnError
      let callCount = 0
      useMutation.mockImplementation(({ onError }) => {
        callCount++
        if (callCount % 2 === 0) {
          capturedOnError = onError
          return { mutate: banMutateFn, isPending: false }
        }
        return { mutate: deleteMutateFn, isPending: false }
      })

      usePost.mockReturnValue({ deletePost: vi.fn(), banPost: vi.fn() })
      useQueryClient.mockReturnValue({ invalidateQueries })
      render(<AdminTrendingModal post={mockPost} setAdminModal={setAdminModal} />)

      capturedOnError(new Error('Server error'))

      expect(toast).toHaveBeenCalledWith(
        'something went wrong, try again',
        expect.objectContaining({ action: expect.anything() })
      )
    })
  })
})