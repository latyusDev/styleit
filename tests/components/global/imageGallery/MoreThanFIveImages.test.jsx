import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MoreThanFiveImages from '@/components/global/imageGallery/MoreThanFiveImages'


const images = [
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg',
  '/img6.jpg',
  '/img7.jpg',
]


describe('MoreThanFiveImages', () => {
  let openModal

  beforeEach(() => {
    openModal = vi.fn()
  })

  // — Always-visible images (first 4) —

  describe('first 4 images always visible', () => {
    it('renders Image 1 with correct src', () => {
      render(<MoreThanFiveImages images={images} imageCount={7} openModal={openModal} />)
      expect(screen.getByAltText('Image 1')).toHaveAttribute('src', '/img1.jpg')
    })

    it('renders Image 2 with correct src', () => {
      render(<MoreThanFiveImages images={images} imageCount={7} openModal={openModal} />)
      expect(screen.getByAltText('Image 2')).toHaveAttribute('src', '/img2.jpg')
    })

    it('renders Image 3 with correct src', () => {
      render(<MoreThanFiveImages images={images} imageCount={7} openModal={openModal} />)
      expect(screen.getByAltText('Image 3')).toHaveAttribute('src', '/img3.jpg')
    })

    it('renders Image 4 with correct src', () => {
      render(<MoreThanFiveImages images={images} imageCount={7} openModal={openModal} />)
      expect(screen.getByAltText('Image 4')).toHaveAttribute('src', '/img4.jpg')
    })

    it.each([
      ['Image 1', 0],
      ['Image 2', 1],
      ['Image 3', 2],
      ['Image 4', 3],
    ])('calls openModal(%i) when %s is clicked', (alt, index) => {
      render(<MoreThanFiveImages images={images} imageCount={7} openModal={openModal} />)
      fireEvent.click(screen.getByAltText(alt))
      expect(openModal).toHaveBeenCalledWith(index)
    })
  })

  // — imageCount > 4: Image 5 visible —

  describe('when imageCount > 4', () => {
    it('renders Image 5', () => {
      render(<MoreThanFiveImages images={images} imageCount={5} openModal={openModal} />)
      expect(screen.getByAltText('Image 5')).toBeInTheDocument()
    })

    it('calls openModal(4) when Image 5 is clicked', () => {
      render(<MoreThanFiveImages images={images} imageCount={5} openModal={openModal} />)
      fireEvent.click(screen.getByAltText('Image 5'))
      expect(openModal).toHaveBeenCalledWith(4)
    })

    it('does not show Image 5 when imageCount is 4', () => {
      render(<MoreThanFiveImages images={images.slice(0, 4)} imageCount={4} openModal={openModal} />)
      expect(screen.queryByAltText('Image 5')).not.toBeInTheDocument()
    })
  })

  // — imageCount > 5: overlay and Image 6 —

  describe('when imageCount > 5', () => {
    it('shows the "+N" overlay on Image 5', () => {
      render(<MoreThanFiveImages images={images} imageCount={7} openModal={openModal} />)
      expect(screen.getByText('+2')).toBeInTheDocument()
    })

    it('shows correct overflow count', () => {
      render(<MoreThanFiveImages images={images} imageCount={9} openModal={openModal} />)
      expect(screen.getByText('+4')).toBeInTheDocument()
    })

    it('calls openModal(4) when the overlay is clicked', () => {
      render(<MoreThanFiveImages images={images} imageCount={7} openModal={openModal} />)
      fireEvent.click(screen.getByText('+2'))
      expect(openModal).toHaveBeenCalledWith(4)
    })

    it('renders Image 6 when imageCount > 5', () => {
      render(<MoreThanFiveImages images={images} imageCount={6} openModal={openModal} />)
      expect(screen.getByAltText('Image 6')).toBeInTheDocument()
    })

    it('calls openModal(5) when Image 6 is clicked', () => {
      render(<MoreThanFiveImages images={images} imageCount={6} openModal={openModal} />)
      fireEvent.click(screen.getByAltText('Image 6'))
      expect(openModal).toHaveBeenCalledWith(5)
    })

    it('does not show overlay when imageCount is exactly 5', () => {
      render(<MoreThanFiveImages images={images} imageCount={5} openModal={openModal} />)
      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
    })

    it('does not render Image 6 when imageCount is exactly 5', () => {
      render(<MoreThanFiveImages images={images} imageCount={5} openModal={openModal} />)
      expect(screen.queryByAltText('Image 6')).not.toBeInTheDocument()
    })
  })
})