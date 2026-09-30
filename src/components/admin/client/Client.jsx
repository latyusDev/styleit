import Image from '@/components/global/Image'
import { useAdminStore } from '@/store/admin/useAdmin'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, Loader2, MoreHorizontal, Trash2, X } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'


const Client = ({client,id,handleOptions,borderClass,textColorClass}) => {
    const {deactivateUser} = useAdminStore();
    const userData = {cust_id:client?.id}

    const queryClient = useQueryClient();
    const {data:activation,mutate:banAccount,isBanPending} = useMutation({
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
    
    const {data:deactivation,mutate:deactivateAccount,isPending} = useMutation({
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
     <li key={client.id} className="relative list-none" data-role="clients">
        <div className={`${borderClass} grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4  md:flex-row justify-between items-center mt-5 shadow-md capitalize p-5 rounded-md relative`}>
            
            {/* Name */}
            <div className='flex items-end md:items-center justify-between w-full md:w-auto '>
                <p className='font-[700] capitalize md:hidden'>name:</p>
                <div className='flex items-center gap-3'>
                    <Image src={client.profilePic} className="w-[50px] h-[50px] rounded-full" />
                    <p data-testid={`name-${client.id}`}>
                        {client.lastname||client.last_name} {client.firstname||client.first_name}
                    </p>
                </div>
            </div>

            {/* Email */}
            <div className='flex justify-between  w-full md:w-auto '>
                <p className='font-[700]  md:hidden'>email:</p>
                <p className='lowercase break-all -ml-1' data-testid={`email-${client.id}`}>{client.email}</p>
            </div>

            {/* Gender */}
            <div className='flex justify-between w-full md:w-auto '>
                <p className='font-[700] capitalize md:hidden'>gender:</p>
                <p data-testid={`gender-${client.id}`}>{client.gender}</p>
            </div>

            {/* Status */}
            <div className='flex justify-between w-full md:w-auto '>
                <p className='font-[700] capitalize md:hidden'>status:</p>
                <p data-testid={`status-${client.id}`} className={textColorClass}>
                    {client.status}
                </p>
            </div>

            {/* Actions */}
            <div className='basis-[15%]'>
                <MoreHorizontal
                    className='cursor-pointer'
                    onClick={() => handleOptions(client.id)}
                    data-testid={`actionButton-${client.id}`}
                />
            </div>
        </div>

        {/* Actions Menu */}
        {id === client.id && (
            <div 
                data-testid={`menu-${client.id}`} 
                className='shadow-lg flex gap-3 py-5 z-30 px-4 bg-white rounded-md w-[max-content] absolute top-6 right-0'
            >
                <Link to={`${client.id}/profile/cn`}>
                    <Eye className='text-green-500 text-lg cursor-pointer' />
                </Link>
                <p>
                    {
                        isPending ? <Loader2 className="size-5 mt-1 animate-spin" />:
                <Trash2 className='text-red-500 text-lg cursor-pointer' onClick={()=>handleAccount('deactivate')}  />
                    }
                </p>
                {/* <p>
                    {
                        isBanPending ? <Loader2 className="size-5 mt-1 animate-spin" />:
                <UserX className='text-red-500 text-lg cursor-pointer' onClick={()=>handleAccount('ban')}  />
                    }
                </p> */}
            </div>
        )}
    </li>
  )
}

export default Client