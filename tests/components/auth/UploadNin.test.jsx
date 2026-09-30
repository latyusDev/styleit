import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import UploadNin from '@/components/auth/UploadNin'
import { useAuthService } from '@/store/useAuthService'


// --- Mocks ---

vi.mock('react-router-dom', () => ({ useNavigate: vi.fn() }))
vi.mock('js-cookie', () => ({ default: { remove: vi.fn() } }))
vi.mock('sonner', () => ({ toast: Object.assign(vi.fn(), { error: vi.fn() }) }))
vi.mock('@/store/useAuthService', () => ({ useAuthService: vi.fn() }))

vi.mock('@/components/auth/NinEmailForm', () => ({
  default: ({ serverState, setServerState }) => (
    <div data-testid="nin-email-form">
      <button
        data-testid="mock-set-ready"
        onClick={() => setServerState({ ...serverState, isReady: true })}
      >
        set ready
      </button>
    </div>
  )
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({ children }) => <div>{children}</div>,
  CardContent: ({ children }) => <div>{children}</div>
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props) => <input data-testid="file-input" {...props} />
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, onClick }) => (
    <button data-testid="upload-btn" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}))

vi.mock('@/components/global/Image', () => ({
  default: () => <img data-testid="logo" alt="logo" />
}))

// --- Setup ---

const mockNavigate = vi.fn()
const mockUploadNin = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  useNavigate.mockReturnValue(mockNavigate)
  useAuthService.mockReturnValue({ uploadNin: mockUploadNin })
})

// --- Helpers ---

const renderAndGoToUpload = () => {
  render(<UploadNin />)
  // transition from NinEmailForm to upload UI
  fireEvent.click(screen.getByTestId('mock-set-ready'))
}

const uploadFile = () => {
  const file = new File(['nin'], 'nin.png', { type: 'image/png' })
  global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/nin')
  fireEvent.change(screen.getByTestId('file-input'), { target: { files: [file] } })
  return file
}

// --- Tests ---

describe('UploadNin', () => {
  describe('initial state — NinEmailForm', () => {
    it('renders NinEmailForm when isReady is false', () => {
      render(<UploadNin />)

      expect(screen.getByTestId('nin-email-form')).toBeInTheDocument()
    })

    it('does not render the upload UI when isReady is false', () => {
      render(<UploadNin />)

      expect(screen.queryByText(/upload nin/i)).not.toBeInTheDocument()
    })
  })

  describe('upload UI — after isReady is true', () => {
    it('renders the upload heading after isReady is set', () => {
      renderAndGoToUpload()

      expect(screen.getByText('Upload NIN')).toBeInTheDocument()
    })

    it('renders the file input', () => {
      renderAndGoToUpload()

      expect(screen.getByTestId('file-input')).toBeInTheDocument()
    })

    it('renders the upload button disabled when no image is selected', () => {
      renderAndGoToUpload()

      expect(screen.getByTestId('upload-btn')).toBeDisabled()
    })

    it('shows "Click to upload" label before any file is selected', () => {
      renderAndGoToUpload()

      expect(screen.getByText(/click to upload/i)).toBeInTheDocument()
    })
  })

  describe('file selection', () => {
    it('shows an image preview after a file is selected', () => {
      renderAndGoToUpload()
      uploadFile()

      expect(screen.getByAltText('NIN Preview')).toBeInTheDocument()
    })

    it('enables the upload button after a file is selected', () => {
      renderAndGoToUpload()
      uploadFile()

      expect(screen.getByTestId('upload-btn')).not.toBeDisabled()
    })

    it('hides the file input label after a file is selected', () => {
      renderAndGoToUpload()
      uploadFile()

      expect(screen.queryByText(/click to upload/i)).not.toBeInTheDocument()
    })
  })

  describe('handleRemove', () => {
    it('removes the image preview when the remove button is clicked', () => {
      renderAndGoToUpload()
      uploadFile()

      fireEvent.click(screen.getByRole('button', { name: '' })) // X button

      expect(screen.queryByAltText('NIN Preview')).not.toBeInTheDocument()
    })

    it('disables the upload button after image is removed', () => {
      renderAndGoToUpload()
      uploadFile()

      fireEvent.click(screen.getByRole('button', { name: '' }))

      expect(screen.getByTestId('upload-btn')).toBeDisabled()
    })

    it('shows the file input label again after image is removed', () => {
      renderAndGoToUpload()
      uploadFile()

      fireEvent.click(screen.getByRole('button', { name: '' }))

      expect(screen.getByText(/click to upload/i)).toBeInTheDocument()
    })
  })

  describe('handleNinUpload — success (200)', () => {
    it('navigates to /login on success', async () => {
      mockUploadNin.mockResolvedValue({ status: 200 })

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login')
      })
    })

    it('removes the ninToken cookie on success', async () => {
      mockUploadNin.mockResolvedValue({ status: 200 })

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(Cookies.remove).toHaveBeenCalledWith('ninToken')
      })
    })

    it('shows the account verified toast on success', async () => {
      mockUploadNin.mockResolvedValue({ status: 200 })

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'Account verified successfully, kindly login',
          expect.anything()
        )
      })
    })
  })

  describe('handleNinUpload — 401 response', () => {
    it('shows the server error toast on 401', async () => {
      mockUploadNin.mockResolvedValue({
        status: 401,
        response: { data: { message: 'Unauthorized' } }
      })

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Unauthorized', expect.anything())
      })
    })

    it('falls back to generic message when 401 has no message', async () => {
      mockUploadNin.mockResolvedValue({ status: 401, response: {} })

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'Something went wrong,try again',
          expect.anything()
        )
      })
    })

    it('does not navigate on 401', async () => {
      mockUploadNin.mockResolvedValue({ status: 401, response: {} })

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled()
      })
    })
  })

  describe('handleNinUpload — network error', () => {
    it('shows error toast when uploadNin throws', async () => {
      mockUploadNin.mockRejectedValue({
        response: { data: { message: 'Server crashed' } }
      })

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Server crashed', expect.anything())
      })
    })

    it('falls back to generic message when thrown error has no response message', async () => {
      mockUploadNin.mockRejectedValue(new Error('Network Error'))

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'Something went wrong,try again',
          expect.anything()
        )
      })
    })
  })

  describe('loading state during upload', () => {
    it('disables the upload button while uploading', async () => {
      mockUploadNin.mockResolvedValue(new Promise(() => {})) // never resolves

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(screen.getByTestId('upload-btn')).toBeDisabled()
      })
    })

    it('shows "Uploading..." text while uploading', async () => {
      mockUploadNin.mockResolvedValue(new Promise(() => {}))

      renderAndGoToUpload()
      uploadFile()
      fireEvent.click(screen.getByTestId('upload-btn'))

      await waitFor(() => {
        expect(screen.getByTestId('upload-btn')).toHaveTextContent(/uploading/i)
      })
    })
  })
})