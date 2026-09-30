import React, { useState } from 'react'
import UserLists from './UserLists'
import PeriodTabs from '../../shared/PeriodTabs'

const ActiveUsers = () => {
  return (
    <div className='mt-9'>
    {/* // <div className="flex mb-5"  >
    // <button className={`flex-[0.5]  py-2 capitalize ${period ? 'bg-sidebar text-lightGray':'bg-slate-100'}`} onClick={()=>setPeriod(true)}>weekly</button>
    // <button className={`flex-[0.5] py-2 capitalize ${!period ? 'bg-sidebar text-lightGray':'bg-slate-100'}`} onClick={()=>setPeriod(false)}>monthly</button>
    // </div> */}
    <PeriodTabs requiredPeriod={3}/>

        <UserLists/>
        
    </div>
  )
}

export default ActiveUsers