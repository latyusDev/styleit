import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const UserProfileLoader = () => {
  return (
  <div data-testid='profile-loader' className='flexs justisfy-between'>
          <div className='md:basis-[45%] lg:basis-[45%] xl:basis-[50%]'>
            <div  className='flex flex-col md:flex-row justify-between '>
        <div className='flex gap-7 items-center flex-[0.5] md:flex-[0.53]'>
            <div className='hidden md:block w-[120px]  h-[120px] '>
            <Skeleton className="h-[100px] w-[100px] bg-gradient-to-tr from-primary to-sidebar rounded-full" />
            </div>
            <div className='shadow py-3 pl-3 pr-4 md:pr-0 w-[max-content]  rounded-xl md:w-[75%]'>
            <Skeleton className="h-4 max-w-[350px] mb-6 bg-gradient-to-tr from-primary to-sidebar" />
            <Skeleton className="h-4 max-w-[350px] bg-gradient-to-tr from-primary to-sidebar" />
            </div>
        </div>
        <div className=' self-center md:self-start  shadow flex flex-row-reverse md:flex-row gap-3 py-3 md:py-4 px-10 md:mt-7 rounded-xl text-gray-500 capitalize md:ml-auto w-[max-content] '>
            <Skeleton className="h-4 max-w-[350px]  bg-gradient-to-tr from-primary to-sidebar" />
    </div>
            </div> 
            <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between  mt-7">

    <div className="md:flex-[0.48] lg:flex-[0.45] shadow pl-4 rounded-xl pt-5 pb-5 pr-5">
            <Skeleton className="mt-8 h-4 w-full  bg-gradient-to-tr from-primary to-sidebar " />
            <Skeleton className="mt-8 h-4 w-full  bg-gradient-to-tr from-primary to-sidebar " />
            <Skeleton className="mt-8 h-4 w-full  bg-gradient-to-tr from-primary to-sidebar " />
            <Skeleton className="mt-8 h-4 w-full  bg-gradient-to-tr from-primary to-sidebar " />
         </div>
    
    <div className='md:flex-[0.48] lg:flex-[0.45] shadow py-3  rounded-xl pt-7 pb-16 pl-4 '>
          <Skeleton className="mt-8 h-4 max-w-[350px]  bg-gradient-to-tr from-primary to-sidebar " />
            <Skeleton className="mt-8 h-4 max-w-[350px]  bg-gradient-to-tr from-primary to-sidebar " />
            <Skeleton className="mt-8 h-4 max-w-[350px]  bg-gradient-to-tr from-primary to-sidebar " />

        
    </div>
    </div>
    </div>

    <div  className="block w-[max-content] ml-auto mt-5">

    <div className="flex gap-2  text-white rounded-xl px-4 py-3  ">
            <Skeleton className="mt-8 h-9 w-[100px]  bg-gradient-to-tr from-primary to-sidebar " />
    </div>
    </div> 
   
  </div>
  )
}

export default UserProfileLoader
