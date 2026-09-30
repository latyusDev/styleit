import React, { useState } from 'react'
import CreatorPayments from '../../creator/payment/CreatorPayments'
import { paymentDashboardTabs } from '@/static/adminData'
import { useCreatorStore } from '@/store/useCreator'
import DashboardPaymentTabs from './DashboardPaymentTabs'
import CreatorPaymentHeader from '../../creator/payment/CreatorPaymentHeader'
import CreatorPayment from '../../creator/payment/CreatorPayment'

const DashboardPayments = ({payments}) => {
    const [currentIndex,setCurrentIndex] = useState(0)
    const [id,setId] = useState(null)

     const handleAction = (creatorId)=>{
            
            if(id === creatorId){
                setId(null)
            }else{
                setId(creatorId)
            }
        }
    
  return (
    <div>
          
        {/* <DashboardPaymentTabs/> */}
        <h1 className='text-center text-5xl mb-3 font-bold'>Latest Payments</h1>

          <div className='mt-5'>
               <CreatorPaymentHeader full={true}/>
                <ul>
                    {
                        payments.map(payment=>{

                            return(
                              <CreatorPayment handleAction={handleAction} id={id}
                              key={payment.payment_id} payment={payment}/>
                            )
                        })
                    }
                </ul>
        </div>
    </div>
  )
}

export default DashboardPayments