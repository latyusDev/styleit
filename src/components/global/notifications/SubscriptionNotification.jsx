import React, { memo } from 'react'
import Image from '../Image'
import { Loader2 } from 'lucide-react'
import mobileLogo from '../../../images/m_logo.png' 


const SubscriptionNotification = ({content,isSubscribing,handleSubscriptionNotification,itemId}) => {

  return (
    <div className='mt-5 max-w-[800px] mx-auto shadow-md rounded-md bg-gradient-to-tl to-pink-200  to-[60%] from-[40%] md:to-[50%] from-gray-50 md:from-[40.7%]'>
        <div className="p-5">
           <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
                <Image src={mobileLogo} />
                <p >Subscription notification</p>
            </div>
            <p className='cursor-pointer'  onClick={()=>handleSubscriptionNotification({subscriptionId:content?.noti_subscriptionid,id:content?.noteid})}>{isSubscribing&&itemId == content.noteid?
                <Loader2 className=" h-4 w-4  text-primary animate-spin" />: <span className='text-sm md:text-md'>mark as read</span> }</p>
        </div>
        <p className='mt-5'>

          {
          content.noti_subplan == 'free' ? 'You have subscribed free plan':
          <p>  You have subscribed {content.noti_subplan} for {content?.noti_subplan == '1000'&&'monthly '}
        {content?.noti_subplan == '3000'&&'quarterly '} 
        {content?.noti_subplan == '5000'&&'annual '}
        {content?.noti_subplan == '10000'&&'Bi annual '} 
         plan</p>
          }
      
        
    </p>

        </div>
        <div className='bg-gradient-to-tl to-gray-300 from-pink-300 h-[0.06rem] w-full'/>
       <p className='px-5 pt-2 pb-5  text-right mt-2'>{content?.noti_date}</p>

        
    </div>   
  )
}

export default memo(SubscriptionNotification)