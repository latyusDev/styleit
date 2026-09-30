import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ThreeImages from '@/components/global/imageGallery/ThreeImages'

// ── Fixtures ───────────────────────────────────────────────────────────────

const threeImages = ['/img1.jpg', '/img2.jpg', '/img3.jpg']

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ThreeImages', () => {
  let openModal

  beforeEach(() => {
    openModal = vi.fn()
  })

  // — Rendering —

  it('renders exactly 3 images', () => {
    render(<ThreeImages images={threeImages} openModal={openModal} />)
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it.each([
    ['Image 1', '/img1.jpg'],
    ['Image 2', '/img2.jpg'],
    ['Image 3', '/img3.jpg'],
  ])('renders %s with correct src', (alt, src) => {
    render(<ThreeImages images={threeImages} openModal={openModal} />)
    expect(screen.getByAltText(alt)).toHaveAttribute('src', src)
  })

  // — Click handlers —

  it.each([
    ['Image 1', 0],
    ['Image 2', 1],
    ['Image 3', 2],
  ])('calls openModal(%i) when %s is clicked', (alt, index) => {
    render(<ThreeImages images={threeImages} openModal={openModal} />)
    fireEvent.click(screen.getByAltText(alt))
    expect(openModal).toHaveBeenCalledWith(index)
  })

  it('calls openModal exactly once per click', () => {
    render(<ThreeImages images={threeImages} openModal={openModal} />)
    fireEvent.click(screen.getByAltText('Image 2'))
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})