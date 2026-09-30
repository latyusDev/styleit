import Stars from '@/components/global/Stars'
import { format } from 'date-fns'
import React, { useState } from 'react'
import StarTabs from './StarTabs'
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader'
import picture from '../../../../images/profile_i.png'
import Image from '@/components/global/Image'
import { safeDate } from '@/static/data'

const Review = ({ratings=[],isLoading}) => {
    const [allReviews] = useState(ratings)
    const [reviews,setReviews] = useState(ratings)
    const [currentIndex,setCurrentIndex] = useState('all')
 
    const handleStarTabs =rating=>{
        setCurrentIndex(rating-1)
        if(rating === 'all'){
            setReviews(allReviews)
            setCurrentIndex('all')
        }else{
            const currentTabReview = allReviews.filter(review=>review.rating_value == rating)
            setReviews(currentTabReview)
        }
    }

  return (
    <div>
       <StarTabs currentIndex={currentIndex} handleStarTabs={handleStarTabs}/>
       {
        isLoading ? <AdminUserLoader/>:
        <div>
             {
                reviews.length == 0 ? <p>no rating for this designer</p>:
                  <div>
                     {
                    reviews.map(review=>{
                        return(
                            <div key={review.rating_id} className='shadow-lg p-8 rounded-lg mb-5 bg-gradient-to-tr from-primary to-sidebar to-[35%] text-lightGray'>
                                <div className='flex justify-between '>
                                    <div className='flex gap-2  items-center '>
                                    <Image src={review.profile_pic|| picture} className='w-[40px] h-[40px] rounded-full' data-testid="image" />
                                    <div>
                                        <h2 className=' capitalize font-[700] text-sm md:text-lg'>{review.rater_names}</h2>
                                        <p className='capitalize texd-xs md:text-sm'>{format(new Date(safeDate(review.rating_date)),'MMMM do, yyyy')}</p>
                                        {/* <p className='capitalize texd-xs md:text-sm'>{review.date}</p> */}
                                    </div>
                                </div>
                                <Stars rating={review.rating_value}/>
                                </div>
                                {/* <p className='mt-3'>{review?.comment}</p> */}
                                <p className='mt-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur sint mollitia dicta a doloremque in, magni corporis dignissimos adipisci inventore sed sit iusto!</p>

                            </div>
                        )
                    })
                }
                  </div>
             }
        </div>
       }
    </div>
  )
}

export default Review
