import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CreatorLoader = () => {
  return (
        
            <div className=''>

           
           {
         

            Array(10).fill(0).map((_,index)=>{

            return (
            <div key={index} className='flex items-center gap-3 '>
                <div>
                     <Skeleton  className="w-10 h-10 rounded-full p-8 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />

                </div>

                <div>
                     <Skeleton  className="w-[260px] h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                     <Skeleton  className="w-[260px] mt-2 h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />

                </div>
              </div>
            )
           })

        }
              
                 
          </div>
  )
}

export default CreatorLoader