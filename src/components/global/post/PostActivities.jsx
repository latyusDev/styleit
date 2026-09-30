import React, { useCallback, useState,useEffect } from 'react'
import Image from '../Image'
import shareIcon from '../../../images/share.png'
import message from '../../../images/message.png'
import PostLikeButton from './PostLikeButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/store/useAuth'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import Confetti from "react-confetti";
import { ThumbsUp, X } from 'lucide-react'
import { roles } from '@/pages/ViewTrendingPost'
import { useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { confettiNumbers } from '@/static/data'


const PostActivities = (activitiesData) => {
  const { post, share, comments, likePost } = activitiesData
  const { user } = useAuth()
  const confettiRef = useRef(null);
  const queryClient = useQueryClient()
   const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

   const isDesigner = user?.role === 'designer'
    const isAdmin = roles.includes(user?.role)

    const fireConfetti = () => {
    confettiRef.current?.({
      particleCount: 100,
      spread: 1000,
      startVelocity: 35,
      colors: ["#FF0050", "#FFFFFF", "#FFB6C1"],
      origin: { x: 0.5, y: 0.5 },
    });
  };

      

  const { mutate } = useMutation({
    mutationFn: likePost,
    onMutate: async (id) => {
      // Cancel all related queries to prevent race conditions
      await queryClient.cancelQueries(['trending'])
      await queryClient.cancelQueries(['search-posts'])

     
      // Helper function to update a single post's like status
      const updateLikeId = (post) => {
        if (post.id !== id) return post

        const updatedPost = { ...post }

       
        if (isDesigner) {
          if (post.creator_id_likes.includes(user.designer_id)) {
            // Unlike
            updatedPost.creator_id_likes = post.creator_id_likes.filter(
              userId => userId !== user.designer_id
            )
            updatedPost.likes_Count = post.likes_Count - 1
          } else {
            // Like
           
            updatedPost.creator_id_likes = [...post.creator_id_likes, user.designer_id]
            updatedPost.likes_Count = post.likes_Count + 1
             const currentCount = updatedPost.likes_Count
           if(confettiNumbers.includes(updatedPost.likes_Count)){
                 fireConfetti()
                 if (currentCount === 1){
                    toast(`Nice! You are ${currentCount}st like 👍`, {position:'top-center' })
                 }else if(currentCount === 2){
                    toast(`Nice! You are ${currentCount}nd like 👍`, {position:'top-center' })
                 }else{
                    toast(`Nice! You are ${currentCount}th like 👍`, {position:'top-center' })
                 }
            }
          }
        } else {

          if (post.client_id_likes.includes(user.id)) {
            // Unlike
            updatedPost.client_id_likes = post.client_id_likes.filter(
              userId => userId !== user.id
            )
            updatedPost.likes_Count = post.likes_Count - 1
          } else {
            // Like
            updatedPost.client_id_likes = [...post.client_id_likes, user.id]
            updatedPost.likes_Count = post.likes_Count + 1
            const currentCount = updatedPost.likes_Count
            if(confettiNumbers.includes(updatedPost.likes_Count)){
                 fireConfetti()
                 if (currentCount === 1){
                    toast(`Nice! You are ${currentCount}st like 👍`, {position:'top-center' })
                 }else if(currentCount === 2){
                    toast(`Nice! You are ${currentCount}nd like 👍`, {position:'top-center' })
                 }else{
                    toast(`Nice! You are ${currentCount}th like 👍`, {position:'top-center' })
                 }
            }
          }
        }

        return updatedPost
      }

      // Helper function to update paginated data
      const updatePaginatedData = (postData) => {
        if (!postData) return postData

        const pages = postData.pages.map(page => ({
          ...page,
          posts: page.posts.map(post => updateLikeId(post))
        }))

        return {
          ...postData,
          pages
        }
      }

      // Snapshot previous data for both queries
      const previousTrending = queryClient.getQueryData(['trending'])
      const previousSearch = queryClient.getQueryData(['search-posts'])

      // Update trending posts optimistically
      if (previousTrending) {
        queryClient.setQueryData(['trending'], updatePaginatedData)
      }

      // Update search posts optimistically
      if (previousSearch) {
        queryClient.setQueryData(['search-posts'], updatePaginatedData)
      }

      // Return context for rollback
      return { previousTrending, previousSearch }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousTrending) {
        queryClient.setQueryData(['trending'], context.previousTrending)
      }
      if (context?.previousSearch) {
        queryClient.setQueryData(['search-posts'], context.previousSearch)
      }
    },
    onSettled: () => {
      // Invalidate both queries to refetch and ensure consistency
      queryClient.invalidateQueries(['trending'])
      queryClient.invalidateQueries(['search-posts'])
    }
  })

  const handleInit = ({ confetti }) => {
    confettiRef.current = confetti;
  };

  
  const handleLike = useCallback((id) => {
    mutate(id)
    
  }, [mutate])

  const handleShare = useCallback( () => {
    share.setIsShared(true)
   
  }, [share.setIsShared])

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);


 
  return (
    <div>
     <ReactCanvasConfetti
        onInit={handleInit}
         canvasProps={{
          width: windowSize?.width,
          height: windowSize?.height,
          className:
            "fixed inset-0 w-screen h-screen pointer-events-none z-[9999]",
        }}
      />

    <div className='flex justify-between text-primary my-3'>
      {
        isAdmin ? <div className='flex gap-[0.1rem] items-center hover:cursor-pointer' onClick={()=>handleLike((post?.id||post?.post_id||post?.id))}>
                    <p className='text-xs mt-1'>{post?.likes_Count}</p>
                  <ThumbsUp className='text-red-500 w-4 h-4'/>
                </div>:
      <PostLikeButton handleLike={handleLike} post={post} />
      }

      <div data-testid="toggle-comment-button" className='flex gap-[0.1rem] items-center hover:cursor-pointer'>
        <p className='text-xs'>{comments?.length}</p>
        <Link to={`/trending/${post.id || post.PostId}`}>
          <Image src={message} className='w-4 h-4' />
        </Link>
      </div>

     
       <div className='flex gap-[0.1rem] items-center hover:cursor-pointer' onClick={handleShare}>
        <p className='text-xs'>{post.shares_Count}</p>
        <Image src={shareIcon} className='w-3 h-2' />
      </div>

    </div>
    </div>
  )
}

export default React.memo(PostActivities)
