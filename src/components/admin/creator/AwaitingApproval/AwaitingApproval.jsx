import React from 'react'
import { Link } from 'react-router-dom'

const AwaitingApproval = ({awaitingApproval}) => {

  return (
    <li key={awaitingApproval.tpay_id} className="relative mt-12 list-none md:mt-0">
        <div className={` mt-5 shadow-md capitalize p-7 md:p-5 rounded-md relative`}>
        <div className={`flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center capitalize rounded-md relative`}>
            
            <div className='flex items-center md:items-center justify-between mt-5 md:mt-0 w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>creator:</p>
            <p data-testid={`name-${awaitingApproval.tpay_id}`} >
                {awaitingApproval.creator_businessName}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[20%] text-center '>
            <p className='font-[700] capitalize md:hidden'>client:</p>
            <p data-testid={`plan-${awaitingApproval.tpay_id}`} className='pl-10' >{awaitingApproval.client_firstname} {awaitingApproval.client_lastname}</p>
            </div>
         
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>amount:</p>
            <p data-testid={`to-${awaitingApproval.tpay_id}`}  className='md:basis-[15%]'>₦{awaitingApproval.tpay_amount}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>reference no:</p>
            <p data-testid={`status-${awaitingApproval.tpay_id}`}  
            >{awaitingApproval.tpay_transNo}</p>
            </div>
               <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
            <p className='font-[700] capitalize md:hidden'>Transaction status:</p>
            <p data-testid={`from-${awaitingApproval.tpay_id}`}  className='md:basis-[15%]'>{awaitingApproval.tpay_status}</p>
            </div>
        <div className='w-full md:w-auto md:basis-[15%]' >
            <Link to={`/admin/creators/awaitingApproval/${awaitingApproval.tpay_transNo}`} className=' bg-green-400 px-4 py-2 w-full block text-center md:w-auto text-white rounded-md' data-testid={`actionButton-${awaitingApproval.tpay_id}`} >Approve</Link>

        </div>
        </div>
        </div>
        
    </li>
  )
}

export default AwaitingApproval