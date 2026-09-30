import React from 'react'

const CreatorSubscrptionHeader = ({full}) => {
  return (
   <>
      {
        full ?  
        <ul data-testid="full-header" className=' hidden md:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 capitalize w-full font-[700] p-3 '>
              <li >name</li>
              <li >plan</li>
              <li >from</li>
              <li >to</li>
              <li >status</li>
        </ul>:
              <ul  data-testid="half-header" className=' hidden md:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 capitalize w-full font-[700] p-3 '>
              <li className='basis-[15%]'>plan</li>
              <li className='basis-[15%]'>from</li>
              <li className='basis-[15%]'>to</li>
              <li className='basis-[15%]'>status</li>
        </ul>
      }
   </>
  )
}

export default CreatorSubscrptionHeader