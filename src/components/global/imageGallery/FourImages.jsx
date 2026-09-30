
import React, { memo } from 'react'

const FourImages = ({images,openModal}) => {
   return (
        <div className="grid grid-cols-2 gap-2 max-w-auto mx-auto">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className="w-full h-48 object-cover  rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      );
}

export default memo(FourImages)

