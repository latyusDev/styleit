import React, { useState } from 'react'
import UserTabs from './UserTabs'
import CurrentInformation from './CurrentInformation'

const UserInformation = () => {
    const [currentTab,setCurrentTab] = useState('profile')
    const handleTabs = (tab)=>{
        setCurrentTab(tab)
    }
  return (
    <div className=' mt-6'>
            <UserTabs 
         currentTab={currentTab} 
         handleTabs={handleTabs} 
        setCurrentTab={setCurrentTab} />
        <div className='mt-2'>
          <CurrentInformation currentTab={currentTab} />
        </div>
        
    </div>
  )
}

export default UserInformation