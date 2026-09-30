import React from 'react'
import Image from '../global/Image'
import m_logo from '@/images/m_logo.png'


const PasswordHeader = ({title}) => {
  return (
     <div className="flex flex-col gap-4 mb-6 items-center">
     <div>
       <Image src={m_logo}/>
     </div>
       <h2 className="text-2xl font-bold ">
        {title}
      </h2>
     </div>
  )
}

export default PasswordHeader