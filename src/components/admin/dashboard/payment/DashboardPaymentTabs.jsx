import { bookingDashboardTabs, paymentDashboardTabs } from '@/static/adminData'
import { useClientStore } from '@/store/useClient'
import { useCreatorStore } from '@/store/useCreator'
import React, { useState } from 'react'
import OverflowHandler from '../../shared/OverflowHandler'

const DashboardPaymentTabs = () => {
     const [currentIndex,setCurrentIndex] = useState(0)
        const {filterPayments} = useCreatorStore(state=>state)
        const updateTab = (tab,index)=>{
            setCurrentIndex(index)
            filterPayments(tab)
        }
  return (
  <OverflowHandler className='max-w-[600px]  pb-2 md:pb-0 mx-auto lg:mx-0  md:max-w-none  md:w-full'>

        <div className={`flex w-[600px]  md:w-auto`} >
            {
                paymentDashboardTabs.map((tab,index)=>{
                    return(
                        <div className='flex-[0.4]'>
                            <button  className={`w-full border-b-[3px] border-sidebar
                                text-lightGray capitalize py-2
                                ${index === currentIndex?'border-primary border-b-primary text-primary':'text-sidebar' }`}
                                onClick={()=>updateTab(tab,index)}
                                >{tab}</button>
                        </div>
                    )
                })
            }
        </div>
        </OverflowHandler>
  )
}

export default DashboardPaymentTabs