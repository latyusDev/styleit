import React, { useState } from 'react'
import Review from '../creator/ratingAndReview/Review'
import RatingAnalysis from '../creator/ratingAndReview/RatingAnalysis'

const RatingAndReviews = ({ratings,creator,isLoading}) => {
  const [currentTab,setCurrentTab] = useState(false)

  const updateTab =tabId=>{
    if(tabId === 'feedback'){
      setCurrentTab(false)
    }else{
      setCurrentTab(true)
    }
  }
  return (
   <div className='font-lato'>
    <h1 className='mb-5'>Business Name : {creator?.businessName}</h1>

    <div className='flex '>
        <button className={`flex-[0.5] capitalize font-[700] ${!currentTab ? 'border-b-4  text-primary border-primary':'border-b-4 text-sidebar border-sidebar'}  mb-9 py-3 rounded-bl-lg`} onClick={()=>updateTab('feedback')} > customers feedback</button>
        <button className={`flex-[0.5] capitalize font-[700] ${currentTab ? 'border-b-4  text-primary border-primary':'border-b-4 text-sidebar border-sidebar'}  mb-9 py-3 rounded-br-lg`}  onClick={()=>updateTab('rating')}>rating analysis</button>
    </div>

    {
      currentTab ? (
<div className='flex-[0.4]'>

          <RatingAnalysis ratingAnalysis={creator?.star_summary}/>
      </div>
      ):(
      <div className='flex-[0.6] mt-2'>
    
        <Review ratings={ratings} isLoading={isLoading}/>

      </div>
        
      )
    }
     
   </div>
  )
}

export default RatingAndReviews