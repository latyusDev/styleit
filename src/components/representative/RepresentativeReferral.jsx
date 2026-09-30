import React from 'react'
import Image from '../global/Image'

const RepresentativeReferral = ({user,isClient}) => {
  
  return (
   <div
            key={user.id}
            className={`hidden  md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-5 items-center capitalize bg-white shadow-md  rounded-xl p-4 hover:shadow-md transition ${user.status == 'deactived' ? ' border-l-2 border-red-500':' border-l-2 border-green-500'}`}
          >
            {/* Picture + Name */}
            <div className="flex items-center gap-3">
              <Image
                src={user?.client_pic || user?.creator_pic}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">
                {user.firstName} {user.lastName}
              </span>
            </div>

            {/* Username or business name*/}
            <p className="text-gray-600 break-words  "> {isClient ? user.username : user.business_name} </p>

            {/* First Name */}
            <p>{user.firstName}</p>

            {/* Last Name */}
            <p>{user.lastName}</p>

            {/* Ref Code */}
            <p className="font-semibold text-[#27213c]">
              {user.refrercode}
            </p>
            <p className="font-semibold text-[#27213c]">
              {user.phone}
            </p>
            <p className={`font-semibold text-[#27213c] ${user.status == 'deactived' ? ' text-red-500':' text-green-500'}`}>
              {user.status}
            </p>
          </div>
  )
}

export default RepresentativeReferral