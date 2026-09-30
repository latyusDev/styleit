import PostListLoader from '@/components/global/loaders/PostListLoader'
import { useAuth } from '@/store/useAuth'
import React from 'react'
import MyPostCards from './MyPostCards'
import { Link } from 'react-router-dom'
import ErrorMessage from '@/components/global/ErrorMessage'

const MyPost = ({postData}) => {
    const {isError,isLoading,posts,error} = postData
    const {user} = useAuth();
    const isDesigner = user?.role === 'designer'
  return (
    <section className='mt-20'>
       {
           isLoading ?
               <PostListLoader/>
        :(
           <div className='font-lato'>
            {
                isError?<ErrorMessage error={error}/>:(
                 <div>
                    {
                        isDesigner&&<div>
                            {
                                 posts?.length === 0 ?<div className='text-center px-4 md:px-0  border border-gray-200 py-16 rounded-md'>
                                    <h1 className='text-2xl text-gray-600'> You currently have no posts</h1>
                                    <p className='text-gray-500 mt-3 text-md'> get started by  creating a post <Link to='/creator/posts' className='text-primary'>on your post page</Link></p>
                                </div>: <div>
                                    <MyPostCards posts={posts} />
                                </div>
                            }
                        </div>
                    }
                    {
                        !isDesigner&&<div >
                            {
                                posts?.length === 0 ?<div className='text-center px-4 md:px-0 border border-gray-200 py-16 max-w-[800px] mx-auto rounded-md'>
                                    <h1 className='text-2xl text-gray-600'> You currently have no liked posts</h1>
                                    <p className='text-gray-500 mt-3 text-md'> get started by liking a <Link to='/trending' className='text-primary'>trending post</Link></p>
                                </div>: <div>
                                    <MyPostCards posts={posts} />
                                </div>
                            }
                        </div>
                    }
                 </div>
            
                )
            }
           </div>
        )
       }
    </section>
  )
}

export default MyPost