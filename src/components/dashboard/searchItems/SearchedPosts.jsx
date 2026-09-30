import React, { useState } from 'react'
import Indicator from '@/components/global/Indicator'
import PostTitle from '@/components/global/post/PostTitle'
import PostActivities from '@/components/global/post/PostActivities'
import Image from '@/components/global/Image'
import PostDescription from '@/components/global/post/PostDescription'
import send from '../../../images/send.png'
import { Input } from '@/components/ui/input'
import TrendingPostLoader from '@/components/global/loaders/TrendingPostLoader'
import ImageGallery from '@/components/global/imageGallery/ImageGallery'
import ErrorMessage from '@/components/global/ErrorMessage'
import { Link, useNavigate } from 'react-router-dom'
import { usePost } from '@/store/usePost'
import SharePostContainer from '@/components/global/post/SharePostContainer'
import { useGlobalStore } from '@/store/global/useGlobal'
import { formatDistanceToNowStrict } from 'date-fns'
import { safeDate } from '@/static/data'
import { useComment } from '@/store/useComment'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'


const SearchedPosts = ({posts=[],error,isLoading,userDashboardSearchData}) => {
  const {isShared,setIsShared,likePost, setShowReport} = usePost();
  const [isCommentLoading,setIsCommentLoading] = useState(false);
    const {setSearchModal} = useGlobalStore();
    const {storeComment,setComment,comment} = useComment()
  const [isReportOpened,setIsReportOpened] = useState(false)
    const navigate = useNavigate()
  const queryClient = useQueryClient()
  
 const handleShowReport = () => {
    setShowReport(true)
    setIsReportOpened(false)
  }
  const handleComment = async(post)=>{
    setIsCommentLoading(true)
    try {
        await storeComment({postId: post.id || post.postId, commentText: comment}) 
        queryClient.invalidateQueries(['trending'])
        setComment('')
        toast('Comment added')
        navigate(`/trending/${post.id || post.postId}`)
    } catch (error) {
      toast(error?.response?.data.message)
      setIsCommentLoading(false)
    }finally{
      setIsCommentLoading(false)
    }
    
  }
   
    const handleKey = (e,post) => {
      if (e.key === 'Enter' && comment) handleComment(post)
    }
  
    const disableBth = comment?.trim()?.length === 0

  return (
   <div>
    
       {
          isLoading?<TrendingPostLoader/>:
          <div>

          {
            error.isPostError?<ErrorMessage error={error.postError}/>:
             <>
               {
          posts?.length === 0 && userDashboardSearchData ? <div>
                <h1>No posts found</h1>
          </div>:
           posts.map(post=>(
                 <div  key={post?.id} className='max-w-[480px] relative mx-auto mt-10 pb-16'>
                  {
      // showReport&&<Report user={}/>
    }
    {isReportOpened && 
        <div data-testid="options" className='shadow absolute bg-white z-[9999] right-6 top-7 rounded-lg py-5 w-[130px]'>
        
                <p className='capitalize text-lg py-0.5 cursor-pointer pl-5 hover:bg-slate-100 text-yellow-500 font-[500]' 
                onClick={handleShowReport}>report</p>
            </div>
          }
     
    <div className='relative border border-gray-200 rounded-2xl  text-sm  p-3.5'>
     
        <div className='flex justify-between items-center '>
          <div className=' flex items-center gap-3 font-[700] text-lg font-lato '>
            <div className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm md:text-md font-semibold md:font-bold">
                <Image src={post?.creator_pic}  className='w-full h-full rounded-full' />
              </div>
              <div className='flex flex-col gap-0 font-normal'>
                  <p className='font-semibold'>{post?.first_name} </p>
                  <p className='text-sm'>
                      {(post?.created_at)
                        ? formatDistanceToNowStrict(new Date(safeDate(post?.created_at)))
                        : ''}
                  </p>
              </div>
          
          </div>

            <div className='flex items-center ' onClick={()=>setIsReportOpened(!isReportOpened)} >
                <div data-testid="options-icon" className='relative  w-[25px] self-sstart h-[29px] cursor-pointer'/>
                <Indicator className='h-1 w-1 absolute top-4 right-4 rounded-full bg-black'/>
                <Indicator className='h-1 w-1 absolute top-6 right-4 rounded-full bg-black'/>
                <Indicator className='h-1 w-1 absolute top-8 right-4 rounded-full bg-black'/>

                </div>
        </div>
         <Link className='w-full' to={`/trending/${post?.id||post?.postId}`} onClick={()=>{setSearchModal(false)}}>

          <PostTitle title={post?.postTitle||post?.title}/>
          <PostDescription description={post?.content||post?.body}/>
      </Link>
        {
          post?.image&&post?.image?.length !== 0&&<ImageGallery _images={post?.image}/>
        }
        <PostActivities
         comments={post.Comment_count} 
         likePost={likePost}
         post={post} 
         isCommentOpened={false} 
         setIsCommentOpened={()=>{}}
         share={{isShared,setIsShared}} 
          />
        <div className='relative'>
        <Input type="text"  
        onKeyDown={(e)=>handleKey(e,post)} 
        onChange={(e)=>setComment(e.target.value)}
          className="h-12 rounded-2xl border border-gray-200  focus-visible:ring-0"/>
          {
            isCommentLoading ? 
            <Loader2 className='ml-auto w-[max-content] animate-spin absolute top-3.5 md:top-2.5 right-2.5 text-primary' />:
           <button   onClick={()=>handleComment(post)} disabled={disableBth}>
             <Image 
            src={send} 
         
            className='absolute top-3.5 md:top-2.5 right-2.5 w-5 h-5 md:w-7 md:h-7 '
          />
           </button> 
          }
        </div>
    </div>
    {
  isShared&&<SharePostContainer setIsShared={setIsShared} post={post}/>
}
</div>
           ))
          }
          </>
            
          }
          </div>
       }
   </div>
  )
}

export default SearchedPosts