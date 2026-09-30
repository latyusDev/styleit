import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SingleLoader = ({name}) => {
  if(name === 'circle'){
      return (
            <Skeleton className="mt-8 h-[140px] w-[140px] rounded-full bg-gradient-to-tr from-primary to-sidebar " />

      )
  }
  return (
    <div>
            <Skeleton className="mt-8 h-10 w-full  bg-gradient-to-tr from-primary to-sidebar " />
        
    </div>
  )
}

export default SingleLoader