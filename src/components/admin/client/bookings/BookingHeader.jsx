import React from 'react'

const BookingHeader = () => {
  return (
     <ul className=' hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 capitalize w-full font-[700] p-3 '>
        <li className='basis-[20%]'>name</li>
        <li className='basis-[16%]'>collection date</li>
        <li className='basis-[16%]'>booking date</li>
        <li className='basis-[16%]'>status</li>
        <li className='basis-[10%]'>action</li>
    </ul> 
  )
}

export default BookingHeader