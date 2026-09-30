import React, { memo } from 'react'
import Image from '../Image'
import { Loader2 } from 'lucide-react'
import mobileLogo from '../../../images/m_logo.png' 
import { useAuth } from '@/store/useAuth'

const BookingNotification = ({handleBookingNotification,itemId,content,isBooking}) => {

  const {user} = useAuth();
  const isDesigner = user?.role === 'designer'
  return (
    <div className='mt-5 max-w-[800px] mx-auto shadow-md rounded-md   bg-gradient-to-tl to-pink-200  to-[60%] from-[40%] md:to-[50%] from-gray-50 md:from-[40.7%]'>
       <div className="p-5">
         <div className='flex justify-between'>
        <div className='flex gap-4 items-center'>
            <Image src={mobileLogo} />
            <p>Booking notification</p>
        </div>
            <p className='cursor-pointer' onClick={()=>handleBookingNotification({bookingId:content?.noti_bookappointmentid,id:content?.noteid})}>
              {isBooking&&itemId == content.noteid?<Loader2 className=" h-4 w-4 text-sm  text-primary animate-spin" />:<span className='text-sm md:text-md'>Mark as read</span> }</p>


    </div>
    {
    isDesigner ?  <p className='mt-5'>{content?.noti_client_firstname} book an appointment with you </p>:
    <p className='mt-5'>  You've booked an appointment  with a designer</p>
      
    }

       </div>
        <div className='bg-gradient-to-tl to-gray-300 from-pink-300 h-[0.06rem] w-full'/>
       <p className='px-5 pt-2 pb-5  text-right mt-2'>{content?.noti_date}</p>
       
        
    </div>   
  )
}

export default memo(BookingNotification)