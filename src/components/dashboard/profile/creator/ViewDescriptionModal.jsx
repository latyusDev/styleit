import { X } from 'lucide-react'
import React from 'react'
import m_logo from '@/images/m_logo.png'
import Image from '@/components/global/Image'

export const ViewDescriptionModal = ({setIsViewModalOpen,description}) => {
 return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-6 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <Image src={m_logo}/>
              <button
                onClick={() => setIsViewModalOpen(false)}
               
              >
                 <X  className="h-8 w-8 scale-[0.8] transition-all duration-300 hover:scale-[1.5] cursor-pointer" />
                
              </button>
            </div>
              <h2 className="text-2xl font-bold">Profile Description</h2>
            <div className="overflow-y-auto flex-1 pr-2">
              <p className="text-gray-700 text-md">
                {description}
              </p>
            </div>
          </div>
        </div>
 )
}
