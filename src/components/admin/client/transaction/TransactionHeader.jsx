import React from 'react'

const TransactionHeader = () => {
  return (
       <ul className='hidden md:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 capitalize w-full font-[700] p-3'>
            <li>name</li>
            <li>paid creator</li>
            <li>business name</li>
            <li>reference no</li>
            <li>date</li>
            <li>status</li>
        </ul>
  )
}

export default TransactionHeader