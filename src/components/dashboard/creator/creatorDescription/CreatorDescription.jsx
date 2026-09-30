import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import CreatorRatingAndReviews from './CreatorRatingAndReviews';
import { useQuery } from '@tanstack/react-query';
import { useCreatorStore } from '@/store/useCreator';
import { useParams } from 'react-router-dom';
import UserProfileLoader from '@/components/global/loaders/ProfileLoaders';

export default function CreatorDescriptions () {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Amara Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment: "Exceptional work! The designs perfectly captured the essence of our brand while celebrating African heritage."
    },
    {
      id: 2,
      name: "Kwame Osei",
      rating: 4,
      date: "1 month ago",
      comment: "Creative, professional, and timely. Highly recommend for any project requiring authentic African design elements."
    },
    {
      id: 3,
      name: "Zainab Mohammed",
      rating: 4,
      date: "2 months ago",
      comment: "Beautiful work with vibrant colors and patterns. Great attention to cultural details."
    }
  ]);
  const {getCreatorDetails} = useCreatorStore();
  const {id} = useParams()

  
       const {data,isLoading,error,isError} = useQuery({
        queryKey:['creator-details',id],
        queryFn: ()=>getCreatorDetails(id),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
     })


  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen ">
      {/* African Pattern Header */}
      
      <div className="container px-4 py-12">
        {/* Designer Profile Section */}
        {
          isLoading ? <div>
                    '<UserProfileLoader/>'
          </div>:
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border-4 border-pink-400">
          {/* Banner with African Pattern */}
          <div className="h-48 relative overflow-hidden" style={{
            background: 'linear-gradient(to right, #FF617C, #FF8BA0, #FFB3C4)'
          }}>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)'
            }}></div>
          </div>
          
          {/* Profile Content */}
          <div className="relative px-4 md:px-8 pb-8">
            {/* Profile Image */}
            <div className="absolute -top-20 left-8">
              <div className="w-40 h-40 rounded-full border-8 border-white shadow-2xl" style={{
                background: 'linear-gradient(to bottom right, #FF617C, #FF8BA0)'
              }}>
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <span className="text-6xl text-white font-bold uppercase">{data?.desi_fname?.substring(0,1)}{data?.desi_lname?.substring(0,1)}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-24">
              <div className="flex justify-between items-center md:items-start">
                <div>
                  <h1 className="text-lg md:text-4xl font-bold capitalize text-gray-900 mb-2">{data?.desi_fname} {data?.desi_lname}</h1>
                  <p className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#FF617C' }}>Styleit Africa Designer</p>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5" style={{ color: '#FF617C' }} />
                      <span>{data?.address}</span>
                    </div>
                   
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                    <span className="text-lg md:text-3xl font-bold text-gray-900">{data?.rating_counts?.average_rating?.toFixed(1)}</span>
                  </div>
                  {/* <p className="text-gray-600">{reviews.length} Reviews</p> */}
                </div>
              </div>
              
              <div className="mt-6 p-6 rounded-2xl border-l-4" style={{
                background: 'linear-gradient(to right, #FFE8ED, #FFF0F3)',
                borderColor: '#FF617C'
              }}>
                <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {data?.desi_bio}
                </p>
                {/* <p className="text-gray-700 leading-relaxed mb-4">
                  A dedicated fashion designer with five years of professional experience, skilled in creating modern, stylish, and functional clothing for diverse audiences. Known for combining creativity with strong technical ability, the designer excels in sketching concepts, selecting fabrics, and producing high-quality garments that reflect current trends. With a solid understanding of pattern-making, garment construction, and fashion illustration, they consistently deliver designs that balance aesthetics and comfort
                </p> */}
               
              </div>
            </div>
          </div>
        </div>
        }
      
      
      <CreatorRatingAndReviews
       reviews={reviews}
      firstName={data?.desi_fname} 
      lastNamr={data?.desi_lname}
       />
      </div>
      
    </div>
  );
}