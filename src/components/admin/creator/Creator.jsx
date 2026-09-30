import { Eye, Loader2, MoreHorizontal, Trash2, UserX, X } from 'lucide-react'
import userPicture from '@/images/profile_i.png'
import React from 'react'
import { Link } from 'react-router-dom'
import Image from '@/components/global/Image'
import { useAdminStore } from '@/store/admin/useAdmin'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const Creator = ({creator,id,handleOptions}) => {
     const {deactivateUser} = useAdminStore();
        const userData ={desi_id:creator?.id}
    
        const queryClient = useQueryClient();
        const {mutate:banAccount,isBanPending} = useMutation({
            mutationFn:()=>deactivateUser(userData),
            onSuccess:(response)=>{
              
              queryClient.invalidateQueries('admin-clients')
               if(response.success){
                 toast("Account banned successfully", {
                    action: {
                    label: <X size={16} />,
                  },
                })
             }
              
            }
            
        })
        
        const {mutate:deactivateAccount,isPending} = useMutation({
            mutationFn:()=>deactivateUser(userData),
              onSuccess:(response)=>{
              queryClient.invalidateQueries('admin-clients')
               if(response.status === 'success'){
                 toast("Account deactivated successfully", {
                    action: {
                    label: <X size={16} />,
                  },
                })
             }
              
            }
            
        })
    
        const handleAccount = (value)=>{
          if(value === 'deactivate'){
              deactivateAccount();
            }else{
              banAccount();
          }
        }
        
    
  return (
      <div 
        
        data-role="creators"
        className={`
           grid grid-cols-1 gap-4 md:grid-cols-[2fr_2fr_1fr_1fr_1fr] bg-white shadow-md rounded-lg p-7  transition-all cursor-pointer relative
            ${creator.status === 'actived' && 'border-l-4 border-l-green-500'}
            ${creator.status === 'deactived' && 'border-l-4 border-l-red-500'}
            ${creator.status === 'pending' && 'border-l-4 border-l-yellow-500'}
            ${creator.status === 'suspended' && 'border-l-4 border-l-black'}
        `}
    >
        {/* Name */}
        <div className="flex-[2]" data-testid={`name-${creator.id||creator.designer_id}`}>
            <div className='flex items-center gap-3'>
                <Image 
                    src={creator.profil_pic} 
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    alt="User"
                />
                <span className="capitalize break-words break-all">
                    {creator.lastname || creator.last_name} {creator.firstname || creator.first_name} 
                </span>
            </div>
        </div>

        {/* Email */}
        <div className="flex-[2] text-wap" data-testid={`email-${creator.id||creator.designer_id}`}>
            <span className="text-gray-700 break-all">{creator.email}</span>
        </div>

        {/* Gender */}
        <div className="flex-1 capitalize" data-testid={`gender-${creator.id||creator.designer_id}`}>
            {creator.gender}
        </div>

        {/* Status */}
        <div className="flex-1" data-testid={`status-${creator.id||creator.designer_id}`}>
            <span className={`
                capitalize font-medium
                ${creator.status === 'pending' && 'text-yellow-500'}
                ${creator.status === 'approved' && 'text-green-500'}
                ${creator.status === 'actived' && 'text-green-500'}
                ${creator.status === 'banned' && 'text-red-500'}
                ${creator.status === 'deactived' && 'text-red-500'}
                ${creator.status === 'suspended' && 'text-black'}
            `}>
                {creator.status}
            </span>
        </div>

        {/* Actions */}
        <div className="flex-1 text-center relative" data-testid={`actionButton-${creator.id||creator.designer_id}`}>
            <MoreHorizontal
                className='cursor-pointer inline-block hover:text-primary transition-colors'
                onClick={() => handleOptions(creator.id||creator.designer_id)}
            />
            {id === (creator.id||creator.designer_id) && (
                <div 
                    data-testid={`menu-${creator.id||creator.designer_id}`} 
                    className='shadow-lg flex gap-3 py-5 z-30 px-4 bg-white rounded-md w-max absolute top-12 right-4'
                >
                    <Link to={`${creator.id||creator.designer_id}/profile/ct`}>
                        <Eye className='text-green-500 text-lg hover:text-green-600 cursor-pointer'/>
                    </Link>
                    <p>
                    {
                        isPending ? <Loader2 className="size-5 mt-1 animate-spin" />:
                <Trash2 className='text-red-500 text-lg cursor-pointer' onClick={()=>handleAccount('deactivate')}  />
                    }
                </p>
              
                </div>
            )}
        </div>
    </div>
  )
}

export default Creator
