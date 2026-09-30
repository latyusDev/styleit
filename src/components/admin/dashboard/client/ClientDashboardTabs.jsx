import {clientDashboardTabs } from '@/static/adminData'
import React, { useState } from 'react'
import OverflowHandler from '../../shared/OverflowHandler'
import { useClientStore } from '@/store/useClient'


const ClientDashboardTabs = () => {
    const {filterClients} = useClientStore(state=>state)
    const [currentIndex,setCurrentIndex] = useState(0)
        const updateSearchData = (tab,index)=>{
            setCurrentIndex(index)
            filterClients(tab)
        }
    
  return (
    <div>
        <OverflowHandler className='max-w-[900px] pb-2 md:pb-0  mx-auto lg:mx-0  xl:max-w-none  md:w-full'>

        <div className={`flex w-[1000px] xl:w-auto`} >
        {
            clientDashboardTabs.map((tab,index)=>{
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
    </div>
  )
}

export default ClientDashboardTabs