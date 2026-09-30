import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const PostListLoader = () => {

  return (
        <div data-testid='post-loader' className='flex gap-4 flex-row flex-wrap justify-center '>
        {
            Array(9).fill(0).map((_,index)=>{
           
                return <div key={index} className='basis-[47%] lg:basis-[30%] xl:basis-[24%] h-[200px] relative'> 
                     <Skeleton key={index} className="h-full w-full bg-gradient-to-tr from-primary to-sidebar " />

                </div>
            })
        }
  </div>
  )
}

export default PostListLoader


