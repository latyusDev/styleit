import SubscriptionDetails from '@/components/dashboard/creator/subscription/SubscriptionDetails'
import SubscriptionHeader from '@/components/dashboard/creator/subscription/SubscriptionHeader'
import SubscriptionItems from '@/components/dashboard/creator/subscription/SubscriptionItems'

import React from 'react'

const Subscriptions = () => {

  
  return (
    <section data-testid="subscriptions-page"  className='container px-4 xl:px-0 pb-20'>
          <div className='text-center pt-12 font-lato'>
                <SubscriptionHeader/>
            </div>        
            <SubscriptionItems/>
        <SubscriptionDetails/>
    </section>
  )
}

export default Subscriptions