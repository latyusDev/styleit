import React from 'react'
import Image from '../global/Image'

const ReferralCard = ({referral,isClient}) => {
  return (
     <div 
        key={referral.id} 
        className={`
            ${referral.status == 'deactived' ? 'border-l-2 border-red-500':'border-l-2 border-green-500'}
            bg-white rounded-lg shadow-md p-5 relative md:hidden capitalize
        `}
    >
        {/* Name with Image */}
        <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
                <Image
                    src={referral.client_pic} 
                    className="w-12 h-12 rounded-full object-cover"
                    alt="avatar"
                />
                <div>
                    <p className='font-bold text-sm text-black'>Full Name</p>
                    <p className='capitalize'>
                        {referral.lastName} {referral.firstName}
                    </p>
                </div>
            </div>
        </div>

        {/* Email */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm text-black'>First Name:</p>
            <p className='text-sm'>{referral.firstName}</p>
        </div>

        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm text-black'>Last Name:</p>
            <p className='capitalize text-sm'>{referral.lastName}</p>
        </div>
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm text-black'>{isClient ? 'Username':'Business Name'}</p>
            <p className='capitalize text-sm'>{isClient?referral.username:referral.business_name}</p>
        </div>
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm text-black'>Refer Code:</p>
            <p className='capitalize text-sm'>{referral.refrercode}</p>
        </div>
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm text-black'>Phone:</p>
            <p className='capitalize text-sm'>{referral.phone}</p>
        </div>
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm text-black'>Status:</p>
            <p className={` capitalize text-sm ${referral.status == 'deactived' ? ' text-red-500':' text-green-500'}`}> {referral.status} </p>
        </div>

    </div>
  )
}

export default ReferralCard



