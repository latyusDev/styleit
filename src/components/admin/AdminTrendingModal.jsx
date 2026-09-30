import { usePost } from '@/store/usePost'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Ban, Loader2, Trash, Trash2Icon, X } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const AdminTrendingModal = ({setAdminModal,post}) => {
    const {deletePost,banPost} = usePost();
    const queryClient = useQueryClient()

     const {mutate:deleteMutate,isPending:isDelete} = useMutation({
        mutationFn:()=>deletePost(post.id),
        onSuccess:(response)=>{
          queryClient.invalidateQueries({queryKey:['trending']})
            if(response?.status == 200){
        setAdminModal(null)
        toast("post deleted successfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
            
        },
        onError: (error, context) => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
      })

    const handleDeletePost = async()=>{
     deleteMutate()
    }

       const {mutate,isPending} = useMutation({
        mutationFn:()=>banPost(post.id),
        onSuccess:(response)=>{
          queryClient.invalidateQueries({queryKey:['trending']})
            if(response.status == 200){
        setAdminModal(null)
        toast("post banned successfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
            
        }, onError: (error) => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          },
      })
    const handleBanPost =()=>{
      mutate()
    }


  return (
    <div className="absolute right-[0rem] top-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10 animate-slideDown">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#FF617C] to-[#FF9AAE] px-4 py-3">
       <div>
           <p className="text-white font-semibold">{post.lastName} {post.firstName}</p>
        <p className="text-white/80 text-sm">{post.email}</p>
       </div>
       <button className='text-white' onClick={()=>setAdminModal(null)}><X /></button>
      </div>
      <div className="py-2">
                  <button
                    className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 transition-colors text-red-600"
                        onClick={handleDeletePost}
                  >
                    <Trash2Icon size={18} className="text-red-600" />

                    <span>Delete </span>
                    {isDelete&&<Loader2 className='ml-auto w-[max-content] animate-spin'/>}
                  </button>

                  <hr className="my-2 border-gray-200" />

                  <button
                    className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 transition-colors"
                        onClick={handleBanPost}
                  >
                    <Ban size={18} />
                    <span>Ban </span>
                    {isPending&&<Loader2 className='ml-auto w-[max-content] animate-spin'/>}
                  </button>
                </div>

             
                </div>
  )
}

export default AdminTrendingModal
