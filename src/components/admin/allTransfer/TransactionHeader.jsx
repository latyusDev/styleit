import React from 'react'

const TransactionHeader = () => {
  return (
     <ul className=' hidden md:grid md:grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] gap-4 capitalize w-full font-[700] mt-16 '>
        <li className='basis-[20%]'>Depositor</li>
        <li className='basis-[16%]'>receiver</li>
        <li className='basis-[16%]'>amount</li>
        <li className='basis-[16%]'> date</li>
        <li className='basis-[16%] -indent-5'>status</li>
        <li className='basis-[10%]'>action</li>
    </ul> 
  )
}

export default TransactionHeader