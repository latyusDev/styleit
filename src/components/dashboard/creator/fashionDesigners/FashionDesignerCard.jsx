import Image from '@/components/global/Image'
import { useGlobalStore } from '@/store/global/useGlobal'
import { useAuth } from '@/store/useAuth'
import { Heart, Star } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FashionDesignerCard = ({designer}) => {
  const {setSearchModal} = useGlobalStore();
  const {user} = useAuth();
  const isDesigner = user?.role === 'designer'
  const navigate = useNavigate()

  const handleDesignerAppointment = ()=>{
    setSearchModal(false)
    if(isDesigner){
      navigate(`/user/${designer?.creator_id||designer?.id}/creatorDescriptions`)
    }else{
      localStorage.setItem('selectedDesigner',JSON.stringify(designer))
      navigate('/client/directBooking')
    }
  }

  return (
     <div className="mt-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-72 relative pt-16">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            
                <div className="relative">
                  <Image 
                    src={designer.profil_pic} 
                    alt={designer.creator}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                 <div className="absolute top-2 -right-1">
                                     <div className="bg-primary text-white p-1.5 rounded-full shadow-lg">
                                       <Star className="w-3 h-3 fill-current" />
                                     </div>
                                   </div>
                </div>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold capitalize text-gray-800 mb-2">{designer.first_name||designer.fname} {designer.last_name||designer.lname}</h3>
                <p  className="text-gray-600 mb-4 leading-relaxed" onClick={()=>setSearchModal(false)}>
                  {
                    designer.bio ?<>
                      {designer.bio&&designer?.bio.substring(0,40)+'...'}
                  <Link
                      to={`/user/${designer?.creator_id||designer?.id}/creatorDescriptions`}                    
                    className="text-primary hover:text-[#fd526f] ml-2 font-medium underline decoration-pink-300 hover:decoration-primary transition-colors duration-200"
                  >
                    read more
                  </Link>
                    </>:'No description yet'
                  }

                </p>

                <div className="flex items-center justify-center mb-4">
                    {designer?.rating&&
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{designer?.rating?.toFixed(1)} rating</span>

                      </div>
                    } 
                </div>
                 
                <button 
                onClick={handleDesignerAppointment}
                  className="w-full bg-primary cursor-pointer hover:bg-[#fd526f] text-white px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  {isDesigner ? 'View Profile':'Book Appointment'}
                </button>
              </div>
            </div>
  )
}

export default FashionDesignerCard