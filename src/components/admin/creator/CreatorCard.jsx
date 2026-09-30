import Image from '@/components/global/Image'
import { Eye, Loader2, MoreHorizontal, Trash2, UserX, X } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminStore } from '@/store/admin/useAdmin'

const CreatorCard = ({creator,id,handleOptions}) => {
    
         const {deactivateUser} = useAdminStore();
            const userData ={desi_id:(creator?.id||creator?.designer_id)}
    const queryClient = useQueryClient();

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
    
        const handleAccount = ()=>{
            deactivateAccount();
        }
  return (
     <div 
        key={creator.id||creator.designer_id} 
        className={`
            bg-white rounded-lg shadow-md p-5 relative
            ${creator.status === 'approved' && 'border-l-4 border-green-500'}
            ${creator.status === 'actived' && 'border-l-4 border-green-500'}
            ${creator.status === 'banned' && 'border-l-4 border-red-500'}
            ${creator.status === 'deactived' && 'border-l-4 border-red-500'}
            ${creator.status === 'pending' && 'border-l-4 border-yellow-500'}
            ${creator.status === 'suspended' && 'border-l-4 border-black'}
        `}
    >
        {/* Name with Image */}
        <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
                <Image
                    src={creator.profil_pic} 
                    className="w-12 h-12 rounded-full object-cover"
                    alt="User"
                />
                <div>
                    <p className='font-bold text-sm text-black'>Name</p>
                    <p className='capitalize'>
                        {creator.lastname || creator.last_name} {creator.firstname || creator.first_name}
                    </p>
                </div>
            </div>
            <MoreHorizontal
                className='cursor-pointer'
                onClick={() => handleOptions(creator.id||creator.designer_id)}
            />
        </div>

        {/* Email */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm text-black'>Email:</p>
            <p className='text-sm'>{creator.email}</p>
        </div>

        {/* Gender */}
        <div className='flex justify-between mb-3'>
            <p className='font-bold text-sm text-black'>Gender:</p>
            <p className='capitalize text-sm'>{creator.gender}</p>
        </div>

        {/* Status */}
        <div className='flex justify-between'>
            <p className='font-bold text-sm text-black'>Status:</p>
            <p className={`
                capitalize text-sm font-medium
                ${creator.status === 'pending' && 'text-yellow-500'}
                ${creator.status === 'approved' && 'text-green-500'}
                ${creator.status === 'actived' && 'text-green-500'}
                ${creator.status === 'banned' && 'text-red-500'}
                ${creator.status === 'deactived' && 'text-red-500'}
                ${creator.status === 'suspended' && 'text-black'}
            `}>
                {creator.status}
            </p>
        </div>

        {/* Mobile Actions Menu */}
        {id === (creator.id || creator.designer_id) && (
            <div className='flex justify-center gap-6 mt-4 pt-4 border-t border-gray-200'>
                <Link to={`${(creator.id || creator.designer_id)}/profile/ct`}>
                    <Eye className='text-green-500 text-xl hover:text-green-600'/>
                </Link>
                {
                        isPending ? <Loader2 className="size-5 mt-1 animate-spin" />:
                <Trash2 className='text-red-500 text-lg cursor-pointer' onClick={handleAccount}  />
                    }
            </div>
        )}
    </div>
  )
}

export default CreatorCard



