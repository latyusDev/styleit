import React, { memo } from 'react'

const OneImage = ({image,openModal}) => {
  return (
    <div className="w-full max-w-auto mx-auto">
          <img
            src={image}
            alt="Single image"
            className="w-full object-cover h-64 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(0)}
          />
        </div>
  )
}

export default memo(OneImage)