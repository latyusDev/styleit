import Image from '@/components/global/Image'
import { ChevronRight } from 'lucide-react'
import React from 'react'

const CreatorSubscription = ({subscription}) => {
    
  return (
    <li key={subscription.id} className="relative mt-12 list-none md:mt-0">
        <div className={`${(subscription.sub_status||subscription.status)=='active'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-green-500'} ${(subscription.sub_status||subscription.status)=='deactive'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-red-500'} mt-5 shadow-md capitalize p-7 md:p-5 rounded-md relative`}>
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] md:gap-0 md:flex-row justify-between items-center capitalize rounded-md relative`}>
            
            <div className='flex items-center md:items-center justify-between mt-5 md:mt-0 w-full md:w-auto '>
            <p className='font-[700] capitalize md:hidden'>name:</p>
            <div className='flex items-center gap-3 '>
            <Image src={subscription.creator_pic} className="w-[50px] h-[50px] rounded-full"/>
            <p data-testid={`name-${subscription.id}`} >{subscription.creator_firstname||subscription.first_name||subscription.sub_by} 
               {'  '} {subscription.creator_lastname||subscription.last_name}</p>
            </div>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[20%] text-center '>
            <p className='font-[700] capitalize md:hidden'>plan:</p>
            <p className='md:-ml-2' data-testid={`plan-${subscription.id}`}  >{((subscription.plan||subscription.sub_plan) == 'free'?'free':`₦${subscription.plan||subscription.sub_plan}`)}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto '>
            <p className='font-[700] capitalize md:hidden'>from:</p>
            <p data-testid={`from-${subscription.id}`}  >{subscription.start_date||subscription.startdate}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto '>
            <p className='font-[700] capitalize md:hidden'>to:</p>
            <p data-testid={`to-${subscription.id}`}  >{subscription.end_date||subscription.enddate}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto '>
            <p className='font-[700] capitalize md:hidden'>status:</p>
            <p data-testid={`status-${subscription.id}`}  className={` ml-5 ${(subscription.sub_status||subscription.status) == 'deactive' &&' text-red-500'} ${(subscription.sub_status||subscription.status)=='active'  &&' text-green-500 '} `}>{(subscription.sub_status||subscription.status)}</p>
            </div>
        </div>
        </div>
        
    </li>
  )
}

export default CreatorSubscription