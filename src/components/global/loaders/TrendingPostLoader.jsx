import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const TrendingPostLoader = () => {
  return (
   <div>
      {
        Array(5).fill(0).map(load=>(
          <div key={load} className='max-w-[480px] mx-auto mt-10'>
     
    <div className='relative border border-gray-200 rounded-2xl  text-sm  p-3.5'>
      
        <div className='flex justify-between items-center '>
          <Skeleton className="h-[50px] w-[50px] bg-gradient-to-tr from-primary to-sidebar rounded-full" />


           
            {

            <div className='flex items-center '  >
          <Skeleton className="h-[9px] w-[100px] bg-gradient-to-tr from-primary to-sidebar " />
               

                <div data-testid="options-icon" className='relative  w-[25px] self-start h-[29px] cursor-pointer'>
                <Skeleton className='h-8 w-3 absolute bottom-2 right-0  bg-gradient-to-tr from-primary to-sidebar '/>
                </div>
            </div>
            }
        </div>
        <Skeleton className="mt-2 h-[11px] w-[100px] bg-gradient-to-tr from-primary to-sidebar " />
        <Skeleton className="mt-2 h-[11px] w-full bg-gradient-to-tr from-primary to-sidebar " />
        <Skeleton className="mt-2 h-[11px] w-full bg-gradient-to-tr from-primary to-sidebar " />
       <Skeleton className="mt-5 h-[200px] w-full bg-gradient-to-tr from-primary to-sidebar " />
        <div className='flex justify-between text-primary my-3'>
        <div className='flex gap-[0.1rem] items-center hover:cursor-pointer' >
        <Skeleton className=" h-6 w-8 bg-gradient-to-tr from-primary to-sidebar " />

        </div>
        <div  data-testid="toggle-comment-button" className='flex gap-[0.1rem] items-center hover:cursor-pointer' >
        <Skeleton className=" h-6 w-8 bg-gradient-to-tr from-primary to-sidebar " />

        </div>
        <div className='flex gap-[0.1rem] items-center  hover:cursor-pointer' >
        <Skeleton className=" h-6 w-8 bg-gradient-to-tr from-primary to-sidebar " />
              
        </div>
    </div>
              <div className="mt-2">
                        <Skeleton className="h-12 w-full rounded-2xl  bg-gradient-to-tr from-primary to-sidebar"/>
              </div>
        </div>
    </div>
        ))
      }
   </div>
  
            
  )
}

export default TrendingPostLoader