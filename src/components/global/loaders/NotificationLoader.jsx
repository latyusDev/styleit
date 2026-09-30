import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const NotificationLoader = () => {
  
  return (
    <div className='py-10  md:from-[54.7%] '>
              {
                Array.from({length:5}).map(index=>{
                  return  <div className=' shadow-md p-4 mt-4 rounded-md  max-w-[800px] mx-auto'>
                  <div className=' flex items-center gap-3'>
                   <Skeleton className=' bg-gradient-to-tr from-primary to-sidebar  size-[50px] rounded-full'/>
                <Skeleton className={' bg-gradient-to-tr from-primary to-sidebar  w-[150px] h-8'}/>
               </div>
                <Skeleton className={' bg-gradient-to-tr from-primary to-sidebar  w-fuhll h-10 mt-3'}/>
               </div>
                })
              }
    
    
            </div>
  )
}

export default NotificationLoader