import React, { useState, lazy, Suspense, useCallback, memo } from 'react'
import Indicator from '../Indicator'
import send from '../../../images/send.png'
import PostActivities from './PostActivities'
import CreatorPostActivities from './CreatorPostActivities'
import Image from '../Image'
import PostTitle from './PostTitle'
import PostDescription from './PostDescription'
import ImageGallery from '../imageGallery/ImageGallery'
import PostFollowButton from './PostFollowButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { usePost } from '@/store/usePost'
import { useComment } from '@/store/useComment'
import { useCreatorStore } from '@/store/useCreator'
import { Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/store/useAuth'
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns'
import { safeDate } from '@/static/data'

// Lazy loaded — only shown on user interaction
const SharePostContainer = lazy(() => import('./SharePostContainer'))
const Report = lazy(() => import('../Report'))
const AdminTrendingModal = lazy(() => import('@/components/admin/AdminTrendingModal'))

const PostCard = ({ post }) => {
  const { pathname } = useLocation()
  const { user } = useAuth();
  const [adminModal, setAdminModal] = useState(null)
  const [isReportOpened, setIsReportOpened] = useState(false)
  const [isShared, setIsShared] = useState(false)  // ← moved to local state
  const { showReport, setShowReport, deletePost, likePost } = usePost();  // ← removed isShared, setIsShared from here
  const { setComment, isCommentOpened, setIsCommentOpened, storeComment, comment } = useComment();
  const [postId, setPostId] = useState(null);
  const { storeFollow,storeUnFollow } = useCreatorStore();
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  

  /* ---------------- follow ---------------- */

  const { mutate: followMutation } = useMutation({
    mutationFn: storeFollow,
    onSuccess: (response, creator) => {
      queryClient.invalidateQueries('following')
      if (response.status === 201) {
        toast(`You are following ${creator.firstName}`, { action: { label: <X size={16} /> } })
      }
    },
    onError: (context) => {
      queryClient.setQueryData(['trending'], context.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['trending'])
    }
  })


  const handleFollow = useCallback((creator) => {
    followMutation(creator)
  }, [followMutation])

 const { mutate: unFollowMutation } = useMutation({
    mutationFn: storeUnFollow,
    onSuccess: (response,creator) => {
      queryClient.invalidateQueries('following')
      if (response.status == 200) {
        toast(`You unfollow ${creator?.firstName}`, { action: { label: <X size={16} /> } })
      }
    },
    onError: (context) => {
      queryClient.setQueryData(['trending'], context.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['trending'])
    }
  })

  /* ---------------- Unfollow ---------------- */

  const handleUnFollow = useCallback((creator) => {
    unFollowMutation(creator)
  }, [unFollowMutation])

  const { mutate, isPending } = useMutation({
    mutationFn: storeComment,
    onSuccess: (response) => {
      if (response.status === 201) {
        setComment('')
        navigate(`/trending/${post.id || post.postId}`)
      }
      queryClient.invalidateQueries(['trending'])
    },
    onError: (error) => {
      toast(
        <p className='text-center text-xl'>
          {error?.response?.data?.message || error?.response?.data?.msg ||
            `${error?.message === 'Network Error' ? 'You are offline' : error?.message}` ||
            'Something went wrong while processing your request'}
        </p>,
        { action: { label: <X size={16} /> } }
      )
    }
  })

  const handleComment = useCallback(() => {
    mutate({ postId: post.id || post.postId, commentText: comment })
  }, [mutate, post.id, post.postId, comment])

  const handleWriteComment = useCallback((e) => {
    setComment(e.target.value)
  }, [setComment])

  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' && comment) handleComment()
  }, [comment, handleComment])

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast("post deleted successfully", { action: { label: <X size={16} /> } })
      }
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['myPosts'] })
      const previousPosts = queryClient.getQueryData(['myPosts'])
      queryClient.setQueryData(['myPosts'], (prevPosts) => {
        const posts = prevPosts.data.posts.filter(post => post.postId !== id)
        return { ...prevPosts, data: { ...prevPosts.data, posts } }
      })
      return { previousPosts }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['myPosts'])
    }
  })

  const handleDeletePost = useCallback((id) => {
    setIsReportOpened(false)
    deleteMutation(id)
  }, [deleteMutation])

  const checkAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  const handleReport = useCallback((id) => {
    if (checkAdmin) {
      setAdminModal(prev => prev === id ? null : id)
    } else {
      setIsReportOpened(prev => !prev)
    }
  }, [checkAdmin])

  const isTrendingPage = pathname === '/trending'

  // ── Guard: normalise images and comments so children never get undefined ──
  const postImages = Array.isArray(post?.img) ? post?.img : []
  const postComments = Array.isArray(post?.comments) ? post?.comments : []

  const handleShowReport = () => {
    setShowReport(true)
    setIsReportOpened(false)
  }

  return (
    <div className='max-w-[480px] mx-auto mt-10 relative'>
      {showReport && (
        <Suspense fallback={null}>
          <Report user={post.creator} setShowReport={setShowReport} />
        </Suspense>
      )}

      {isReportOpened && (
        <div data-testid="options" className='shadow absolute bg-white z-[9999] right-6 top-7 rounded-lg py-5 w-[130px]'>
          {isTrendingPage ? 
            <div>
                <p className='capitalize text-lg py-0.5 cursor-pointer pl-5 hover:bg-slate-100 text-yellow-500 font-[500]' onClick={handleShowReport}>report</p>
            </div>:
                <p className='capitalize text-lg py-0.5 pl-5 hover:bg-slate-100 cursor-pointer text-red-500 font-[500]' onClick={() => handleDeletePost(post.postId)}>delete</p>
          }
        </div>
      )}

      <div className='relative border border-gray-200 rounded-2xl text-sm p-3.5'>

        <div className='flex justify-between items-center'>
         
          <div className='flex justify-between items-center'>
         
                <div className=' flex items-center gap-3 font-[700] text-lg font-lato '>
            <div className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm md:text-md font-semibold md:font-bold">
                <Image src={post?.creator?.creator_pic||user?.profile_pic}  className='w-full h-full rounded-full' />
              </div>
              <div className='flex flex-col gap-0 font-normal'>
                  <p className='font-semibold'>{post?.creator?.firstName||user?.first_name} </p>
                  <p className='text-sm'>
                      {(post?.created_at||post?.date)
                        ? formatDistanceToNowStrict(new Date(safeDate(post?.created_at||post?.date)))
                        : ''}
                  </p>
              </div>
          
          </div>
        </div>
          

          <div className='flex items-center'>
            {isTrendingPage && user?.role === 'client' && (
              <PostFollowButton post={post} handleFollow={handleFollow} handleUnFollow={handleUnFollow} />
            )}
            <div data-testid="options-icon" className='relative w-[25px] self-start h-[29px] cursor-pointer' onClick={() => handleReport(post.id)}>
              <Indicator className='h-1 w-1 absolute bottom-2 right-0 rounded-full bg-black' />
              <Indicator className='h-1 w-1 absolute bottom-4 right-0 rounded-full bg-black' />
              <Indicator className='h-1 w-1 absolute bottom-6 right-0 rounded-full bg-black' />
            </div>
          </div>
        </div>

        <Link className='w-full' to={`/trending/${post.id || post.postId}`}>
          <PostTitle title={post.postTitle || post.title} />
          <PostDescription description={post.content || post.body} />
        </Link>

        {postImages?.length > 0 && (
          <ImageGallery _images={postImages} />
        )}

        {isTrendingPage ? (
          <PostActivities comments={postComments} likePost={likePost} post={post} setPostId={setPostId} share={{ isShared, setIsShared }} />
        ) : (
          <CreatorPostActivities likePost={likePost} post={post} share={{ isShared, setIsShared }} />
        )}

        <div className='relative' onClick={() => setIsCommentOpened(!isCommentOpened)}>
          <input
            type="text"
            onKeyDown={handleKey}
            onChange={handleWriteComment}
            className="h-12 rounded-2xl border w-full border-gray-200 outline-none pl-4 focus-visible:ring-0"
          />
          {isPending ? (
            <Loader2 className='ml-auto w-[max-content] animate-spin absolute top-3.5 md:top-2.5 right-2.5 text-primary' />
          ) : (
            <button disabled={comment?.trim()?.length === 0}>
              <Image src={send} className='absolute top-3.5 md:top-2.5 right-2.5 w-5 h-5 md:w-7 md:h-7' onClick={handleComment} />
            </button>
          )}
        </div>
      </div>

      {isShared && (
        <Suspense fallback={null}>
          <SharePostContainer setIsShared={setIsShared} post={post} />
        </Suspense>
      )}

      {adminModal === post.id && (
        <Suspense fallback={null}>
          <AdminTrendingModal setAdminModal={setAdminModal} post={post} />
        </Suspense>
      )}

    </div>
  )
}

export default memo(PostCard)