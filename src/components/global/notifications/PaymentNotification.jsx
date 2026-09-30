import React, { memo } from 'react'
import Image from '../Image'
import { Loader2 } from 'lucide-react'
import mobileLogo from '../../../images/m_logo.png' 
import { useAuth } from '@/store/useAuth'


const PaymentNotification = ({handlePaymentNotification,content,isPaying,itemId}) => {
     const {user} = useAuth()
     const isClient = user?.role === 'client'

  return (
    <div className='mt-5 max-w-[800px] mx-auto shadow-md rounded-md   bg-gradient-to-tl to-pink-200  to-[60%] from-[40%] md:to-[50%] from-gray-50 md:from-[40.7%]'>
       <div className="p-5">

        <div className='flex justify-between '>
            <div className='flex gap-4 items-center'>
                <Image src={mobileLogo} />
                    <p>Payment Notification</p>
            </div>
                <p className='cursor-pointer' onClick={()=>handlePaymentNotification({paymentId:content?.noti_paymentid,id:content?.noteid})}>{isPaying&&itemId == content.noteid?<Loader2 className=" h-4 w-4 text-primary animate-spin" />:<span className='text-sm md:text-md'>mark as read</span> }</p>
            
        </div>
        {
            !isClient &&<div>
                    <div>
                <p className='mt-5'>{content?.noti_payment_status == 'paid'&& 'Your payment is successful'} </p>
                <p className='mt-5'>{(content?.noti_payment_status == 'failed' || content?.noti_payment_status == 'pending') && 'your payment is unsuccessful'} </p>
                </div>
        </div>
        }
       </div>
          <div className='bg-gradient-to-tl to-gray-300 from-pink-300 h-[0.06rem] w-full'/>
        <p className='px-5 pt-2 pb-5  text-right mt-2'>{content?.noti_date}</p>
        
        
    </div>   
  )
}

export default memo(PaymentNotification)