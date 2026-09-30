import CreatorDescriptions from '@/components/dashboard/creator/creatorDescription/CreatorDescription'
import { useAuth } from '@/store/useAuth'
import React from 'react'
import Login from '../auth/Login'

const DescriptionPage = () => {
    const {user} = useAuth()
      if(!user){
          return(
                  <Login/>
          )
      }
  
  return (
    <div>
        <CreatorDescriptions/>
    </div>
  )
}

export default DescriptionPage