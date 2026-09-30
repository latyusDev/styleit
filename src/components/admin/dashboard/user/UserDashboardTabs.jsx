import { userDashboardTabs } from '@/static/adminData'
import React, { useState } from 'react'
import OverflowHandler from '../../shared/OverflowHandler'

const UserDashboardTabs = () => {
    const [currentIndex,setCurrentIndex] = useState(0)
  return (
   <div>
<OverflowHandler className='max-w-[600px]  pb-2 md:pb-0 mx-auto lg:mx-0  md:max-w-none  md:w-full'>

        <div className={`flex w-[600px]  md:w-auto`} >        
            {
            userDashboardTabs.map((tab,index)=>{
                return(

                    <div className='flex-[0.4]'>
                        <button  className={`w-full border-b-[3px] border-sidebar text-lightGray capitalize py-2
                         ${index === currentIndex?'border-primary border-b-primary text-primary':'text-sidebar' }`}
                         onClick={()=>setCurrentIndex(index)}
                         >{tab.name}</button>
                    </div>
                )
            })
        }
    </div>
    </OverflowHandler>

    {
        userDashboardTabs[currentIndex].component
    }
   </div>
  )
}

export default UserDashboardTabs