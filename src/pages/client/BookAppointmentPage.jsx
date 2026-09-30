import BookAppointment from '@/components/dashboard/client/appointments/BookAppointment'
import React from 'react'

const BookAppointmentPage = () => {
  return (
    <section data-testid="book-appointment" className='container font-lato'>
        <h1 className='text-xl font-[700] capitalize text-center my-12'>book appointment</h1>
        <BookAppointment/>
    </section>
  )
}

export default BookAppointmentPage