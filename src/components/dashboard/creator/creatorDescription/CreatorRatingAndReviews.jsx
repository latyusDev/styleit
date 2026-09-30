import { useAuth } from '@/store/useAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Loader2, Star, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CreatorRatingAndReviews = ({firstName}) => {
    const [isLoading,setIsLoading] = useState(false)
    const [rating, setRating] = useState(0);
    const [validate,setValidate] = useState(false)
    const [hoverRating, setHoverRating] = useState(0);
    const {user} = useAuth();
    const {id} = useParams();
    const data = {
    rate: rating,
    desid: id,
    custid: user?.id
}
    const checkReview = rating>0

     const handleRatingAndReview = async()=>{
      if(checkReview){
        setValidate(false)
         try{
        setIsLoading(true)
          const response = await axios.post('rating/',data,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          if(response.status === 201){
            toast("Rating", {
              description: <p className='text-white'>Thank you for rating {firstName}  &#x1F44D;</p>,
              action: {
              label: <X size={16} />,
            },
          })
          }
          return response?.data
      }catch(error){
          toast("message", {
              description: error?.response?.message||error.message||'Something went wrong, try again later',
              action: {
              label: <X size={16} />,
            },
          })
        
      }
      finally{
        setIsLoading(false)
      }
      }else{
          setValidate(true)
      }
     }
     
     useEffect(()=>{
        if(checkReview){
          setValidate(false)
        }
     },[rating])

  return (
    <section className='mt-40'>
          
        {/* Rating & Review Section */}
        <div className=" bg-white rounded-xl shadow-lg overflow-hidden borders-4" style={{borderColor: '#FF617C'}}>
            <div className=" px-8 py-6" style={{backgroundColor: '#FF617C'}}>
            <h2 className="text-3xl font-bold text-white">Rating</h2>
            <p className="text-white opacity-90 mt-1">kindly rate <span className='capitalize'> {firstName}</span></p>
            {/* <h2 className="text-3xl font-bold text-white">Rate & Review</h2>
            <p className="text-white opacity-90 mt-1">Share your experience working with Adebayo</p> */}
          </div>
          
          <div className=" p-8">
            {/* Rating Form */}
            <div className=" flex-[0.5] mb-8 p-6 rounded-2xl bg-[#FFE5EA]">
              <div className="mb-6">
                <label className="block text-center text-gray-900 font-semibold mb-3 text-xl capitalize">Rate {firstName} </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-7 md:w-10 md:h-10 ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
               {
                validate&&<p className=' text-red-500'>Kindly rate <span className='capitalize'> {firstName}</span> </p>
              } 
              {/* important */}
              {/* <div>
                <label className="block text-gray-900 font-semibold mb-3 text-lg">Your Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your thoughts about working with Adebayo..."
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none  resize-none"
                  style={{borderColor: '#FF617C'}}
                  rows="4"
                ></textarea>
              </div>
              {
                validate&&<p className='text-red-500'>rate Adebayo and write review</p>
              } */}
              <button
                onClick={handleRatingAndReview}
                disabled={isLoading}
                className={`w-full mt-6 bg-[#FF617C] cursor-pointer flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl`}
       
              >
                {isLoading&& <Loader2 className='animate-spin'/>} Submit Review
              </button>
            </div>
            
          </div>
        </div>
              {/* important */}

         {/* Reviews List */}
           {/* 
            <div className=' mt-20'>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Client Reviews</h3>
            <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 transition-colors" 
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FF617C'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                  >
                    <div className="flex justify-between items-centerf md: items-start mb-3">
                      <div className='flex items-start gap-3'>
                            <Image src={review.profile_pic|| picture} className='w-[40px] h-[40px] rounded-full' data-testid="image" />
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{review.name}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>

                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
               */}

    </section>
  )
}

export default CreatorRatingAndReviews