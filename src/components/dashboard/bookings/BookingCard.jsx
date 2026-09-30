import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import DeclineBookingModal from './DeclineBookingModal';
import UploadTask from './UploadTask';
import { acceptAppointment, declineAppointment } from '@/api/appointment';
import AnimatedButton from '@/components/global/AnimatedButton';

const BookingCard = ({appointment,page,bookingId,
  setBookingId}) => {
  const [isDeclined,setIsDeclined] = useState(false);
      const queryClient = useQueryClient();
      const {mutate,isPending,error} = useMutation({
        mutationFn:declineAppointment,
        onSuccess:(response)=>{
        if(response?.status === 200){
           toast("appointment declined successfully", {
                action: {
                label: <X size={16} />,
              },
            })
        }
        queryClient.invalidateQueries(['appointment'])
        }
      })
      const updateDeclineAppointment = async(reason)=>{
        mutate({appointment,reason})
      }

        const {mutate:acceptMutation,isPending:acceptStatus,error:acceptError} = useMutation({
        mutationFn:acceptAppointment,
        onSuccess:(response)=>{
            if(response?.status === 200){
           toast("Appointment accepted successfully", {
                action: {
                label: <X size={16} />,
              }, 
            })
        }
        queryClient.invalidateQueries(['appointment'])
        }
      })

      const updateAcceptAppointment = async()=>{
        acceptMutation(appointment)
      }
      
      const isCurrentPage = page === 'bookings'

    return (
      <div>

      <div role='booking-card' className={`${isCurrentPage&&'shadow px-3 md:px-5 py-4'} basis-[max-content] rounded-xl `}>
             {
            isCurrentPage&&
            <p className='text-sm md:text-[1rem] text-gray-500 capitalize '><span className='mr-3 text-black  font-[700]  '>name:</span>{appointment.clientfname} {appointment.clientlname}</p>
            }
            <p className='text-sm md:text-[1rem] text-gray-500 mt-3.5'><span className='mr-3 text-black  font-[700] capitalize '>booking date:</span>{appointment.bookingDate}</p>
            <p className='text-sm md:text-[1rem] text-gray-500 mt-3.5'><span className='mr-3 text-black  font-[700] capitalize '>booking time:</span>{appointment.bookingTime}</p>
            <p className='text-sm md:text-[1rem] text-gray-500 mt-3.5'><span className='mr-3 text-black  font-[700] capitalize '>collection date:</span>{appointment.collectionDate}</p>
            <p className='text-sm md:text-[1rem] text-gray-500 mt-3.5'><span className='mr-3 text-black  font-[700] capitalize '>collection time:</span>{appointment.collectionTime}</p>
          {/* for creator */}
            {
              
              isCurrentPage&&<div className='mt-4'>

                {
                  appointment.paymentStatus === 'paid'?
                   <UploadTask appointment={appointment} 
                      bookingId={bookingId} setBookingId={setBookingId}/>:
                      <div className='flex'>
                                {/* accept */}
                          <AnimatedButton>
                              <Button onClick={updateAcceptAppointment} disabled={appointment.status === 'accept'?true:false}
                              className="bg-green-700 hover:bg-green-800 px-5  md:px-8 py-6 md:py-5 mr-4 md:mr-2 text-white capitalize rounded-xl"> 
                                {acceptStatus?<span className='flex items-center'><Loader2 className='animate-spin' /> accepting</span>:'accept'}</Button>
                         </AnimatedButton>

                            {/* decline */}
                          <AnimatedButton>
                              <Button onClick={()=>setIsDeclined(true)} disabled={appointment.status === 'decline'? true:false}
                              className="bg-red-600 hover:bg-red-800 px-5  md:px-8 py-6 md:py-5 text-white capitalize rounded-xl"> 
                                {isPending?<span className='flex items-center'><Loader2 className='animate-spin' /> declining</span>:'decline'}</Button>
                              
                         </AnimatedButton>
                
                      </div>
                }
              </div>
            }
        </div>
            {
              isDeclined&&<DeclineBookingModal updateDeclineAppointment={updateDeclineAppointment}
              setIsDeclined={setIsDeclined } isPending={isPending} isDeclined={isDeclined}/>
            }
      </div>
      
    )
}

export default BookingCard;

