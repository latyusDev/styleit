import ErrorMessage from '@/components/global/ErrorMessage'
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader'
import { safeDate } from '@/static/data'
import { useCreatorStore } from '@/store/creatorStore/useCreator'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const SubscriptionDetails = () => {
    const {getSubscriptionHistories} = useCreatorStore()
      
    const { data, isLoading,isError,error } = useQuery({
        queryKey: ['subscription-histories-data'],
        queryFn:getSubscriptionHistories
    })
  return (
    <section className='mt-12'>
        <h2 className='text-center text-xl font-[700] capitalize mb-5'>subscription details</h2>
       <div className='hidden md:block'>
            <div className='flex justify-between'>
                    <h3 className='text-lg capitalize font-[500] basis-[15%]'>date</h3>
                    <h3 className='text-lg capitalize font-[500] basis-[15%]'>time</h3>
                    <h3 className='text-lg capitalize font-[500] basis-[15%]'>plan type</h3>
                    <h3 className='text-lg capitalize font-[500] basis-[15%]'>start date</h3>
                    <h3 className='text-lg capitalize font-[500] basis-[15%]'>end date</h3>
                    <h3 className='text-lg capitalize font-[500] basis-[15%]'>payment status</h3>
                    <h3 className='text-lg capitalize font-[500] basis-[15%]'>status</h3>
                
            </div>
            <div>

              {
                isLoading?<AdminUserLoader/>: 
                <>
                    {
                      isError?<ErrorMessage error={error}/>:
                    <div>
                    {
                        data?.subscriptions.map(subscription=>{
                          const subscriptionDate = new Date(safeDate(subscription.subscription_date));
                          const date = subscriptionDate?.toLocaleDateString();
                          const time = subscriptionDate?.toLocaleTimeString(); 
                            return(
                            <div className='flex justify-between capitalize '>
                                <p className='mt-4 basis-[15%]'>{date}</p>
                                <p className='mt-4 basis-[15%]'>{time}</p>
                                <p className='mt-4 basis-[15%]'>{subscription.plan}</p>
                                <p className='mt-4 basis-[15%]'>{subscription.startDate}</p>
                                <p className='mt-4 basis-[15%]'>{subscription.endDate}</p>
                                <p className='mt-4 basis-[15%]'>{subscription.paymentStatus}</p>
                                <p className='mt-4 basis-[15%]'>{subscription.status}</p>
                            </div>
                            )
                        })
                    }
                      
                    </div>
                    }
                </>
              }
            
            </div>
       </div>
    </section>
  )
}

export default SubscriptionDetails