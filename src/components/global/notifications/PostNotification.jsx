import React, { memo } from 'react'
import Image from '../Image'
import { Loader2 } from 'lucide-react'
import mobileLogo from '../../../images/m_logo.png' 
import { useAuth } from '@/store/useAuth'


const PostNotification = ({handlePostNotification,content,itemId,isPosting}) => {
     const {user} = useAuth()
     const isClient = user?.role === 'client'
     const clientId = user?.id
     const designerId = user?.designer_id;


  return (
    <div className='mt-5 max-w-[800px] mx-auto shadow-md rounded-md bg-gradient-to-tl to-pink-200  to-[60%] from-[40%] md:to-[50%] from-gray-50 md:from-[40.7%]'>
      <div className="p-5">
          <div className='flex justify-between '>
            <div className='flex gap-4 items-center'>
                <Image src={mobileLogo} />
                    <p>Post Notification</p>
            </div>
            <p onClick={()=>handlePostNotification({postId:content?.noti_postid,id:content?.noteid})}>{isPosting&&itemId == content.noteid?
                <Loader2 className=" h-4 w-4 text-primary animate-spin" />:<span className='text-sm md:text-md'>mark as read</span> }</p>

        </div>
        {
            !isClient &&<div>
                {
           content?.noti_creatorid !== designerId && content?.noti_postid&&<p className='mt-5'> {content?.noti_creator_firstname||content.noti_client_firstname} commented on your post</p>
       }
                {
           content?.noti_creatorid == designerId && content?.noti_postid&&<p className='mt-5'> You commented on a post</p>
       }
            </div>
        }
        {
            isClient&& <div>
        {
            content?.noti_postid && content?.noti_clientid == clientId&&<p className='mt-5'> You commented on a post</p>
        }
            </div>
        }
      </div>
        <div className='bg-gradient-to-tl to-gray-300 from-pink-300 h-[0.06rem] w-full'/>

       <p className='px-5 pt-2 pb-5  text-right mt-2'>{content?.noti_date}</p>
            
       
        
    </div>   
  )
}

export default memo(PostNotification)