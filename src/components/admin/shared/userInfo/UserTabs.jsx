import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/useAuth';
import React from 'react'
import { useLocation } from 'react-router-dom'

const UserTabs = ({currentTab,handleTabs}) => {
    const {pathname} = useLocation();
    const {user} = useAuth();

    const isCreator = pathname.includes('creator')
    const showBankDetailsTab = user?.role === 'superadmin'&& isCreator
  return (
    <div>
         <div className='flex mx-auto md:ml-0 pb-5 gap-4 w-[95%] overflow-x-auto md:w-[max-content] overflow-auto'>
            <Button className={`px-6 md:px-10 py-6 shadow-none capitalize text-md md:text-lg text-lightGray rounded-md bg-sidebar 
                ${currentTab === 'profile'&&'bg-primary text-white' } `} onClick={()=>handleTabs('profile')}>my profile</Button>
            <Button className={`px-6 md:px-10 py-6 shadow-none capitalize text-md md:text-lg text-lightGray rounded-md bg-sidebar 
                ${currentTab === 'loginDetails'&&'bg-primary text-white' } `} onClick={()=>handleTabs('loginDetails')}>login details</Button>
               {
                showBankDetailsTab&& <div className='flex gap-4'>
                <Button className={`px-6 md:px-10 py-6 shadow-none capitalize text-md md:text-lg text-lightGray rounded-md bg-sidebar 
                ${currentTab === 'bankDetails'&&'bg-primary text-white' } `} onClick={()=>handleTabs('bankDetails')}>bank details</Button>
                </div>
               }
              {
              isCreator&& <Button className={`px-6 md:px-10 py-6 shadow-none capitalize text-md md:text-lg text-lightGray rounded-md bg-sidebar 
               ${currentTab === 'reviews'&&'bg-primary text-white' } `} onClick={()=>handleTabs('reviews')}>ratings and reviews</Button>
              }
        </div>
        
    </div>
  )
}

export default UserTabs