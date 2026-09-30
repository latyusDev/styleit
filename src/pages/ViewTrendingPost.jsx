import React, { useEffect, useRef, useState, useCallback, Suspense, lazy } from 'react';
import { Loader2, Send, ThumbsUp, X } from 'lucide-react';
import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import message from '../images/message.png';
import shareIcon from '../images/share.png';

import { usePost } from '@/store/usePost';
import { useComment } from '@/store/useComment';
import { useAuth } from '@/store/useAuth';

import TrendingPostLoader from '@/components/global/loaders/TrendingPostLoader';
import PostLikeButton from '@/components/global/post/PostLikeButton';
import Image from '@/components/global/Image';
import ImageGallery from '@/components/global/imageGallery/ImageGallery';
const SharePostContainer = lazy(()=>import('@/components/global/post/SharePostContainer'))
import PostTitle from '@/components/global/post/PostTitle';

import PostDescription from '@/components/global/post/PostDescription';
import CommentItem from '@/components/global/comment/CommentItem';
import PostFollowButton from '@/components/global/post/PostFollowButton';
import CommentLoader from '@/components/global/loaders/CommentLoader';
import { toast } from 'sonner';
import { useCreatorStore } from '@/store/useCreator';
import ErrorMessage from '@/components/global/ErrorMessage';
import { formatDistanceToNowStrict } from 'date-fns';
import { useAdminStore } from '@/store/admin/useAdmin';
import SEO from '@/components/global/SEO';
import Login from './auth/Login';

export const roles = ['admin','superadmin']

export default function ViewTrendingPost() {
  const { id } = useParams();
  const commentInputRef = useRef(null);
  const observerTarget = useRef(null);
  
  const {storeFollow,storeUnFollow} = useCreatorStore()
  const {adminViewTrendingPost} = useAdminStore();
  const { viewPostDetails, likePost, isShared, setIsShared } = usePost();
  const { comment, setComment, storeComment, storeReply } = useComment();
  const { user } = useAuth();
  const isAdmin = roles.includes(user?.role)
  

  const [activeReplyId, setActiveReplyId] = useState(null);
  const queryClient = useQueryClient();



  /* ---------------- Fetch Post + Comments with Infinite Scroll ---------------- */
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['view-trending-post', id],
    // queryFn: ({ pageParam = 1 }) => viewPostDetails(id, pageParam),
    queryFn: isAdmin ? ({ pageParam = 1 }) => adminViewTrendingPost(id, pageParam):
    ({ pageParam = 1 }) => viewPostDetails(id, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // Get comments from the response
      const comments = lastPage?.post?.post?.comments_reply || [];
      
      // If no comments, no next page
      if (comments?.length === 0) return undefined;
      
      // If less than expected per page (adjust based on your API)
      if (comments?.length < 10) return undefined;
      
      // Return next page number
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: !!id&&!!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry:2,
    select: (data) => ({
      // Extract post details from first page only
      post: data.pages[0]?.post?.post?.post,
      likes_Count: data.pages[0]?.post?.post?.likes_Count,
      Comment_Count: data.pages[0]?.post?.post?.Comment_Count,
      shares_Count: data.pages[0]?.post?.post?.shares_Count,
      // Flatten all comments from all pages
      comments: data.pages.flatMap(page => page?.post?.post?.comments_reply || [])
    })
  });


  

  const post = data?.post;
  
  const postStats = {
    likes_Count: data?.likes_Count,
    Comment_Count: data?.Comment_Count,
    shares_Count: data?.shares_Count
  };
  const allComments = data?.comments || [];

  /* ---------------- Intersection Observer for Infinite Scroll ---------------- */
  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 0.5 };
    const observer = new IntersectionObserver(handleObserver, option);
    
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  /* ---------------- Add Comment ---------------- */
  const { mutate: commentMutation, isPending } = useMutation({
    mutationFn: storeComment,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['view-trending-post', id] });
      setComment('');
         if(response.status == 201){
        toast("Comment added", {
                action: {
                label: <X size={16} />,
              },
            })
       }
    },
    onError:(error)=>{
      
         if(error.status == 400){
        toast(error?.response?.data?.message, {
                action: {
                label: <X size={16} />,
              },
            })
       }
    }
  });

  const handleComment =() => {
    if (!comment.trim()) return;
    commentMutation({ postId: id, commentText: comment });
  }

  /* ---------------- Reply ---------------- */
  const handleReply = async (commentId, replyText) => {
    await storeReply({ postId: id, commentId, reply: replyText });
    queryClient.invalidateQueries({ queryKey: ['view-trending-post', id] });
    setActiveReplyId(null);
  };
  
  /* ---------------- Follow ---------------- */
  const { mutate: followMutation } = useMutation({
    mutationFn: storeFollow,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey:['following']
      })
      if (response.status === 201) {
        toast(`You are following ${post?.creator}`, { action: { label: <X size={16} /> } })
      }
    },
    onError: (err, creatorId, context) => {
      queryClient.setQueryData(['trending'], context.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey:['trending']
      })
    }
  })

  const handleFollow = useCallback((creator) => {
    followMutation(creator)
  }, [followMutation])


  /* ---------------- Unfollow ---------------- */
  const { mutate: unFollowMutation } = useMutation({
    mutationFn: storeUnFollow,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey:['following']
      })
      queryClient.invalidateQueries({ queryKey: ['view-trending-post', id] });
      if (response.status == 200) {
        toast(`You unfollow ${post?.creator}`, { action: { label: <X size={16} /> } })
      }
    },
    onError: (err, creatorId, context) => {
      queryClient.setQueryData(['trending'], context.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey:{
          queryKey:['trending']
        }
      })
    }
  })

  const handleUnFollow = useCallback((creator) => {
    unFollowMutation(creator)
  }, [unFollowMutation])


  /* ---------------- Like ---------------- */
  const { mutate: likeMutation } = useMutation({
    mutationFn: likePost,
     onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['view-trending-post', id] });
      if (response.status == 200) {
        toast(response?.data?.message, { action: { label: <X size={16} /> } })
      }
    }
  });

  /* ---------------- Focus comment input on mount ---------------- */
  useEffect(() => {
    commentInputRef.current?.focus();
  }, []);
  const handleLike = useCallback(()=>{
    likeMutation(id)
  },[likeMutation])
  
    if(!user){
    return <Login/>
  }


   return (
      <div className="min-h-screen bg-gradient-to-br px-4 from-pink-50 via-rose-50 to-red-50 p-1 pt-8 md:p-8">
        <SEO
        title={`${post?.postTitle || post?.title || 'Share it and Styleit !'} `}
        description={post?.content || post?.body || 'Get the best professional for your next outfit with Styleit Africa.'}
        image="https://styleit2-0.vercel.app/preview.png"
        url="https://styleit2-0.vercel.app"
        />
      {
        isLoading ? <TrendingPostLoader/>:
        isError ? <ErrorMessage error={error}/>:
        <div className="max-w-3xl mx-auto space-y-8">
        {/* ---------------- Post ---------------- */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-xl p-3.5 md:p-5 border border-pink-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              {
                post?.creator_pic?
                <Image src={post.creator_pic} className="w-12 h-12 rounded-full" />:
<div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm md:text-md font-semibold md:font-bold">
            </div>

              }
              <div>
                <p className="font-medium capitalize">{post?.creator}</p>
              <p className='text-sm'>
                  {post?.date
                    ? formatDistanceToNowStrict(new Date(post.date))
                    : ''
                }
              </p>
              </div>
            </div>
           {
            user?.role !== 'designer'&&  <PostFollowButton post={post} 
            handleFollow={handleFollow} 
            handleUnFollow={handleUnFollow} />
           }
          </div>

          <PostTitle title={post?.postTitle || post?.title} />
          <PostDescription description={post?.content || post?.body} />

          {post?.image?.length > 0 && (
            <ImageGallery _images={post?.image} />
          )}

          <Suspense fallback={null}>
              {isShared && <SharePostContainer post={post} setIsShared={setIsShared} />}
          </Suspense>

          <div className="flex justify-between items-center mt-4 text-primary">

              {
        isAdmin ? 
        // <div className='flex gap-[0.1rem] items-center hover:cursor-pointer' onClick={()=>handleLike((post?.id||post?.post_id||post?.id))}>
        <div className='flex gap-[0.1rem] items-center hover:cursor-pointer' onClick={handleLike}>
                    <p className='text-xs mt-1'>{postStats?.likes_Count}</p>
                  <ThumbsUp className='text-red-500 w-4 h-4'/>
                </div>:
      <PostLikeButton 
        handleLike={handleLike} 
        post={{ ...post, likes_Count: postStats?.likes_Count }} 
      />
      }
            <div className="flex items-center gap-1 text-xs">
              <span>{postStats?.Comment_Count || 0}</span>
              <Image src={message} className="w-4 h-4" />
            </div>

            <div
              onClick={() => setIsShared(true)}
              className="flex items-center gap-1 text-xs cursor-pointer"
            >
              <span>{postStats?.shares_Count || 0}</span>
              <Image src={shareIcon} className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* ---------------- Comments ---------------- */}
        <div className="bg-white rounded-xl shadow-xl p-3.5 md:p-6 border border-pink-100">
          <h3 className="text-xl font-bold mb-6">
            Comments <span className="text-pink-500">({postStats?.Comment_Count || 0})</span>
          </h3>

          {/* Add Comment */}
          <div className="flex gap-4 mb-6">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm md:text-md font-semibold md:font-bold">
              {(user?.profile_pic||user?.profilePic) ? (
                <Image src={user?.profile_pic||user?.profilePic} className='w-full h-full rounded-full' />
              ) : (
                
                user?.first_name?.slice(0, 2)?.toUpperCase()
              )}
            </div>

            <div className="flex-1 relative">
              <textarea
                ref={commentInputRef}
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleComment();
                  }
                }}
                placeholder="Write a comment..."
                className="w-full resize-none rounded-3xl border-2 border-pink-200 p-4 pr-14 placeholder:text-sm md:placeholder:text-lg
                           focus:ring-2 focus:ring-pink-400 outline-none"
              />
              <button
                disabled={comment.trim().length === 0 || isPending}
                onClick={handleComment}
                className="absolute right-3 bottom-3 p-2.5 md:p-3 rounded-full bg-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className='size-3 md:size-4' />
                )}
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6 pr-2">
            {allComments.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No comments yet</p>
            ) : (
              <>
                {allComments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                  />
                ))}

                {/* Intersection Observer Target for Infinite Scroll */}
                <div ref={observerTarget} className="flex justify-center py-4">
                  {isFetchingNextPage && (
                    <CommentLoader/>
                  )}
                  {!hasNextPage && allComments.length > 0 && (
                    <p className="text-gray-400 text-sm">No more comments</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      }
    </div>
   )
 
  
}