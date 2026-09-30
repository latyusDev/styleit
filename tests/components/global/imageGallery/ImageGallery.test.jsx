import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'


vi.mock('@/components/global/imageGallery/ImageLayout', () => ({
  ImageLayout: ({ images, openModal }) => (
    <div data-testid="image-layout">
      {images.map((src, i) => (
        <button key={i} data-testid={`open-modal-${i}`} onClick={() => openModal(i)}>
          {src}
        </button>
      ))}
    </div>
  ),
}))

vi.mock('@/components/global/imageGallery/ImageModal', () => ({
  default: ({ closeModal, handleKeyDown, images, prevImage, nextImage, currentImageIndex }) => (
    <div data-testid="image-modal" tabIndex={0} onKeyDown={handleKeyDown}>
      <span data-testid="current-index">{currentImageIndex}</span>
      <span data-testid="current-src">{images[currentImageIndex]}</span>
      <button data-testid="prev-btn" onClick={prevImage}>Prev</button>
      <button data-testid="next-btn" onClick={nextImage}>Next</button>
      <button data-testid="close-btn" onClick={closeModal}>Close</button>
    </div>
  ),
}))

// Import the REAL component with its full alias — never a relative path from the test file
import ImageGallery from '@/components/global/imageGallery/ImageGallery'

// ── Fixtures ───────────────────────────────────────────────────────────────

const urlImages      = [{ url: '/img1.jpg' }, { url: '/img2.jpg' }, { url: '/img3.jpg' }]
const imageUrlImages = [{ imageUrl: '/a.jpg' }, { imageUrl: '/b.jpg' }]
const mixedImages    = [{ url: '/img1.jpg' }, { imageUrl: '/img2.jpg' }]

// ── Helpers ────────────────────────────────────────────────────────────────

const openModalAt = async (index = 0) => {
  fireEvent.click(screen.getByTestId(`open-modal-${index}`))
  await waitFor(() => screen.getByTestId('image-modal'))
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ImageGallery', () => {
  beforeEach(() => vi.clearAllMocks())

  // — Rendering —

  describe('rendering', () => {
    it('renders ImageLayout', () => {
      render(<ImageGallery _images={urlImages} />)
      expect(screen.getByTestId('image-layout')).toBeInTheDocument()
    })

    it('does not render modal by default', () => {
      render(<ImageGallery _images={urlImages} />)
      expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument()
    })
  })

  // — Image URL extraction —

  describe('image URL extraction', () => {
    it('extracts URLs from img.url', () => {
      render(<ImageGallery _images={urlImages} />)
      expect(screen.getByTestId('open-modal-0')).toHaveTextContent('/img1.jpg')
      expect(screen.getByTestId('open-modal-1')).toHaveTextContent('/img2.jpg')
    })

    it('uses img.imageUrl as fallback when url is absent', () => {
      render(<ImageGallery _images={imageUrlImages} />)
      expect(screen.getByTestId('open-modal-0')).toHaveTextContent('/a.jpg')
      expect(screen.getByTestId('open-modal-1')).toHaveTextContent('/b.jpg')
    })

    it('handles mixed url and imageUrl in the same array', () => {
      render(<ImageGallery _images={mixedImages} />)
      expect(screen.getByTestId('open-modal-0')).toHaveTextContent('/img1.jpg')
      expect(screen.getByTestId('open-modal-1')).toHaveTextContent('/img2.jpg')
    })
  })

  // — openModal —

  describe('openModal', () => {
    it('opens modal on image click', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      expect(screen.getByTestId('image-modal')).toBeInTheDocument()
    })

    it('sets index 0 when first image is clicked', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      expect(screen.getByTestId('current-index')).toHaveTextContent('0')
    })

    it('sets index 1 when second image is clicked', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(1)
      expect(screen.getByTestId('current-index')).toHaveTextContent('1')
    })

    it('shows correct src for the clicked image', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(2)
      expect(screen.getByTestId('current-src')).toHaveTextContent('/img3.jpg')
    })
  })

  // — closeModal —

  describe('closeModal', () => {
    it('closes modal when close button is clicked', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      fireEvent.click(screen.getByTestId('close-btn'))
      await waitFor(() => {
        expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument()
      })
    })
  })

  // — nextImage / prevImage —

  describe('navigation', () => {
    it('advances to the next image', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      fireEvent.click(screen.getByTestId('next-btn'))
      expect(screen.getByTestId('current-index')).toHaveTextContent('1')
    })

    it('wraps from last to first on Next', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(2)
      fireEvent.click(screen.getByTestId('next-btn'))
      expect(screen.getByTestId('current-index')).toHaveTextContent('0')
    })

    it('goes to the previous image', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(2)
      fireEvent.click(screen.getByTestId('prev-btn'))
      expect(screen.getByTestId('current-index')).toHaveTextContent('1')
    })

    it('wraps from first to last on Prev', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      fireEvent.click(screen.getByTestId('prev-btn'))
      expect(screen.getByTestId('current-index')).toHaveTextContent('2')
    })
  })

  // — handleKeyDown —

  describe('keyboard navigation', () => {
    it('ArrowRight advances to next image', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      fireEvent.keyDown(screen.getByTestId('image-modal'), { key: 'ArrowRight' })
      expect(screen.getByTestId('current-index')).toHaveTextContent('1')
    })

    it('ArrowLeft wraps to last image from first', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      fireEvent.keyDown(screen.getByTestId('image-modal'), { key: 'ArrowLeft' })
      expect(screen.getByTestId('current-index')).toHaveTextContent('2')
    })

    it('Escape closes the modal', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      fireEvent.keyDown(screen.getByTestId('image-modal'), { key: 'Escape' })
      await waitFor(() => {
        expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument()
      })
    })

    it('unrelated keys do not change index or close modal', async () => {
      render(<ImageGallery _images={urlImages} />)
      await openModalAt(0)
      fireEvent.keyDown(screen.getByTestId('image-modal'), { key: 'Tab' })
      expect(screen.getByTestId('current-index')).toHaveTextContent('0')
      expect(screen.getByTestId('image-modal')).toBeInTheDocument()
    })
  })
})