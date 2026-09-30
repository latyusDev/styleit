import React from 'react'
import CreatorDetails from './creator/CreatorDetails'
import MyPost from './MyPost'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/store/useAuth'
import ErrorMessage from '@/components/global/ErrorMessage'
import { useProfileStore } from '@/store/useProfile'
import ClientProfile from '../client/ClientProfile'

const Profile = () => {

    const {getProfileDetails} = useProfileStore();
    const {user} = useAuth()
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ['profile', user?.role],
      queryFn: () => getProfileDetails(user),
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus:false,
      enabled: !!user,   
    })

    const  isClient = user?.role === 'client' 


       
  return (
    <>
    {
      isError ? <ErrorMessage error={error}/>:(
        <div>
              {
         isClient?
          (
            <ClientProfile title="Profile"/>
          ):(
            <div className='my-12  mx-4 xl:mx-0'>
            <CreatorDetails creatorDetails={{creator:data?.data?.creator,error,isError,isLoading}} />
           {user?.role === 'designer'&& <MyPost  postData={{posts:data?.data?.posts,isLoading,isError,error}} />}
          </div>
          )
        }
        </div>
      )
      
    }
    
    </>
  )
}

export default Profile

