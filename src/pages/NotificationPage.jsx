import Notifications from '@/components/global/notifications/Notifications'
import React from 'react'

const NotificationPage = () => {
  return (
    <div data-testid="notifications-page" className='px-4 py-8 min-h-screen  bg-gradient-to-tl to-pink-50  to-[50%] from-[50%] md:to-[10.2%] from-gray-50 md:from-[54.7%] '>
        <h1 className='text-center font-lato font-bold  text-xl md:text-3xl'>All Notifications</h1>
        <Notifications/>
    </div>
  )
}

export default NotificationPage