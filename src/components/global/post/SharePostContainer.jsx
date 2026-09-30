import { Copy, X } from 'lucide-react'
import React, { useState } from 'react'
import { copyToClipboard } from '@/lib/clipboard';
import { toast } from 'sonner'
import mobileLogo from '@/images/m_logo.png'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Image from '../Image';
import { useAuth } from '@/store/useAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet-async';


const SharePostContainer = ({setIsShared, post}) => {
  const {user} = useAuth();
  const [link] = useState(window.location.origin + '/trending/' + (post?.id || post?.postId))
  const [shareData] = useState({
    user: user?.id || user?.designer_id,
    sharepost: (post?.id || post?.postId),
    name: ""
  })

  const postTitle = post?.title || post?.postTitle || ""
  const postDescription = post?.content || post?.body || ""
  const shareMessage = postTitle && postDescription
    ? `${postTitle} - ${postDescription}`
    : postTitle || postDescription || ""

    
  const handleCopy = async() => {
    await copyToClipboard(link);
    navigator.clipboard.writeText(link)
    toast("Link copied", {
      description: <p className='text-white'>{link}</p>,
      action: {
        label: <X size={16} />,
      },
    })
  }

  const handleShare = async (platform) => {
    const value = {...shareData, name: platform}
    try {
      const response = await axios.post('share/', value, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      return response;
    } catch(e) {
      toast("Something went wrong while sharing this post, try again", {
        action: {
          label: <X size={16} />,
        },
      })
    }
  }
  

  return (

     <>
  <Helmet>
    {/* ===== FACEBOOK & WHATSAPP ===== */}
    <meta property="og:title" content={postTitle} />
    <meta property="og:description" content={postDescription} />
    <meta property="og:url" content={`https://styleit2-0.vercel.app/post/${post?.id || post?.postId}`} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Styleit Africa" />
    {!post?.img && <meta property="og:image" content="https://styleit2-0.vercel.app/preview.png" />}
    {post?.img && <meta property="og:image" content={post?.img[0]?.url} />}

    {/* ===== TWITTER / X ===== */}
    <meta name="twitter:card" content={post?.img ? "summary_large_image" : "summary"} />
    <meta name="twitter:title" content={postTitle} />
    <meta name="twitter:description" content={postDescription} />
    <meta name="twitter:site" content="@StyleitAfrica" />
    <meta name="twitter:image" content={post?.img?.length > 0 ? post?.img[0]?.url : "https://styleit2-0.vercel.app/preview.png"} />

    {/* ===== LINKEDIN ===== */}
    {/* LinkedIn reads og:* tags above, these are extras */}
    <meta property="og:locale" content="en_US" />

    {/* ===== TELEGRAM ===== */}
    {/* Telegram reads og:* tags above, no extra tags needed */}

    {/* ===== GENERAL SEO ===== */}
    <meta name="description" content={postDescription} />
    <link rel="canonical" href={`https://styleit2-0.vercel.app/post/${post?.id || post?.postId}`} />
  </Helmet>

  <div className={`py-6 px-4 flex justify-center items-center bg-[#0000001a] z-[999] fixed top-0 overflow-hidden transition-all duration-300 bottom-0 right-0 w-full`}>
    <div className='bg-white w-full md:w-[700px] relative shadow-lg rounded-lg pt-5 pb-10 px-5'>
      <div className='flex justify-between items-center px-5 my-3'>
        <div>
          <Image src={mobileLogo}/>
        </div>
        <div>
          <X className='cursor-pointer h-16 w-16 scale-[0.5] transition-all duration-300 hover:scale-[0.7]' onClick={() => setIsShared(false)}/>
        </div>
      </div>

      <h1 className='text-center text-xl font-bold text-primary mb-2'>Share it and style it!</h1>

      <div className='grid grid-cols-3 md:flex items-center justify-center gap-3 px-3 md:px-0'>
        <div className='cursor-pointer group shadow-md rounded-full px-5 pt-4 pb-3 transition-all scale-[0.95] duration-300 hover:scale-[1]'>
          <div className='w-[max-content] mx-auto' onClick={() => handleShare('Facebook')}>
            <FacebookShareButton url={link} quote={shareMessage} hashtag="#StyleitAfrica">
              <FacebookIcon className='rounded-full w-10 h-10 group-hover:text-primary'/>
            </FacebookShareButton>
          </div>
        </div>

        <div className='cursor-pointer group shadow-md rounded-full px-5 pt-4 pb-3 transition-all scale-[0.95] duration-300 hover:scale-[1]'>
          <div className='w-[max-content] mx-auto' onClick={() => handleShare('X')}>
            <TwitterShareButton url={link} title={shareMessage} hashtags={["StyleitAfrica"]}>
              <TwitterIcon className='rounded-full w-10 h-10 group-hover:text-primary'/>
            </TwitterShareButton>
          </div>
        </div>

        <div className='cursor-pointer group shadow-md rounded-full px-5 pt-4 pb-3 transition-all scale-[0.95] duration-300 hover:scale-[1]'>
          <div className='w-[max-content] mx-auto' onClick={() => handleShare('Whatsapp')}>
            <WhatsappShareButton url={link} title={shareMessage} separator=" — ">
              <WhatsappIcon className='rounded-full w-10 h-10 group-hover:text-primary'/>
            </WhatsappShareButton>
          </div>
        </div>

        <div className='cursor-pointer group shadow-md rounded-full px-5 pt-4 pb-3 transition-all scale-[0.95] duration-300 hover:scale-[1]'>
          <div className='w-[max-content] mx-auto' onClick={() => handleShare('LinkedIn')}>
            <LinkedinShareButton url={link} title={postTitle} summary={postDescription} source="Styleit Africa">
              <LinkedinIcon className='rounded-full w-10 h-10 group-hover:text-primary'/>
            </LinkedinShareButton>
          </div>
        </div>

        <div className='cursor-pointer group shadow-md rounded-full px-5 pt-4 pb-3 transition-all scale-[0.95] duration-300 hover:scale-[1]'>
          <div className='w-[max-content] mx-auto' onClick={() => handleShare('Telegram')}>
            <TelegramShareButton url={link} title={shareMessage}>
              <TelegramIcon className='rounded-full w-10 h-10 group-hover:text-primary'/>
            </TelegramShareButton>
          </div>
        </div>

        <div>
          <div className='cursor-pointer group shadow-md rounded-full px-5 pt-4 pb-3 transition-all scale-[0.95] duration-300 hover:scale-[1]'>
            <div className='w-[max-content] mx-auto'>
              <Copy onClick={handleCopy} className='group-hover:text-primary w-10 h-10'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default SharePostContainer