import { months } from '@/static/adminData'
import React from 'react'
const LastSeen = ({lastSeen}) => {

  return (
    <div>
      <p className='font-lato font-[500]' data-testid='last_seen'>Last seen: {lastSeen}
        </p></div>
  )
}

export default LastSeen;