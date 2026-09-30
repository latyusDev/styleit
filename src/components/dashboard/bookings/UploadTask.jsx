import AnimatedButton from '@/components/global/AnimatedButton';
import Image from '@/components/global/Image';
import { Button } from '@/components/ui/button';
import { useCreatorStore } from '@/store/useCreator';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2, X } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

const UploadTask = ({appointment,bookingId,setBookingId}) => {
    const {uploadTask} = useCreatorStore()
    const formData = new FormData();
    const [serverImage,setServerImage] = useState(null);
    const [image,setImage] = useState(null);
    const [isLoading,setIsLoading] = useState(false)
    const queryClient = useQueryClient()

    const handleUpload = (e,id) => {
        const file = e.target.files[0]
        if (!file) return ;
        setServerImage(file)
        const imageUrl =URL.createObjectURL(file)
        setBookingId(id)
        setImage(imageUrl);
    }

    const handleUploadTask = async()=>{
       formData.append('pic',serverImage)
       formData.append('custid',appointment.clientId)
       formData.append('status','completed')
       setIsLoading(true)
        const response = await uploadTask(formData,appointment.bookingId);
        if(response.status === 200){
          setImage('')
            toast("Design uploaded successfully", {
                action: {
                label: <X size={16} />,
              },
            })
        queryClient.invalidateQueries('appointment')

        }
        if(response.status === 400){
          toast(`${response?.data?.msg||response.response?.data?.message
          }`, {
                action: {
                label: <X size={16} />,
              },
            })
        }
      setIsLoading(false)

        }

    const inputId = appointment?.bookingId
    const isCompleted = appointment.status === 'completed' && appointment.paymentStatus === 'paid'

    return (
    <div>
    {image&&appointment?.bookingId===bookingId?
    <div>
         {
          image&&<div className='relative'>
                  {
                    !isLoading&&<Trash2 onClick={()=>setImage('')} className='absolute cursor-pointer text-red-500 top-2 right-2'/>
                  }
                  <Image src={image} className='w-full h-[200px] object-cover rounded-md my-2'/>
          </div>
         }
        <Button onClick={handleUploadTask}  disabled={isLoading} className='w-full cursor-pointer text-center text-white bg-green-500 flex items-center justify-center gap-4 p-2.5' >
             {
                      isLoading ? <>
                      <Loader2 className='animate-spin'/> <span>Uploading...</span>
                      </>:  <span className='capitalize'> submit </span>
                    }
           </Button>
    </div>
    :
           <div>
              <input 
                  type="file" 
                  className='hidden' 
                  name="upload" 
                  id={inputId}
                      disabled={isCompleted}

                  onChange={(e) => handleUpload(e, appointment.bookingId)}
              />
                 <AnimatedButton>
              <label htmlFor={inputId}>
                   <Button 
                      asChild
                      className='w-full cursor-pointer p-2.5 text-center rounded-lg text-white bg-green-500'
                  >
                      <span>{isCompleted ? 'Task uploaded and delivered':'Upload your task'}</span>
                  </Button>
              </label>
                 </AnimatedButton>
          </div>
            }
    </div>
  )
}

export default UploadTask