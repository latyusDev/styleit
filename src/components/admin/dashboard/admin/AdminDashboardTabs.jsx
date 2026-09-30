import { adminDashboardTabs, dadmins } from '@/static/adminData'
import React, { useEffect, useState } from 'react'
import OverflowHandler from '../../shared/OverflowHandler'

const  AdminDashboardTabs = ({setAdmins}) => {

    const [currentIndex,setCurrentIndex] = useState(0)
    
        const updateSearchData = (tab,index)=>{
            setCurrentIndex(index)
           const currentTabData = dadmins.filter(admin=>admin.status === tab);
           if(tab === 'all'){
                setAdmins(dadmins)
           }else if(tab === 'leader board'){
                setAdmins(dadmins.slice(0,2))
           }else{
               setAdmins(currentTabData)
           }
        }
    
  return (
<OverflowHandler className='max-w-[600px]  pb-2 md:pb-0 mx-auto lg:mx-0  md:max-w-none  md:w-full'>

        <div className={`flex w-[600px]  md:w-auto`} >  
        {
            adminDashboardTabs.map((tab,index)=>{
                return(

                    <div className='flex-[0.4]'>
                        <button  className={`w-full border-b-[3px] border-sidebar
                         text-lightGray capitalize py-2
                         ${index === currentIndex?'border-primary border-b-primary text-primary':'text-sidebar' }`}
                         onClick={()=>updateSearchData(tab,index)}
                         >{tab}</button>
                    </div>
                )
            })
        }
    </div>
   
   </OverflowHandler>
  )
}

export default  AdminDashboardTabs