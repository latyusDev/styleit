import {creatorDashboardTabs } from '@/static/adminData'
import { useCreatorStore } from '@/store/useCreator'
import React, { useState } from 'react'
import OverflowHandler from '../../shared/OverflowHandler'


const CreatorDashboardTabs = () => {
    const {filterCreators} = useCreatorStore(state=>state)
    const [currentIndex,setCurrentIndex] = useState(0)
        const updateSearchData = (tab,index)=>{
            setCurrentIndex(index)
            filterCreators(tab)
        }
    
  return (
        <OverflowHandler className='max-w-[900px] pb-2 md:pb-0  mx-auto lg:mx-0  xl:max-w-none  md:w-full'>

        <div className={`flex w-[1000px] xl:w-auto`} >
        {
            creatorDashboardTabs.map((tab,index)=>{
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

export default CreatorDashboardTabs