import React, { useEffect } from 'react'
import PostContainer from './post/PostContainer'
import { userProfile } from "@/static/data"
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import TrendingPostLoader from './loaders/TrendingPostLoader'
import ErrorMessage from './ErrorMessage'
import { useAuth } from '@/store/useAuth'
import { usePost } from '@/store/usePost'

const TrendingContents = () => {
  const {user} = useAuth()
  const {getTrending} = usePost()
  const role = user?.role

    const {   
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
        queryKey:['trending'],
        queryFn:()=>getTrending(role),
        initialPageParam:0,
        refetchOnWindowFocus:false,
        getNextPageParam: (lastPage, pages) =>{
              if (lastPage?.has_next) {
            return lastPage.page + 1;
          }
          return undefined; // stop fetching
        }
        })
        const {ref,inView} = useInView()

        useEffect(()=>{
              if(inView){
                fetchNextPage()
              }
        },[fetchNextPage,inView])
  return (
    <div>
      
      { 
                isLoading ? <TrendingPostLoader/>:
            <div>
                {
                  isError ? <ErrorMessage error={error}/>:
                  <PostContainer 
                pages={data?.pages}
                follow={true} 
                userProfile={userProfile}/>
            }
            </div>
      }
      
      <div ref={ref}>{!isError&&isFetchingNextPage&&<TrendingPostLoader/>}</div>
    </div>
  )
}

export default TrendingContents
