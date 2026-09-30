import React, { useState } from 'react'
import Bookings from '../../client/bookings/Bookings'
import DashboardBookingTabs from './DashboardBookingTabs'
import Booking from '../../client/bookings/Booking'
import BookingHeader from '../../client/bookings/BookingHeader'

const DashboardBookings = ({bookings}) => {
  const [id,setId] = useState(null)
     
  const handleAction = (bookingId)=>{
  if(id === bookingId){
          setId(null)
      }else{
          setId(bookingId)
      }
  }

  return (
    <div>
        {/* <DashboardBookingTabs/> */}
        <h1 className='text-center text-5xl mb-3 font-bold'>Latest Bookings</h1>

        <div className='mt-5'>
          <BookingHeader/>
        </div>
      <ul>
         {
                bookings.map(booking=>{
                    return(
                       <Booking key={booking.id||booking.booking_id} id={id} handleAction={handleAction} booking={booking} />
                       
                    )

                })
            }
        </ul>

    </div>
  )
}

export default DashboardBookings