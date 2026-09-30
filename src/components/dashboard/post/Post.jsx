import ErrorMessage from '@/components/global/ErrorMessage'
import TrendingPostLoader from '@/components/global/loaders/TrendingPostLoader'
import Paginator from '@/components/global/Paginator'
import CreatePost from '@/components/global/post/CreatePost'
import PostContainer from '@/components/global/post/PostContainer'
import { useGlobalStore } from '@/store/global/useGlobal'
import { useAuth } from '@/store/useAuth'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'


const PAGES_TO_SHOW = 3
const Post = () => {
  const {setPostModal} = useGlobalStore(state=>state)
  const {user} = useAuth();
  const [page,setPage] = useState(1);

  
  const role = user?.role === 'designer'?'designer':'customer';
    const {data,isLoading,isError,error} = useQuery({
        queryKey:['myPosts',page],
        queryFn:async()=>await axios.get(`${role}/profile?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          }),
        staleTime:1000*10*60
        })

        return (
    <section className='px-4 xl:px-0'>
      <CreatePost />
      {
          isLoading ?
               <TrendingPostLoader/>:
            <>
                {
                  isError ?<ErrorMessage error={error}/>:
                  (
                <div>
                  {
                    data?.data?.posts?.length === 0 ? <div className="shadow-md max-w-[800px] mx-auto rounded-lg py-24 text-center text-xl mt-12 text-gray-400">
                      Get started by creating posts to attract clients. <span className='text-primary cursor-pointer' onClick={()=>setPostModal()}>Create posts</span>
                  </div>: 
                  
                  <PostContainer pages={data?.data.posts}  follow={true} />
                  }
                </div>
               )
                }
            </>
               
              
      }

        {
                  data?.data?.posts.length > 0 && <Paginator
                        data={data?.data}
                        page={page}
                        setPage={setPage}
                        PAGES_TO_SHOW={PAGES_TO_SHOW}
                        currentPage={'post'}
                    />
                 }
    </section>
  )
}

export default Post
