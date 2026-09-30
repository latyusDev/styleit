import React from 'react'
import profile from '../../../images/profile.png'
import profile_h from '../../../images/profile_h.png'
import receipt from '../../../images/receipt-edit.png'
import receipt_h from '../../../images/receipt-edit_h.png'
import calendar_h from '../../../images/calendar-edit_h.png'
import calendar from '../../../images/calendar-edit.png'
import calendar_2 from '../../../images/calendar-edit_2.png'
import icon_n2 from '../../../images/Icon_n2.png'
import Image from '@/components/global/Image'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/store/useAuth'


const LinkTabs = () => {
    const location = useLocation();
    const {user} = useAuth(state=>state)
  return (
    <div className='flex-1 md:flex-initial'>
              {
                user?.role !== 'client'?<ul className='flex justify-between md:gap-20 items-center '> 
                <li> 
                  <NavLink to={`/creator/profile`} className={ ({isActive})=>`flex  items-center md:gap-1 capitalize  ${isActive && "text-green-400"}`}>
                    <Image src={location.pathname.endsWith('profile') ? profile_h:profile} className='w-[20px] h-[20px]' alt="" />
                        <span className='blofck'>profile</span>
                  </NavLink>
              </li>
              <li> 
              
              <NavLink to={`/creator/posts`} className={ ({isActive})=>`flex justify-between items-center md:gap-1 capitalize  ${isActive && "text-green-400"}`}>
                <Image src={location.pathname.endsWith('posts') ? receipt_h:receipt} className='w-[20px] h-[20px]' alt="" />
                    <span className='block'>posts</span>
              </NavLink>
              </li> 
              <li> 

              <NavLink to={`/creator/bookings`} className={ ({isActive})=>`flex justify-between items-center md:gap-1 capitalize  ${isActive && "text-green-400"}`}>
                <Image src={location.pathname.endsWith('bookings') ? calendar_h:calendar} className='w-[20px] h-[20px]' alt="" />
                    <span className='block'>bookings</span>
              </NavLink>
              </li> 

        </ul>:
        <ul className='flex justify-between md:gap-20 items-center '> 
               <li> 
                  <NavLink to={`/client/profile`} className={ ({isActive})=>`flex  items-center md:gap-1 capitalize  ${isActive && "text-green-400"}`}>
                    <Image src={location.pathname.endsWith('profile') ? profile_h:profile} className='w-[20px] h-[20px]' alt="" />
                        <span className='mt-[0.2rem]'>profile</span>
                  </NavLink>
              </li>
              <li> 
              
              <NavLink to={`/client/likedPosts`} className={ ({isActive})=>`flex justify-between items-center md:gap-1 capitalize  ${isActive && "text-green-400"}`}>
                <Image src={location.pathname.endsWith('likedPosts') ? icon_n2:icon_n2} className=' w-[25px] h-[25px]' alt="" />
                    <span className='block'>Liked Post</span>
              </NavLink>
              </li> 
              <li> 
              <NavLink to={`/client/appointmentDetails`} className={ ({isActive})=>`flex justify-between items-center md:gap-1 capitalize  ${isActive && "text-green-400"}`}>
                <Image src={location.pathname.endsWith('appointmentDetails') ? calendar_2:calendar_2} className='w-[20px] h-[20px]' alt="" />
                    <span className='block'>Appointment Details</span>
              </NavLink>
              </li> 

      </ul>

}
        
    </div>
  )
}


export default LinkTabs