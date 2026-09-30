import React from 'react'
import { NavLink } from 'react-router-dom'
import { User, UserCheck } from 'lucide-react'


const RepresentativeTabs = () => {
  
  return (
    <div className='  bg-sidebar text-white py-2 px-4 lg:px-0 mt-2'>
        <div className='container'>
             <ul className='flex gap-16 md:gap-20 items-center '> 
               <li className={'text-white'}> 
                  <NavLink to={`/representative/profile`} className={ ({isActive})=>`flex  items-center md:gap-1 capitalize  ${isActive && "text-primary"}`}>
                        <User className='text-sm'/>
                        <span className='mt-[0.2rem]'>Profile</span>
                  </NavLink>
              </li>
               <li> 
                  <NavLink to={`/representative/referrals`} className={ ({isActive})=>`flex  items-center md:gap-1 capitalize  ${isActive && "text-primary"}`}>
                        <UserCheck className='text-sm'/>
                        <span className='mt-[0.2rem]'>Referrals</span>
                  </NavLink>
              </li>
          

      </ul>
        </div>
    </div>
  )
}

export default RepresentativeTabs