import React from 'react'

const AwaitingApprovalHeader = () => {
  return (
        <ul data-testid="full-header" className=' hidden md:flex flex-row justify-between capitalize w-full font-[700] p-3 '>
              <li className='basis-[20%]'>Creator</li>
              <li className='basis-[15%] '>Client</li>
              <li className='basis-[15%]'>amount</li>
              <li className='basis-[15%]'>ref number</li>
              <li className='basis-[15%]'>Transaction status</li>
              <li className='basis-[15%]'>action</li>
        </ul>
  )
}

export default AwaitingApprovalHeader