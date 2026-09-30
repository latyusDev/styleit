import Image from '@/components/global/Image'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Booking = ({booking,handleAction,id,isAll=true}) => {
    const location = useLocation();
    const isHidden = location?.pathname.endsWith('b');
  return (
     <li  className="relative list-none mt-10 md:mt-0 ">
        <div  className={`${booking.status=='accept'&&' shadow-sm shadow-green-300 '} 
    ${booking.status=='decline'&&' shadow-sm shadow-red-300'}
    ${booking.status=='completed'&&' shadow-sm shadow-blue-300'}
    ${(booking.status=='pending'||booking.status=='not decided')&&' shadow-sm shadow-yellow-300'}
        mt-5 shadow-md capitalize p-5 rounded-md relative`}>
            
            <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 md:gap-0 md:flex-row justify-between items-center'>
            <div className='flex items-end md:items-center justify-between  w-full md:w-auto md:basis-[20%]'>
            <p className='font-[700] capitalize md:hidden'>name:</p>
            <div className='flex items-center gap-3 '>
            <Image src={booking.client_pic} className="w-[50px] h-[50px] rounded-full"/>
            <p data-testid={`name-${booking.id||booking.booking_id}`}  >{booking.client_firstname} {booking.client_lastname}</p>
            </div>
            </div>
            
            <div className='flex justify-between  w-full md:w-auto md:basis-[16%]'>
            <p className='font-[700] capitalize md:hidden'>collection date:</p>
            <p data-testid={`collectionDate-${booking.id||booking.booking_id}`} >{booking.collection_date||booking.collectionDate}</p>
            </div>
            
            <div className='flex justify-between  w-full md:w-auto md:basis-[16%]'>
            <p className='font-[700] capitalize md:hidden'>booking date:</p>
            <p data-testid={`bookingDate-${booking.id||booking.booking_id}`} >{booking.booking_date}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[16%]'>
            <p className='font-[700] capitalize md:hidden'>status:</p>
            <p data-testid={`status-${booking.id||booking.booking_id}`} className={`basis-[16%] ${booking.status=='accept'&&' md:border-r-0  text-green-500'}
                ${booking.status=='decline'&&' md:border-r-0  text-red-500'}  ${booking.status=='completed'&&' md:border-r-0  text-blue-500'}
                ${(booking.status=='pending'||booking.status=='not decided')&&' md:border-r-0  text-yellow-500'} `}>{booking.status||booking?.booking_status}</p>
            </div>
            <p data-testid={`actionButton-${booking.id||booking.booking_id}`} className='basis-[10%] hidden md:block ' >
                <ChevronRight className={`transition-all duration-300  ml-4  ${id === (booking.id||booking.booking_id)&& 'rotate-90'} cursor-pointer`}
            onClick={()=>handleAction(booking.id||booking.booking_id)}/> </p>
        </div>

        {id === (booking.id||booking.booking_id)&& <div  data-testid='otherColumns' className='hidden md:block mt-8 md:max-w-[800px]'>
        <ul className=' hidden md:flex flex-row justify-between capitalize w-full font-[700] p-3 '>
        <li className='basis-[16%]'>receiver</li>
        <li className='basis-[25%]'>collection time</li> 
        <li className='basis-[20%]'>booking time</li>
    </ul>
        
            <div className='flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center '>
            <div className='flex justify-between  w-full md:w-auto md:basis-[25%]'>
            <p data-testid={`receiver-${booking.id||booking.booking_id}`}  className='ml-3'>{booking.creator_businessName} </p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[25%]'>
            <p className='font-[700] capitalize md:hidden'>collection time:</p>
            <p data-testid={`collectionTime-${booking.id||booking.booking_id}`} className='basis-[40%]  -ml-12 lowercase'>{booking.collectionTime}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[16%]'>
            <p className='font-[700] capitalize md:hidden'>booking time:</p>
            <p data-testid={`bookingTime-${booking.id||booking.booking_id}`} className='basis-[60%]  -ml-9 lowercase'>{booking.booking_time||booking.booking_Time}</p>
            </div>
        </div>
        
        {
            isAll&&<Link to={`${booking.client_id}/b`} className='text-center capitalize  block text-primary mt-7 animate-bounce pr-4'>view all</Link>
        }
        
        </div>
            }

            <div className='mt-3 md:max-w-[800px] md:hidden'>
        <ul className=' hidden md:flex flex-row justify-between capitalize w-full font-[700] p-3 '>
        <li className='basis-[16%]'>receiver</li>
        <li className='basis-[25%]'>collection time</li> 
        <li className='basis-[20%]'>booking time</li>
    </ul>
            <div className='flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center '>
            <div className='flex justify-between w-full md:w-auto md:basis-[25%]'>
            <p className='font-[700] capitalize md:hidden'>receiver:</p>
            <p data-testid={`receiver-${booking.id||booking.booking_id}`} className='mr-2' >{booking.creator_businessName} </p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[25%]'>
            <p className='font-[700] capitalize md:hidden'>collection time:</p>
            <p data-testid={`gender-${booking.id||booking.booking_id}`} className='basis-[16%] lowercase'>{booking.collectionTime}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[16%]'>
            <p className='font-[700] capitalize md:hidden'>booking time:</p>
            <p data-testid={`gender-${booking.id||booking.booking_id}`} className='basis-[16%] lowercase'>{booking.booking_time||booking.booking_Time}</p>
            </div>
        </div>

            {
                isHidden|| <Link to={`${booking.client_id}/b`} className='text-center capitalize  block text-primary mt-7 animate-bounce pr-4'>view all</Link>

            }
        
        </div>
        </div>
        
    </li>
  )
}

export default Booking