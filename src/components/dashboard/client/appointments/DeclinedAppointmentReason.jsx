import React from 'react'
import { Link } from 'react-router-dom'

const DeclinedAppointmentReason = ({reason}) => {
  return (
        <div role="reason">
            <h3 className='font-[500] text-black mt-5'>Reason:</h3>
            <p className='text-sm md:text-[1rem]'>{reason}</p>
            <p className=' mt-4'>click <Link to='/fashionDesigners' className='text-blue-500'> Designers</Link> to view list of designers and book appointment</p>
        </div>  
    )
}

export default DeclinedAppointmentReason