import React, {memo, Suspense, useCallback, useMemo, useState } from "react"
import { ImageLayout } from "./ImageLayout"
import ImageModal from "./ImageModal"

const ImageGallery = ({ _images }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = useMemo(
    () => _images.map((img) => img?.url || img?.imageUrl),
    [_images]
  )

  const openModal = useCallback((index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") closeModal()
    },
    [nextImage, prevImage, closeModal]
  )

  return (
    <div className="midn-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Image Grid */}
        <ImageLayout images={images} openModal={openModal} />

        {/* Modal */}
        
        <Suspense fallback={null}>
              {isModalOpen && (
                <ImageModal
                  closeModal={closeModal}
                  handleKeyDown={handleKeyDown}
                  images={images}
                  prevImage={prevImage}
                  nextImage={nextImage}
                  setCurrentImageIndex={setCurrentImageIndex}
                  currentImageIndex={currentImageIndex}
                />
              )}
        </Suspense>

      </div>
    </div>
  )
}

export default memo(ImageGallery)