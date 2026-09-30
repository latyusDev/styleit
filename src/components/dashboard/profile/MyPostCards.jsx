import Image from '@/components/global/Image'
import { postImages } from '@/static/data'
import { useAuth } from '@/store/useAuth'
import React from 'react'
import { Link } from 'react-router-dom'

const MyPostCards = ({posts=[]}) => {
    const {user} = useAuth()
    const isDesigner = user?.role === 'designer'
  return (
          <div>
                    {
                               isDesigner ?
                    <div className='flex gap-4 flex-row flex-wrap justify-center xl:justify-start'>
                    {posts?.map(post=>{
                        return(
                            <div key={post.postId} className='basis-[47%] lg:basis-[30%] xl:basis-[32%] h-[250px] relative'>
                            <Link to={`/trending/${post.postId}`} >
                                
                                <Image src={postImages[0]} className='rounded-2xl w-full h-full' />
                                <p className='absolute bottom-0 px-8 py-3 text-md font-[700] bg-gray-300 opacity-[0.8] rounded-xl'>{post.postTitle}</p>
                            </Link>
                            </div>
                        )
                    })}
                </div>
                :   <div className='flex gap-4 flex-row flex-wrap justify-center xl:justify-start'>
                    {posts?.map(post=>{
                        return(
                            <div key={post.postid} className='basis-[47%] lg:basis-[30%] xl:basis-[22%] h-[250px] relative'>
                            <Link to={`/trending/${post.postid}`} >
                                <Image src={post.imagelikedUrl} className='rounded-2xl w-full h-full' />
                                <p className='absolute bottom-0 px-8 py-3 text-md font-[700] bg-gray-300 opacity-[0.8] rounded-xl'>{post.post||post.postLiked}</p>
                            </Link>
                            </div>
                        )
                    })}
                </div>
                    
                }
          </div>
  )
}

export default MyPostCards