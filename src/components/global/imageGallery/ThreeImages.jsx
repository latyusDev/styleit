
import React from 'react'

const ThreeImages = ({images,openModal}) => {
  return (
        <div className="max-w-auto mx-auto">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <img
              src={images[0]}
              alt="Image 1"
              className="w-full h-48 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(0)}
            />
            <img
              src={images[1]}
              alt="Image 2"
              className="w-full h-48 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(1)}
            />
          </div>
          <img
            src={images[2]}
            alt="Image 3"
            className="w-full h-48 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(2)}
          />
        </div>
      );
}

export default ThreeImages