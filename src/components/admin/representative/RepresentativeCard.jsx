import Image from '@/components/global/Image'
import React from 'react'
import userPicture from '@/images/profile_i.png'
import { Link } from 'react-router-dom'

const RepresentativeCard = ({representative}) => {
  return (
     <div 
        key={representative.id} 
        className={`
            bg-white rounded-lg shadow-md p-5 relative
        `}
    >
        <Link to={`/admin/representatives/profile/${representative.refercode}`}>
                {/* Name with Image */}
        <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
                <Image
                    src={representative?.pic||userPicture} 
                    className="w-12 h-12 rounded-full object-cover"
                    alt="User"
                />
                <div>
                    <p className='font-bold text-sm'>Name</p>
                    <p className='capitalize'>
                        {representative.name}
                    </p>
                </div>
            </div>
            
        </div>

        {/* Email */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm'>Email:</p>
            <p className='text-sm'>{representative.email}</p>
        </div>
        {/* Email */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm'>Phone:</p>
            <p className='text-sm'>{representative.phone}</p>
        </div>

        {/* Gender */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm'>Gender:</p>
            <p className='capitalize text-sm'>{representative.gender}</p>
        </div>
        {/* State */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm'>State:</p>
            <p className='capitalize text-sm'>{representative.state}</p>
        </div>
        {/* LGA */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm'>LGA:</p>
            <p className='capitalize text-sm'>{representative.lga}</p>
        </div>
        {/* Ref Code */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm'>Ref code:</p>
            <p className='capitalize text-sm'>{representative.refercode}</p>
        </div>
        </Link>

    </div>
  )
}

export default RepresentativeCard



