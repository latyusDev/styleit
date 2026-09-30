import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import OneImage from '@/components/global/imageGallery/OneImage'


describe('OneImage', () => {
  let openModal

  beforeEach(() => {
    openModal = vi.fn()
  })

  it('renders a single image with correct src', () => {
    render(<OneImage image="/img1.jpg" openModal={openModal} />)
    expect(screen.getByAltText('Single image')).toHaveAttribute('src', '/img1.jpg')
  })

  it('renders the image with alt "Single image"', () => {
    render(<OneImage image="/img1.jpg" openModal={openModal} />)
    expect(screen.getByAltText('Single image')).toBeInTheDocument()
  })

  it('calls openModal(0) when the image is clicked', () => {
    render(<OneImage image="/img1.jpg" openModal={openModal} />)
    fireEvent.click(screen.getByAltText('Single image'))
    expect(openModal).toHaveBeenCalledWith(0)
  })

  it('calls openModal exactly once per click', () => {
    render(<OneImage image="/img1.jpg" openModal={openModal} />)
    fireEvent.click(screen.getByAltText('Single image'))
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})
