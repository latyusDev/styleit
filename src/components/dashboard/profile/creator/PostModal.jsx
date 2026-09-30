
import { X } from 'lucide-react'
import React  from 'react'
import { useGlobalStore } from '@/store/global/useGlobal'
import MyPostForm from './MyPostForm'

const PostModal = () => {
    const {setPostModal} = useGlobalStore()
 
  return (
    <div className='px-5 font-lato py-6  flex justify-center  gap-3 items-center backdrop-blur-[0.2rem] bg-white/20 z-[999] 
     fixed top-0  bottom-0 left-0 right-0  overflow-hidden transition-all duration-300 '>
        <div className=' bg-white h-[520px]   shadow-lg shadow-gray-400 rounded-md w-[600px] p-7 py-4'>
            <div className='flex justify-between items-center max-w-[400px] ml-auto'>
                <h1 className='font-[700] text-2xl md:text-3xl'>Create post</h1>
                <div  onClick={()=>setPostModal()} className="cursor-pointer bg-gray-500 p-3 text-white rounded-full">
                    <X/>
                </div>
            </div>
            {/* post form */}
     <MyPostForm/>
        </div>
    </div>
  )
}

export default PostModal