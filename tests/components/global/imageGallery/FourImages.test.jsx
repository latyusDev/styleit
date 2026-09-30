import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import FourImages from '@/components/global/imageGallery/FourImages'

// ── Shared fixtures ────────────────────────────────────────────────────────

const images = [
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg',
  '/img6.jpg',
  '/img7.jpg',
]
// ══════════════════════════════════════════════════════════════════════════
// FourImages
// ══════════════════════════════════════════════════════════════════════════

describe('FourImages', () => {
  let openModal
  const fourImages = images.slice(0, 4)

  beforeEach(() => {
    openModal = vi.fn()
  })

  it('renders exactly 4 images', () => {
    render(<FourImages images={fourImages} openModal={openModal} />)
    expect(screen.getAllByRole('img')).toHaveLength(4)
  })

  it('renders correct src for each image', () => {
    render(<FourImages images={fourImages} openModal={openModal} />)
    fourImages.forEach((src, i) => {
      expect(screen.getByAltText(`Image ${i + 1}`)).toHaveAttribute('src', src)
    })
  })

  it.each([0, 1, 2, 3])(
    'calls openModal(%i) when image %i is clicked',
    (index) => {
      render(<FourImages images={fourImages} openModal={openModal} />)
      fireEvent.click(screen.getByAltText(`Image ${index + 1}`))
      expect(openModal).toHaveBeenCalledWith(index)
    }
  )

  it('calls openModal exactly once per click', () => {
    render(<FourImages images={fourImages} openModal={openModal} />)
    fireEvent.click(screen.getByAltText('Image 1'))
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})
