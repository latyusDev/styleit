import React from 'react'

const ClientHeader = () => {
  return (
       <ul className='hidden md:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 capitalize w-full font-[700] p-3'>
            <li>name</li>
            <li>email</li>
            <li>gender</li>
            <li>status</li>
            <li>actions</li>
        </ul>
  )
}

export default ClientHeader