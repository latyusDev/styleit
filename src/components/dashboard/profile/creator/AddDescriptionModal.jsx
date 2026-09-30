import { Loader2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import m_logo from '@/images/m_logo.png'
import Image from '@/components/global/Image'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'sonner'

export const AddDescriptionModal = ({setIsModalOpen,setDescription,description}) => {
  const [isLoading,setIsLoading] = useState(false)
  const  updateDescription = async () => {
    setIsLoading(true)
      try {
        const response = await axios.put(
          'designer/updatebio/',
          {bio:description},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json'
            }
          }
        );
        if(response.status === 200){
        setIsLoading(false)
            toast("Profile description updated successfully", {
                    action: {
                    label: <X size={16} />,
                  },
                })
      setIsModalOpen(false);

        }

      } catch (error) {
        return { 
          status: error.response?.status || 500, 
          data: error.response?.data || { message: 'Network error' }
        };
      }
  }
  const handleCancelDescription = () => {
    setDescription(localStorage.getItem('description'))
    setIsModalOpen(false)
  }

  useEffect(()=>{
    localStorage.setItem('description',description)
  },[])
  
  return (
    <div> 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <Image src={m_logo}/>
              <button
                onClick={handleCancelDescription}
              >
              <X  className="h-8 w-8 scale-[0.8] transition-all duration-300 hover:scale-[1.5] cursor-pointer"
               />

              </button>
            </div>
              <h2 className="text-md md:text-2xl font-bold text-centerd mb-2">Add Profile Description</h2>

            <div className="mb-6">
              <textarea
                rows="8"
                className="w-full px-4 py-3 border shadow-md rounded-lg focus:ring-0 outline-0 resize-none"
                placeholder="Write your profile description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='flex flex-col md:flex-row  md:justify-between items-center w-full'>
              <p className="text-sm mb-2 md:mb-0  w-full md:basis-[30%]  text-left  text-gray-500 mt-2">
                {description?.length} characters
              </p>
                <div className="flex gap-3 flex-col w-full md:flex-row md:justify-end ">
                     <button
                onClick={updateDescription}
                className={`
                px-6 py-2 ${!description?.length>0?'bg-pink-300':'bg-primary'} items-center  justify-center flex basis-full  cursor-pointer text-white rounded-lg hover:bg-primary/90 transition"
                  ${isLoading ? 'md:basis-[40%]':'md:basis-[35%]'}
                  `}
                disabled={isLoading||!description?.length>0}
              >
                        {isLoading&&<Loader2 className='animate-spin mr-2' size={15}/>} Save Description 
              </button>
              <button
                onClick={handleCancelDescription}
                className="px-6 py-2 border border-gray-300 basis-full md:basis-[35%] rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
             
            </div>
            </div>
          </div>
        </div>
      </div>
  )
}
