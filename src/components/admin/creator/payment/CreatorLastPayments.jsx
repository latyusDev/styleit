import React from 'react'

const CreatorLastPayments = ({payment}) => {
  return (
    <div className={` ${payment.status=='declined'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-red-500'} ${payment.status=='successful'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-green-500'} ${payment.status=='declined'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-red-500'} mt-5 shadow-md capitalize p-7 md:p-5 rounded-md relative`}>
                <div className={`flex flex-col gap-4 mt-6 md:gap-0 md:flex-row justify-between items-center capitalize rounded-md relative`}>
            <div className='flex items-center md:items-center justify-between mt-5 md:mt-0 w-full md:w-auto md:basis-[15%]'>
            
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>date:</p>
            <p>{payment.date}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>amount:</p>
            <p className='md:basis-[15%]'>{payment.amount}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>reference no:</p>
            <p className='md:basis-[15%]'>{payment.ref}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>status:</p>
            <p className={` md:basis-[15%] ${payment.status == 'declined' &&' text-red-500'} ${payment.status=='successful'  &&' text-green-500 '} `}>{payment.status}</p>
            </div>  
            <p className='basis-[15%] ' ></p>                        
            </div>
</div>
  )
}

export default CreatorLastPayments