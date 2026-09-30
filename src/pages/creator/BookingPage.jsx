import Bookings from '@/components/dashboard/bookings/Bookings'
import React from 'react'

const  BookingPage = () => {
  return (
    <section data-testid="bookings-page"  className='container'>
      <Bookings/>
    </section>
  )
}

export default  BookingPage