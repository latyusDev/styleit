import userPicture from '@/images/avatar_profile.png'
import React from 'react'
import { Link } from 'react-router-dom'
import Image from '@/components/global/Image'

const Representative = ({representative}) => {
  return (
      <Link to={`/admin/representatives/profile/${representative.refercode}`}>
            <div 
        className={`
            grid grid-cols-7 gap-5 capitalize shadow-md items-center rounded-lg p-7 transition-all cursor-pointer relative
           
        `}
    >
        {/* Name */}
        <div className="" >
            <div className='flex items-center gap-3'>
                <Image 
                    src={representative?.pic||userPicture} 
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    alt="User"
                />
                <span className="">
                    {representative.name}
                </span>
            </div>
        </div>

        {/* Email */}
        <div className="  text-wrap break-words " >
            <span className="text-gray-700  lowercase">{representative.email}</span>
        </div>

        {/* Phone */}
        <div>
            {representative.phone}
        </div>
        {/* Gender */}
        <div>
            {representative.gender} 
        </div>
        {/* State */}
        <div>
            {representative.state}
        </div>
        {/* lga */}
        <div>
            {representative.lga}
        </div>
        <div className=" text-center">
            {representative.refercode}
        </div>
    </div>
      </Link>
  )
}

export default Representative
