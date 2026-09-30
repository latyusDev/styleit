import React, { useState } from 'react'
import BookingCard from './BookingCard'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import PostListLoader from '@/components/global/loaders/PostListLoader'
import { Link } from 'react-router-dom'
import ErrorMessage from '@/components/global/ErrorMessage'
import { useCreatorStore } from '@/store/useCreator'
import Paginator from '@/components/global/Paginator'

const PAGES_TO_SHOW = 3

const Bookings = () => {
    const [bookingId,setBookingId] = useState(null);
    const [page,setPage] = useState(1);
    const [image,setImage] = useState(null);
    const {getBookings} = useCreatorStore();
  

  const {data,isLoading,error,isError} = useQuery({
        queryKey:['bookings',page],
        queryFn:()=>getBookings(page),
        staleTime:1
  })

  return (
   <div className="container font-lato  px-4 xl:px-0 pb-16">
       <h1 className='text-center text-xl font-[700] capitalize my-9'>appointment list</h1>
        <div>
          {
            isLoading ? <PostListLoader/>:
           <>
              {
                isError?<ErrorMessage error={error}/>:
                 <div>
              {
                data?.data.bookings.length ===0 ?<div className='text-center border border-gray-200 py-16 rounded-md'>
              <h1 className='text-2xl text-gray-500'> You've have currently not been booked by any client</h1>
              <p className='text-gray-500 mt-3 text-md'>  <Link to='/creator/posts' className='text-primary'>Create</Link> more posts to attract clients</p>
          </div>:<div className='flex flex-col md:flex-row justify-center   md:flex-wrap gap-6  '>
      
      {data?.data.bookings.map(appointment=>{
        return(
            <BookingCard  key={appointment.id} setBookingId={setBookingId}
             bookingId={bookingId} appointment={appointment} image={image} setImage={setImage} page="bookings"/>
        )
      })}

    </div>
              }
            </div>
              }
           </>
            
          }

           {
            data?.data?.bookings.length > 0 && <Paginator
                  data={data?.data}
                  page={page}
                  setPage={setPage}
                  PAGES_TO_SHOW={PAGES_TO_SHOW}
                  currentPage={'booking'}
              />
           }

        </div>
   </div>
  )
}

export default Bookings