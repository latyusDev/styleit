import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TwoImages from '@/components/global/imageGallery/TwoImages'


describe('TwoImages', () => {
  let openModal
  const twoImages = ['/img1.jpg', '/img2.jpg']

  beforeEach(() => {
    openModal = vi.fn()
  })

  it('renders exactly 2 images', () => {
    render(<TwoImages images={twoImages} openModal={openModal} />)
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('renders correct src for each image', () => {
    render(<TwoImages images={twoImages} openModal={openModal} />)
    expect(screen.getByAltText('Image 1')).toHaveAttribute('src', '/img1.jpg')
    expect(screen.getByAltText('Image 2')).toHaveAttribute('src', '/img2.jpg')
  })

  it('calls openModal(0) when the first image is clicked', () => {
    render(<TwoImages images={twoImages} openModal={openModal} />)
    fireEvent.click(screen.getByAltText('Image 1'))
    expect(openModal).toHaveBeenCalledWith(0)
  })

  it('calls openModal(1) when the second image is clicked', () => {
    render(<TwoImages images={twoImages} openModal={openModal} />)
    fireEvent.click(screen.getByAltText('Image 2'))
    expect(openModal).toHaveBeenCalledWith(1)
  })
})
