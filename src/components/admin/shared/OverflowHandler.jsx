import React, { useState } from 'react'

const OverflowHandler = ({className,children}) => {
    const [overflow,setOverflow] = useState(true)
       const handleMouseIn =()=>{
            setOverflow(true)
        }
        const handleMouseOut =()=>{
            setOverflow(false)
        }

  return (
    <div className={`${className} ${overflow ? 'overflow-x-auto':'overflow-x-hidden'}`}
    onMouseLeave={handleMouseOut} onMouseEnter={handleMouseIn}
    >
        {children}
    </div>
  )
}

export default OverflowHandler