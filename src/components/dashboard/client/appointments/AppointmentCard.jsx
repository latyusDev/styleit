import React, { useState } from 'react'
import BookingCard from '../../bookings/BookingCard'
import AppointmentMessage from './AppointmentMessage'
import Accepted from './Accepted'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { confirmDelivery } from '@/api/appointment'
import { useQueryClient } from '@tanstack/react-query'

const AppointmentCard = ({appointment}) => {
  const [isLoading,setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleConfirmDelivery = async(appointment)=>{
    setIsLoading(true)
      const response = await confirmDelivery(appointment);
      if(response.status === 200){
         toast("Delivery confirmed successfully", {
              action: {
              label: <X size={16} />,
            },
          })
          setIsLoading(false)
          queryClient.invalidateQueries('appointment')

      }else{
        toast(`${response?.data?.msg||response?.data?.message||
          'there is an issue confirming the delivery of task,kindly try again,'}`, {
              action: {
              label: <X size={16} />,
            },
          })
      setIsLoading(false)

      }
  }
  const isNotCollected = appointment.status === 'completed' && appointment.collectionStatus === 'not collected'
  const isCollected = appointment.collectionStatus === 'collected'
  const isAccepted = appointment.status === 'accept'&&appointment.paymentStatus !== 'paid'
  const isPaidAndAccepted  = appointment.paymentStatus === 'paid' && appointment.status === 'accept'
  return (
    <div role="appointment-card" className='border px-3 md:px-4 rounded-xl pt-4 pb-5'>
            <AppointmentMessage appointment={appointment} />
            <BookingCard  appointment={appointment} page='AppointmentDetails'  />
              {
             isPaidAndAccepted &&
              <div>
                  <p role='completed' className='text-center capitalize mt-5 text-blue-600 font-[500]'>payment completed</p>
                  <p className='text-center text-green-500'>work in progress...</p>
              </div> 
          }
          {
            isNotCollected && (
              <Button data-testid='confirm-delivery' onClick={()=>handleConfirmDelivery(appointment)} className='w-full mt-4 text-white bg-green-500'>{isLoading ? <span className='flex gap-1.5 items-center'><Loader2 className='animate-spin '/> Confirming...</span> : 'Confirm delivery' } </Button>
            )
          } 
          {
           isCollected && (
              <Button className='w-full mt-4 text-white bg-green-500 hover:bg-green-600'>Task Collected </Button>
            )
          } 
          {
            isAccepted &&<Accepted appointment={appointment}/>
          }

        </div>
  )
}
export default AppointmentCard