import Appointments from '@/components/dashboard/client/appointments/Appointments'
import React from 'react'
import { Link } from 'react-router-dom'

const AppointmentDetails = () => {
  return (
    <section data-testid="appointment-details" className='container pb-20'>
       <Appointments/>
        <Link to='/client/bookAppointment'>
         <button
             className="fixed bottom-8 cursor-pointer right-8 py-3 px-4 rounded-lg shadow-2xl transition-all duration-1000 text-white transform hover:scale-110 hover:rotate-6 z-50 border-4 border-white animate-bounce"
             style={{
               backgroundColor: '#FF617C'
             }}
             aria-label="Scroll to top"
           >
             Fast booking
           </button></Link>
    </section>

  )
}

export default AppointmentDetails