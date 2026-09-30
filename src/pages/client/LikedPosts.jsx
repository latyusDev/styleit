import MyPost from '@/components/dashboard/profile/MyPost'
import Paginator from '@/components/global/Paginator'
import { useClientStore } from '@/store/useClient'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'


const PAGES_TO_SHOW = 3
const LikedPosts = () => {
    const {likedPosts} = useClientStore();
    const [page,setPage] = useState(1);

    const {data,isLoading,error,isError} = useQuery({
          queryKey:['profile',page],
          queryFn:()=>likedPosts(page),
          staleTime:1000*5*60
          })


  return (
    <section  data-testid="liked-posts" className='container px-4 md:px-0 pb-28'>
        <MyPost postData={{posts:data?.data?.likes,isLoading,error,isError}}/>
         {
            data?.data?.likes.length > 0 && <Paginator
                  data={data?.data}
                  page={page}
                  setPage={setPage}
                  PAGES_TO_SHOW={PAGES_TO_SHOW}
                  currentPage={'like'}
              />
            }
    </section>
  )
}

export default LikedPosts