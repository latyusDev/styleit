
import React, { memo } from 'react'

const MoreThanFiveImages = ({images,openModal,imageCount}) => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2  gap-4 mb-4">
          <div className='h-[300px]'>
              <img
            src={images[0]}
            alt="Image 1"
            className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(0)}
          />
          </div>
          <div className="grid grid-cols-1 gap-4 ">
            <img
              src={images[1]}
              alt="Image 2"
              className="w-full h-[150px] object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(1)}
            />
            <img
              src={images[2]}
              alt="Image 3"
              className="w-full h-[150px] object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(2)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <img
            src={images[3]}
            alt="Image 4"
            className="w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(3)}
          />
          {imageCount > 4 && (
            <div className="relative">
              <img
                src={images[4]}
                alt="Image 5"
                className="w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(4)}
              />
              {imageCount > 5 && (
                <div 
                  className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center cursor-pointer hover:bg-opacity-70 transition-all"
                  onClick={() => openModal(4)}
                >
                  <span className="text-white text-2xl font-bold">+{imageCount - 5}</span>
                </div>
              )}
            </div>
          )}
          {imageCount > 5 && (
            <img
              src={images[5]}
              alt="Image 6"
              className="w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(5)}
            />
          )}
        </div>
      </div>
    );
}

export default memo(MoreThanFiveImages)