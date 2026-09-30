import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from '../ui/skeleton'

const BankDetails = ({isLoading,bankDetails = [], isNav})=>{
    return(
        <div className="pl-1 text-lightGray mt-4 font-lato">
            <h3 className={`font-[400] ${isNav&&'text-xl  text-black text-gray-700 font-[700]'}`}>Bank details</h3>
           {
            isLoading?<div>
                    <Skeleton className=' w-full h-[170px] mt-2 bg-gradient-to-tr from-primary to-sidebar '/>
            </div>: <div>
                {
                    bankDetails&&bankDetails[0] === null ? <div>
                        
                               <p> update your bank  details in your <Link to='/creator/profile/edit' className='text-primary'>profile</Link></p> 
                    </div>:
                    <div>
                        <div className={` text-sm ${isNav&&'text-gray-700'}`}>
                        <p className="mt-1.5"> Account name: <span>{bankDetails[0]?.accountName}</span></p>
                        <p className="mt-1.5"> Account number: <span>{bankDetails[0]?.accountNo}</span></p>
                        <p className="mt-1.5"> Bank name: <span>{bankDetails[0]?.bankName}</span></p>
                    </div>
            </div>
                }
            </div>
           }
        </div>
    )
}

export default memo(BankDetails)