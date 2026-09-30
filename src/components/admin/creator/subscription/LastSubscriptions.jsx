import React from 'react'

const LastSubscriptions = ({sub}) => {
  return (
    <div className={`${sub.status=='active'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-green-500'} ${sub.status=='expired'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-red-500'} mt-5 shadow-md capitalize p-7 md:p-5 rounded-md relative`}>
                <div className={`flex flex-col gap-4 mt-6 md:gap-0 md:flex-row justify-between items-center capitalize rounded-md relative`}>
            <div className='flex items-center md:items-center justify-between mt-5 md:mt-0 w-full md:w-auto md:basis-[15%]'>
            
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>plan:</p>
            <p>{sub.plan}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>type:</p>
            <p>{sub.type}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>from:</p>
            <p className='md:basis-[15%]'>{sub.from}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>to:</p>
            <p className='md:basis-[15%]'>{sub.to}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>status:</p>
            <p className={` md:basis-[15%] ${sub.status == 'expired' &&' text-red-500'} ${sub.status=='active'  &&' text-green-500 '} `}>{sub.status}</p>
            </div>  
            <p className='basis-[15%] ' ></p>                        
            </div>
</div>
  )
}

export default LastSubscriptions