import { subscriptions } from '@/static/data'
import React from 'react'
import SubscriptionCard from './SubscriptionCard'
import { useAuth } from '@/store/useAuth'
import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/useProfile'
import PostListLoader from '@/components/global/loaders/PostListLoader'
import ErrorMessage from '@/components/global/ErrorMessage'

const freePlan = subscriptions[0]
const SubscriptionItems = () => {
  const {user} = useAuth();
  const {getProfileDetails} = useProfileStore()
  const {data,isLoading,error,isError} = useQuery({
        queryKey:['check-subscription-status'],
        queryFn:()=>getProfileDetails(user),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        select:(data)=>{
          return ({
            isNotFree:data?.data?.bookings?.length >= 3
        })
        }
     })
     
  const isNotFree = data?.isNotFree
      
  return (
    <>
      {
        isLoading ? <PostListLoader /> :
         isError ? <ErrorMessage error={error} /> :
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:mt-9'>

            {
              isNotFree && <div className={ `  p-5 rounded-xl mt-8 text-center  border border-gray-100  shadow-md`}>
        <h2 className='text-xl font-[500] capitalize'>{freePlan.period} plan</h2>
        <p className='test-sm my-10'>Free plan threshold of three appointment have been reached. You'll need to make a  premium subscription to continue using our platform</p>
        
        <button disabled={true} className='capitalize font-[500] text-lg px-0 py-4 rounded-xl block
        w-full  bg-primary mt-6 text-white hover:bg-white hover:border hover:border-primary hover:text-primary cursor-pointer'> 
            subscribe now
        </button>
                        
       
    </div>
            }
        {
           (isNotFree ? subscriptions.slice(1) : subscriptions).map(subscription=>{
                return(
             <div className=' '>
                    <SubscriptionCard
                     key={subscription.id} subscription={subscription} btnContent="Subscribe now"
                       subscriptions={subscriptions}  isShow={false} />
                </div>
                )
            })
        }
    </div>
      }
    </>
  )
}

export default SubscriptionItems