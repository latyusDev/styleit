import { Star } from 'lucide-react'
import React, { memo } from 'react'

const Stars = ({rating,className}) => {
  return (
    <div className={`flex gap-1 ${className}`}>
        {
            Array(5).fill(0).map((_,index)=>{
                return(
                    <div key={index}>
                          <Star className={`h-4 md:h-6 w-4 md:w-6 ${index+1<=rating?'text-yellow-400 text-sm':''}`}/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default memo(Stars)