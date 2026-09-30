import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const numerals = ['one','two','three','four','five']

const StarTabs = ({handleStarTabs,currentIndex}) => {
    const [overflow,setOverflow] = useState(true);
    
    const handleMouseIn =()=>{
        setOverflow(true)
    }
    const handleMouseOut =()=>{
        setOverflow(false)
    }
  return (
    <div className={`flex gap-4 mb-8 md:mb-5  max-w-[600px] pb-2 md:pb-0
     md:max-w-none  md:w-full  ${overflow ? 'overflow-x-auto':'overflow-x-hidden'}`}
      onMouseLeave={handleMouseOut} onMouseEnter={handleMouseIn} 
      >
          <Button  className={`px-6 md:px-12 py-6 shadow-none capitalize text-md md:text-lg 
                    text-lightGray ${currentIndex === 'all' ? 'bg-primary':'bg-sidebar'}`}  onClick={()=>handleStarTabs('all')}>all</Button>
         {
           [...Array(5)].map((_,index)=>{
                return(
                    <Button  className={`px-6 md:px-12 py-6 shadow-none capitalize text-md md:text-lg 
                    text-lightGray ${index === currentIndex?'bg-primary':'bg-sidebar' }`} onClick={()=>handleStarTabs(index+1)}>{numerals[index]} {index>0 ? 'stars':'star'}</Button>
                )
            })
         }
        </div>
  )
}

export default StarTabs