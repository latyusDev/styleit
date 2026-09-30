import { safeDate } from '@/static/data'
import { ChevronRight } from 'lucide-react'
import React from 'react'

const AdminTransaction = ({transaction,handleAction,id,isAll=true}) => {

   const selectedItem = id === transaction.transfer_id
   const transactionDate = new Date(safeDate(transaction?.created_at)).toLocaleDateString()
  return (
     <li  className="relative list-none mt-10 md:mt-0 ">
        <div  className={`${transaction.status=='success'&&' border-l-4 border-green-500 '} 
    ${transaction.status=='decline'&&' border-l-4 border-red-500'}
    ${transaction.status=='completed'&&' border-l-4 border-blue-500'}
    ${(transaction.status=='pending'||transaction.status=='not decided')&&' border-l-4 border-yellow-500'}
        mt-5 shadow-md capitalize p-5 rounded-md relative`}>
            
            <div className='grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] gap-4 md:gap-0 md:flex-row justify-between items-center'>
            <div className='flex justify-between '>
            <p className='font-[700] capitalize md:hidden'>depositor:</p>
            <p >{transaction.depositor} </p>
            </div>
            
            <div  className='flex justify-between lowercase md:-indent-6  w-full md:w-auto '>
            <p className='font-[700]  md:hidden'>receiver:</p>
            <p data-testid={`collectionDate-${transaction.transfer_id}`} >{transaction.receiver_name}</p>
            </div>
            
            <div className='flex justify-between  w-full md:w-auto md:basis-[16%]'>
            <p className='font-[700] capitalize md:hidden'>amount:</p>
            <p >₦{transaction.amount_remitted}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[16%]'>
            <p className='font-[700] capitalize md:hidden'>transaction date:</p>
            <p >{transactionDate}</p>
            </div>
            <div className='flex justify-between  w-full md:w-auto md:basis-[16%]'>
            <p className='font-[700] capitalize md:hidden'>status:</p>
            <p data-testid={`status-${transaction.transfer_id}`} className={`basis-[16%] ${transaction.status=='success'&&' md:border-r-0  text-green-500'}
                ${transaction.status=='decline'&&' md:border-r-0  text-red-500'}  ${transaction.status=='completed'&&' md:border-r-0  text-blue-500'}
                ${(transaction.status=='pending'||transaction.status=='not decided')&&' md:border-r-0  text-yellow-500'} `}>{transaction.status}</p>
            </div>
            <p data-testid={`actionButton-${transaction.transfer_id}`} className='basis-[10%] hidden md:block ' >
                <ChevronRight className={`transition-all duration-300  ml-4  ${selectedItem&& 'rotate-90'} cursor-pointer`}
            onClick={()=>handleAction(transaction.transfer_id)}/> </p>
        </div>

       <div className={`${selectedItem&&'hidden md:block shadow-md rounded-lg border mt-5 py-4 px-3'}`}>

         {selectedItem&& <div  data-testid='otherColumns' className='hidden md:block md:max-w-[800px]'>
        <ul className=' grid grid-cols-5 mb-4 capitalize w-full font-[700]  '>
        <li>receiver acc no</li>
        <li>receiver bank</li> 
        <li>reference</li>
        <li>transaction ref</li>
        <li>receiver email</li>
    </ul>
        
            <div className='grid grid-cols-5 gap-5  '>
            <div className=''>
            <p data-testid={`receiver-${transaction.transfer_id}`}  className='ml-3'>{transaction.receiver_account_number} </p>
            </div>
            <div className=''>
            <p className='font-[700] capitalize md:hidden'>receiver bank:</p>
            <p data-testid={`collectionTime-${transaction.transfer_id}`} >{transaction.receiver_bank}</p>
            </div>
            <div >
            <p className='font-[700] capitalize md:hidden'>reference:</p>
            <p data-testid={`bookingTime-${transaction.transfer_id}`} className=' lowercase'>{transaction.reference}</p>
            </div>
            <div >
            <p className='font-[700] capitalize md:hidden'>transfer ref:</p>
            <p data-testid={`bookingTime-${transaction.transfer_id}`} className=' lowercase'>{transaction.transaction_reference}</p>
            </div>
            <div >
            <p className='font-[700] capitalize md:hidden'>receiver email:</p>
            <p data-testid={`bookingTime-${transaction.transfer_id}`} className=' lowercase'>{transaction.receiver_email}</p>
            </div>
        </div>
        

        </div>
            }
       </div>

            <div className='mt-4 md:max-w-[800px] md:hidden'>
            <div className='flex justify-between '>
            <p className='font-[700] capitalize md:hidden'>receiver acc no:</p>
            <p data-testid={`gender-${transaction.transfer_id}`} className='basis-[16%] lowercase'>{transaction.receiver_account_number}</p>
            </div>
        
            <div className='flex justify-between  mt-4'>
            <p className='font-[700] capitalize md:hidden'>reference:</p>
            <p data-testid={`gender-${transaction.transfer_id}`} className='basis-[16%] lowercase'>{transaction.reference}</p>
            </div>
            <div className='flex justify-between  mt-4'>
            <p className='font-[700] capitalize md:hidden'>transaction ref:</p>
            <p data-testid={`gender-${transaction.transfer_id}`} className='basis-[16%] lowercase'>{transaction.transaction_reference}</p>
            </div>
            <div className='flex justify-between  mt-4'>
            <p className='font-[700] capitalize md:hidden'>receiver email:</p>
            <p data-testid={`gender-${transaction.transfer_id}`} className='basis-[16%] lowercase'>{transaction.receiver_email}</p>
            </div>
              <div className='flex justify-between  mt-4'>
            <p className='font-[700] capitalize md:hidden'>receiver bank:</p>
            <p data-testid={`gender-${transaction.transfer_id}`} className=' lowercase'>{transaction.receiver_bank}</p>
            </div>
      
        </div>
        </div>
        
    </li>
  )
}

export default AdminTransaction