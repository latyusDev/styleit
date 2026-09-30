import React, { useState } from 'react'

const periods = ['daily','weekly','monthly']

const PeriodTabs = ({requiredPeriod}) => {
    const [currentIndex,setCurrentIndex] = useState(0)

  return (
    <div className="flex mb-5"  >
        {
            periods.slice( requiredPeriod== 3?1:0,requiredPeriod).map((period,index)=>{
            // periods.slice(1,3).map((period,index)=>{
                return (
                    <button className={`flex-[0.5]  py-2 capitalize ${currentIndex === index ? 'bg-sidebar text-lightGray':'bg-slate-100'}`} onClick={()=>setCurrentIndex(index)}>{period}</button>
                )
                 
            })
        }
    </div>    
  )
}

export default PeriodTabs