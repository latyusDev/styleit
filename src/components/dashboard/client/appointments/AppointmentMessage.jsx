import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeclinedAppointmentReason from './DeclinedAppointmentReason'

const AppointmentMessage = ({appointment}) => {
    const {status,reason,bookingDate,bookingTime,clientName, creatorLname,creatorFname,paymentStatus,creatorPhone} = appointment
    const [greaterThanThirtyMins,setgreaterThanThirtyMins] = useState(false)
    const exceededOne = ()=>new Date().getTime() - new Date(`${bookingDate}T${bookingTime}`)>60000//1 min
   
    const checkTime = ()=>{
        if(status === 'not decided'&&exceededOne()){
            setgreaterThanThirtyMins(true)
        }
    }
    useEffect(()=>{
        const interval = setInterval(checkTime,1000);
        return ()=>clearInterval(interval)
    },[])

  return (
    <div className='text-gray-500' role='appointment-message'>
        <p className='text-sm md:text-[1rem] ' role='status'>Your appointment with 
            <span  className='text-black capitalize font-[500]'>  {creatorLname} {creatorFname}</span> is
            
             <span className={`font-[500]  ${(status ==='pending'|| status === 'not decided')&&'text-yellow-500'} ${status ==='accept'&&'text-green-600'} ${status ==='decline'&&'text-red-600'} ${status ==='completed'&&'text-blue-600'}`}> {status ==='paid'?'completed':status}</span>.
         {
         status==='accept'&& <p>You can reach out at {creatorPhone} to makeup decisions</p> } 
         {
          greaterThanThirtyMins &&<span role="urgent"> kindly book another if urgent. Click <Link to='/client/bookAppointment' className='text-purple-400'>Book Appointment </Link>{greaterThanThirtyMins&&'to book now'} </span> 
         } </p>
        {
            status==='decline'&&
           <DeclinedAppointmentReason reason={reason}/>
            
        }
        

    </div>
  )
}

export default AppointmentMessage