import Image from '@/components/global/Image'
import React from 'react'

const Transaction = ({transaction,borderClass,textColorClass}) => {
    
  return (
     <li className="relative list-none" data-role="clients">
        <div className={`${borderClass} grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4  md:flex-row justify-between items-center mt-5 shadow-md capitalize p-5 rounded-md relative`}>
            
            {/* Name */}
            <div className='flex items-end md:items-center justify-between w-full md:w-auto '>
                <p className='font-[700] capitalize md:hidden'>name:</p>
                <div className='flex items-center gap-3'>
                    <Image src={transaction.client_pic} className="w-[50px] h-[50px] rounded-full" />
                    <p data-testid={`name-${transaction.id}`}>
                        {transaction.client_lastname} {transaction.client_firstname}
                    </p>
                </div>
            </div>

            {/* paid creator */}
            <div className='flex justify-between  w-full md:w-auto '>
                <p className='font-[700]  md:hidden'>paid creator:</p>
                <p className='capitalize break-all -ml-1 ' >{transaction.creator_paid}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto '>
                <p className='font-[700]  md:hidden'>business name:</p>
                <p className='capitalize break-all -ml-1' >{transaction.business_businessName}</p>
            </div>

            {/* reference no */}
            <div className='flex justify-between w-full md:w-auto '>
                <p className='font-[700] capitalize md:hidden'>reference no:</p>
                <p >{transaction.ref_no}</p>
            </div>

            {/* date */}
            <div className='flex justify-between w-full md:w-auto '>
                <p className='font-[700] capitalize md:hidden '>date:</p>
                <p  className=' capitalize '>
                    {transaction.date}
                </p>
            </div>
            
            {/* status*/}
            <div className='flex justify-between w-full md:w-auto '>
                <p className='font-[700] capitalize md:hidden'>status:</p>
                <p data-testid={`status-${transaction.id}`} className={textColorClass}>
                    {transaction.status}
                </p>
            </div>

        </div>

     
    </li>
  )
}

export default Transaction