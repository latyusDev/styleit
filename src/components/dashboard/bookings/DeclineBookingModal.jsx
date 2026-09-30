import AnimatedButton from '@/components/global/AnimatedButton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'
import { Loader, X } from 'lucide-react'
import React, { useState } from 'react'

const DeclineBookingModal = ({updateDeclineAppointment,setIsDeclined,isPending}) => {
    const [reason,setReason] = useState('');
    const handleDecline=async()=>{
        updateDeclineAppointment({reason});
        setIsDeclined(false)
    }

  return (
 <div className='px-5 font-lato py-6  flex justify-center  gap-3 bg-[rgba(0,0,0,0.1)]  items-center z-[999]  fixed top-0  bottom-0 left-0 right-0  overflow-hidden transition-all duration-300 '>
    
       <div className="bg-white  shadow-md rounded-md relative z-50 w-full md:w-[600px]">
            <div className="border-b-[1px] border-gray-300 pdy-1 px-4">
                   <div className='max-w-[700px] ml-auto  flex items-center justify-between'>
                      <h1 className='font-[500] md:font-bold text-lg md:text-xl'>Reasons to decline this appointment</h1>
                <X
                className='cursor-pointer h-16 w-16 scale-[0.5] transition-all duration-300 hover:scale-[0.7]' 
                onClick={()=>setIsDeclined(false)}
                />
                  </div>
                 </div>
         <div className='   overflow-y-auto  shadow-md rounded-md w-[600pxx] p-7 py-4'>
     <div className='relative'>
        <Textarea placeholder="What are your reasons" value={reason} onChange={(e)=>setReason(e.target.value)} className='h-[200px] placeholder:text-xl  shadow-md mt-5 focus-visible:ring-0 '/>
        </div>
             <AnimatedButton>
                   <Button onClick={handleDecline} disabled={reason?false:true} 
                className='bg-red-600 text-white w-full mt-8 py-4 font-[700] capitalize'>{isPending&&<Loader className='animate-spin'/>} submit</Button>
        
             </AnimatedButton>
     
    </div>
       </div>
    </div>  )
}

export default DeclineBookingModal