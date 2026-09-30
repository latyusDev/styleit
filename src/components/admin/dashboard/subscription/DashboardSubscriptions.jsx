import React, { useState } from 'react'
import CreatorSubscription from '../../creator/subscription/CreatorSubscription'
import CreatorSubscrptionHeader from '../../creator/subscription/CreatorSubscrptionHeader'

const DashboardSubscriptions = ({subscriptions}) => {
  
  const [id,setId] = useState(null)
      const handleAction = (subscriptionId)=>{
  
          if(id === subscriptionId){
              setId(null)
          }else{
              setId(subscriptionId)
          }
      }
  return (
    <div>
        {/* <DashboardSubscriptionTabs/> */}
        <h1 className='text-center text-5xl mb-3 font-bold'>Latest Subscriptions</h1>

          <div className='mt-5'>
            <CreatorSubscrptionHeader full={true}/>
         <ul>
         {
             subscriptions.map(subscription=>{
                    return(
                        <CreatorSubscription key={subscription.id} 
                        subscription={subscription}  id={id} handleAction={handleAction}/>
                       
                    )
                })
         }
        </ul>
        </div>
    </div>
  )
}

export default DashboardSubscriptions