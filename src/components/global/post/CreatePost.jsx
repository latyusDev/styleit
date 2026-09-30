import React from 'react'
import profileImage from '../../../images/profile_i.png'
import Image from '../Image'
import { Button } from '@/components/ui/button'
import Indicator from '../Indicator'
import gallery from '../../../images/gallery-add.png'
import PostModal from '@/components/dashboard/profile/creator/PostModal'
import { useGlobalStore } from '@/store/global/useGlobal'
import { useAuth } from '@/store/useAuth'


const CreatePost = () => {
  const {postModal,setPostModal} = useGlobalStore()
  const {user} = useAuth();
  
  return (
    <div>
        <div >
          {
            postModal&&<PostModal/>
          }
          
    <div onClick={()=>setPostModal()} className='flex items-center  justify-between relative border-b border-gray-100 h-16  max-w-[500px] mt-12 mx-auto md:mx-0'>
          <Image src={user?.profile_pic||profileImage} className="w-12 h-12 block rounded-full"/>
        <Indicator className='h-2 w-2 absolute top-2.5 left-9 md:hidden rounded-full bg-red-500'/>
        <p  className=" pl-3 pt-4 cursor-pointer h-full md:basis-[58%] text-gray-400 text-md md:text-lg">Create post</p>
        <div className='flex gap-3 md:gap-12 items-center justify-end '>
              <Image src={gallery} className="w-6 h-6 cursor-pointer " />
            <Button className='text-white px-5 py-4 md:py-0 md:px-8 rounded-lg '>Post</Button>
        </div>
    </div>
      </div>
        
    </div>
  )
}

export default CreatePost