import React, { useState } from 'react'

const revenueTabs = ['weekly','monthly']

const RevenueTabs = ({currentIndex,setCurrentIndex}) => {
  return (
      <div className='flex mb-5'>
        {
            revenueTabs.map((tab,index)=>{
                return(

                    <div className='flex-[0.5]'>
                        <button  className={`w-full border-b-[3px] border-sidebar
                         text-lightGray capitalize py-2
                         ${index === currentIndex?'border-primary border-b-primary text-primary':'text-sidebar' }`}
                         onClick={()=>setCurrentIndex(index)}
                         >{tab}</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default RevenueTabs