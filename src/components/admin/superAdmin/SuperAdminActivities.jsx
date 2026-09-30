import React, { useEffect, useState } from 'react'
import Admins from '../admin/Admins'
import StaffActivityIcon from './staff/StaffActivityIcon'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation, useQuery } from '@tanstack/react-query'
import ErrorMessage from '@/components/global/ErrorMessage'
import { useAdminStore } from '@/store/admin/useAdmin'
import { Button } from '@/components/ui/button'
import { Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import Paginator from '@/components/global/Paginator'



const PAGES_TO_SHOW = 3
const SuperAdminActivities = () => {
    const [currentAdmin,setCurrentAdmin] = useState(0);
    const [user,setUser] = useState('designers');
    const [postDetails,setPostDetails] = useState('post');
    const [page,setPage] = useState(1);

    const {getStaffActivities,deactivateAdmin} = useAdminStore();


     const { mutate,isPending } = useMutation({
    mutationFn:deactivateAdmin,
    onSuccess:()=>{
        toast("Admin account deactivated successfully", {
              action: {
              label: <X size={16} />,
            },
          })
    },
    onError: (error) => {
            toast(error?.response?.data?.message||error?.response?.data?.message||'something went wrong, try again', {
                  action: {
                  label: <X size={16} />,
                },
            })
        }
  });

     const { mutate:ActivateMutation,isPending:activatePending } = useMutation({
    mutationFn:deactivateAdmin,
    onSuccess:(response)=>{
        toast("Admin account activated successfully", {
              action: {
              label: <X size={16} />,
            },
          })
    },
      onError: (error) => {
              toast(error?.response?.data?.message||error?.response?.data?.message||'something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
  });

 
  
     const {data,isLoading,isError,error} = useQuery({
      queryKey:['staff-activities',page],
      queryFn:()=>getStaffActivities(page),
      refetchOnWindowFocus:false,
      staleTime:1000*60*5
     })

     if(isLoading){
      return  <Skeleton className='w-full h-[400px]  bg-gradient-to-tr from-primary to-sidebar '/>
     }

    const admin = data?.data[currentAdmin];

     const handleAdminStatus =(value)=>{
      if(value === 'activate'){
          ActivateMutation({admin_id:admin?.admin?.admin_id})
      }else{
          mutate({admin_id:admin?.admin?.admin_id})
      }
  } 

    
  return (
     <div >

              
            {
                    isError ?<ErrorMessage error={error}/>:
                    <div>
                      
                      {
                        admin === undefined ? <p>No user found</p>:
                       <div>
                        <h1 className='mt-4'>Total admin activities {admin?.total_activities} </h1>
                           <div className='flex gap-6 items-start justify-between '>
                          <div className=' md:flex-[0.25]'>
                      <Admins adminItem={data?.data} 
                      currentAdmin={currentAdmin}                 
                      setCurrentAdmin={setCurrentAdmin}/>
                    </div>
                      <div className='flex-[0.75] overflow-x-auto'>
                      
                        <div className='pl-4'>
                          {/* user tabs */}
                          <div className='flex gap-2 my-8 w-[300px] overflow-x-scroll md:overflow-hidden md:w-auto'>
                            <button onClick={()=>setUser('designers')} className={` px-4 md:flex-[0.5] rounded-md border bg-redd-500 py-4 text-whxite shadow-lg capitalize ${user==='designers'&&'bg-sidebar text-white'}`}>creator</button>
                            <button onClick={()=>setUser('customers')} className={` px-4 md:flex-[0.5] rounded-md border bg-redd-500 py-4 text-whxite shadow-lg capitalize ${user==='customers'&&'bg-sidebar text-white'}`}>client</button>
                            <button onClick={()=>setUser('salesrep')} className={` px-4 md:flex-[0.5] rounded-md border bg-redd-500 py-4 text-whxite shadow-lg capitalize ${user==='salesrep'&&'bg-sidebar text-white'}`}>representative</button>
                          </div>
                        <div className=' grid md:grid-cols-3 gap-6 flex-wrap'>
                          <div className={`  cursor-pointer 
                            bg-green-600 p-6 rounded-lg`}>
                            <div className=' justify-between text-white capitalize  text-lg'>
                                <div className='flex justify-between '>
                                    <p className='text-sm md:text-lg'> deactive</p> 
                                    <p className='text-sm md:text-lg'>{admin[user]?.deactivated}</p>                  
                                </div>
                              
                              <StaffActivityIcon activity={0}/>
                            </div>  
                        </div>
                          <div className={`  cursor-pointer 
                            bg-red-600 p-6 rounded-lg`}>
                            <div className=' justify-between text-white capitalize  text-lg'>
                                <div className='flex justify-between '>
                                    <p className='text-sm md:text-lg'> Banned  </p> 
                                    <p className='text-sm md:text-lg'>{admin[user]?.banned}</p>                  
                                </div>
                              
                              <StaffActivityIcon activity={1}/>
                            </div>  
                        </div>
                          <div className={`  cursor-pointer 
                            bg-black p-6 rounded-lg`}>
                            <div className=' justify-between text-white capitalize  text-lg'>
                                <div className='flex justify-between '>
                                    <p className='text-sm md:text-lg'> suspended  </p> 
                                    <p className='text-sm md:text-lg'>{admin[user]?.suspended}</p>                  
                                </div>
                              
                              <StaffActivityIcon activity={2}/>
                            </div>  
                        </div>
                          <div className={`  cursor-pointer 
                            bg-blue-500 p-6 rounded-lg`}>
                            <div className=' justify-between text-white capitalize  text-lg'>
                                <div className='flex justify-between '>
                                    <p className='text-sm md:text-lg'> dormant</p> 
                                    <p className='text-sm md:text-lg'>{admin[user]?.dormant}</p>                  
                                </div>
                              
                              <StaffActivityIcon activity={3}/>
                            </div>  
                        </div>
                        
                       

                    </div>
              
                        </div>
                       <div className='flex gap-2 my-8 overflow-x-scroll md:overflow-hidden w-[200px]'>
                            <button onClick={()=>setPostDetails('post')} className={`px-4 md:px-0 md:flex-[0.5] rounded-md border bg-redd-500 py-4 text-whxite shadow-lg capitalize ${postDetails==='post'&&'bg-sidebar text-white'}`}>Posts</button>
                            <button onClick={()=>setPostDetails('comment')} className={`px-4 md:px-0 md:flex-[0.5] rounded-md border bg-redd-500 py-4 text-whxite shadow-lg capitalize ${postDetails==='comment'&&'bg-sidebar text-white'}`} data-testid="comment">comments</button>
                          </div>
                           <div className=' grid md:grid-cols-2 gap-6 flex-wrap'>
                          <div className={`  cursor-pointer 
                            bg-black p-6 rounded-lg`}>
                            <div className=' justify-between text-white capitalize  text-lg'>
                                <div className='flex justify-between '>
                                    <p className='text-sm md:text-lg'> suspended</p> 
                                    <p className='text-sm md:text-lg'>{admin[postDetails]?.suspended}</p>                  
                                </div>
                              
                              <StaffActivityIcon activity={0}/>
                            </div>  
                        </div>
                          <div className={`  cursor-pointer 
                            bg-red-600 p-6 rounded-lg`}>
                            <div className=' justify-between text-white capitalize  text-lg'>
                                <div className='flex justify-between '>
                                    <p className='text-sm md:text-lg'> Banned </p> 
                                    <p className='text-sm md:text-lg'>{admin[postDetails]?.banned}</p>                  
                                </div>
                              
                              <StaffActivityIcon activity={1}/>
                            </div>  
                        </div>
                        </div>
                      <div className='mt-8'>
                        <h1 className=' text-xl text-center mb-3'>Change admin status</h1>
                          <div className='grid grid-cols-2 gap-2 '>
                            <Button className='py-2 bg-sidebar text-white ' onClick={()=>handleAdminStatus('activate')}>
                          {
                          activatePending ? 
                          <span className='flex gap-2 items-center'>
                          <Loader2 className='ml-auto w-[max-content] animate-spin'/>
                          activating
                         </span>:'Activate'}</Button>
                         <Button className='py-2 bg-sidebar text-white ' onClick={()=>handleAdminStatus('deactivate')}>
                          {
                          isPending ? 
                          <span className='flex gap-2 items-center'>
                          <Loader2 className='ml-auto w-[max-content] animate-spin'/>
                          deactivating
                         </span>:'Deactivate'}</Button>
                        </div>
                      </div>
                    </div>
                    
                      </div>
                       </div>
                      }
                    </div>
            }
              <Paginator
                data={data}
                page={page} 
                setPage={setPage} 
                PAGES_TO_SHOW={PAGES_TO_SHOW} />
     </div>
  )
}

export default SuperAdminActivities
