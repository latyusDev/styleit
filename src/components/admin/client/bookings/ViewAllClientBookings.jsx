import { useAdminClientStore } from '@/store/admin/clientStore/useAdminClient';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Booking from './Booking';
import ErrorMessage from '@/components/global/ErrorMessage';
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader';
import BookingHeader from './BookingHeader';
import Paginator from '@/components/global/Paginator';

const PAGES_TO_SHOW = 3
const  ViewAllClientBookings = () => {
  const {viewAllClientBookings} = useAdminClientStore();
  const {id} = useParams();
  const [page,setPage] = useState(1);
  const [bookingId,setBooingId] = useState(null)
  

     const {data,isLoading,isError,error} = useQuery({
        queryKey:['admin-bookings',id,page],
        queryFn:()=>viewAllClientBookings(id),
        staleTime: 1000 * 60 * 3,
        });
           
    const handleAction = (bookingId)=>{
    if(id === bookingId){
            setBooingId(null)
        }else{
            setBooingId(bookingId)
        }
    }
        
  return (
    <div> 
      <h1 className='text-xl font-bold font-lato'>All Bookings</h1>
      
      <BookingHeader/>
        {
        isLoading?(
            <AdminUserLoader/>
        ):(
             <div>
                {
                    isError?<ErrorMessage error={error}/>:
                    <div>
                        {
                          data?.appointments.length === 0 ? <h1 className='text-center mt-16 text-xl font-semibold'> This client only has one booking</h1>:
                          <ul>
                        {
                          data?.appointments.map(appointment=>{
                            return <Booking booking={appointment}  key={appointment?.id||appointment?.booking_id}
                            id={bookingId}
                            isAll={false}
                             handleAction={handleAction}/>
                          })
                        }
                    </ul>
                        }

                    </div>
                }
                </div>
        )
}

    {
      data?.appointments.length > 0 &&
      <Paginator
        data={data}
        page={page} 
        setPage={setPage} 
        PAGES_TO_SHOW={PAGES_TO_SHOW} />
    }
    </div>
  )
}

export default  ViewAllClientBookings