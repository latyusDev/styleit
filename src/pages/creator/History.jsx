
import React from 'react'
import SubscriptionHistory from '@/components/dashboard/creator/subscription/SubscriptionHistory'

const History = ()=>{

    
    return(
        <section data-testid="history-page"  className=' font-lato pt-8 pb-20 px-4 xl:px-0'>
           <div className="container">
                <SubscriptionHistory/>
            </div> 
        </section>
    )
}

export default History


