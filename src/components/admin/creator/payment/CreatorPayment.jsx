import Image from '@/components/global/Image'
import React from 'react'
import CreatorLastPayments from './CreatorLastPayments'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const CreatorPayment = ({payment}) => {
    
  return (
      <li  className="relative mt-12 md:mt-0 list-none" data-testid="creatorPayments">
        <div className={`${(payment.status||payment.payment_status)=='pending'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-yellow-500'} ${(payment.status||payment.payment_status)=='declined'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-red-500'} ${(payment.status||payment.payment_status)=='paid'&&'border-y-[3px] md:border-y-0 md:border-x-[3px] border-green-500'} mt-5 shadow-md capitalize p-7 md:p-5 rounded-md relative`}>
            <div className={`grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 md:gap-0 md:flex-row justify-between items-center capitalize rounded-md relative`}>
    
                <div className='flex items-center md:items-center justify-between mt-5 md:mt-0 w-full md:w-auto md:basis-[15%]'>
                    <p className='font-[700] capitalize md:hidden'>name:</p>
                    <div className='flex items-center gap-3 '>
                        <Image src={payment.creators_pic} className="w-[50px] h-[50px] rounded-full"/>
                        <p data-testid={`name-${payment.payment_id}`} >{payment.creators_firstname||payment.payment_by}</p>
                    </div>
                </div>
                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                    <p className='font-[700] capitalize md:hidden'>date:</p>
                    <p data-testid={`date-${payment.payment_id}`} >{payment.date||payment.patment_transdate}</p>
                </div>
                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                    <p className='font-[700] capitalize md:hidden'>amount:</p>
                    <p data-testid={`amount-${payment.payment_id}`} className='md:basis-[15%]'>₦{(payment.amount === 0 ? '0' : payment.amount) || payment.payment_Amount}</p>
                </div>
                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                    <p className='font-[700] capitalize md:hidden'>ref:</p>
                    <p data-testid={`ref-${payment.payment_id}`}  className='md:basis-[15%]'>{payment.ref_no||payment.payment_transNo}</p>
                </div>
                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                    <p className='font-[700] capitalize md:hidden'>status:</p>
                    <p data-testid={`status-${payment.payment_id}`}  className={` md:basis-[15%] ${(payment.status||payment.payment_status) == 'pending' &&' text-yellow-500'} ${(payment.status||payment.payment_status) == 'declined' &&' text-red-500'} ${(payment.status||payment.payment_status)=='paid'  &&' text-green-500 '} `}>{(payment.status||payment.payment_status)}</p>
                </div>
            </div>
         

        </div>

    </li>
  )
}

export default CreatorPayment