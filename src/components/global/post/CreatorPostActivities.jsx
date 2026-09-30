import React, { memo } from 'react'
import Image from '../Image'
import like from '../../../images/like.png'
import shareIcon  from '../../../images/share.png'
import message from '../../../images/message.png'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/store/useAuth'
import { Link } from 'react-router-dom'

const CreatorPostActivities = (activitiesData) => {
  const {post,share,likePost} = activitiesData
    const {user} = useAuth();
        const queryClient = useQueryClient();
       const {mutate} = useMutation({
  mutationFn: likePost,
  onMutate: async(id) => {
    await queryClient.cancelQueries(['trending'])
    
    const updateLikeId = (post) => {
      // Only update the post that matches the clicked post ID
      if(post.id !== id) return post;
      
      if(user.role === 'designer') {
        if(post.creator_id_likes.includes(user.designer_id)) {
          // Unlike - remove user ID and decrease count
          post.creator_id_likes = post.creator_id_likes.filter(userId => userId !== user.designer_id)
          post.likes_Count = post.likes_Count - 1
        } else {
          // Like - add user ID and increase count
          post.creator_id_likes = [...post.creator_id_likes, user.designer_id]
          post.likes_Count = post.likes_Count + 1
        }
      } else {
        if(post.client_id_likes.includes(user.id)) {
          // Unlike
          post.client_id_likes = post.client_id_likes.filter(userId => userId !== user.id)
          post.likes_Count = post.likes_Count - 1
        } else {
          // Like
          post.client_id_likes = [...post.client_id_likes, user.id]
          post.likes_Count = post.likes_Count + 1
        }
      }
      return post
    }
    
    const previousPosts = queryClient.getQueryData(['trending'])
    
    queryClient.setQueryData(['trending'], (postData) => {
      if(!postData) return postData;
      
      const pages = postData.pages.map(page => {
        return {
          ...page,
          posts: page.posts.map(post => updateLikeId(post))
        }
      })
      
      return {
        ...postData,
        pages
      }
    })
    
    return { previousPosts }
  },
  onError: (err, variables, context) => {
    // Rollback on error
    if(context?.previousPosts) {
      queryClient.setQueryData(['trending'], context.previousPosts)
    }
  },
  onSettled: () => {
    queryClient.invalidateQueries(['trending'])
  }
})
      const handleLike = async(id)=>{
        mutate(id)
    }
    
    const handleShare = ()=>{
      share.setIsShared(true)
    }



  return (
    <div className='flex justify-between text-primary my-3'>
          
          {/* client like buttons */}
        <div className='flex gap-[0.1rem] items-center hover:cursor-pointer' onClick={()=>handleLike(post.id)}>
            <p className='text-xs'>{post.likes_Count}</p>
            <Image src={like} className='w-4 h-4'/>
        </div>
        <Link to={`/trending/${post.postId}`}>
        
        <div  data-testid="toggle-comment-button" className='flex gap-[0.1rem] items-center hover:cursor-pointer' >
            <p className='text-xs'>{post.Comment_Count}</p>
            <Image src={message} className='w-4 h-4'/>
        </div>
        </Link>
        <div className='flex gap-[0.1rem] items-center  hover:cursor-pointer' onClick={handleShare}>
            <p className='text-xs'>{post.shares_Count}</p>
            <Image src={shareIcon} className='w-3 h-2'/>
        </div>
    </div>
  )
}

export default memo(CreatorPostActivities)