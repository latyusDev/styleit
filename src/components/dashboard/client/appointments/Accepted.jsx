import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Accepted = ({appointment}) => {
  return (
    <div className='mt-3' role='accepted'>
        <p role="negotiate" className='bg-s_primary py-2 px-5 text-sm mb-5 rounded'>if negotiatiotion is sealed, kindly make payment below</p>
   <div className='flex justify-between gap-3'>
        <Button className=" md:text-ledft w-full shadow-none text-white hover:bg-white hover:text-black border border-primary  bg-primary   py-6 rounded px-4 font-[500] text-sm">
          <Link to={`/client/payment/${appointment.creatorLname+' '+appointment.creatorFname}/${appointment.bookingId}/${appointment.creatorId}`} className=' block w-full'>Make payment</Link>
          </Button>
        <Button className=" w-full shadow-none hover:text-white border bg-white border-primary hover:bg-primary  py-6 text-sm">Cancel</Button>
   </div>

    </div>
  )
}

export default Accepted