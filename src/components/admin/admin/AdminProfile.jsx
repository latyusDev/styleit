import Image from '@/components/global/Image';
import React, { useEffect, useRef, useState } from 'react'
import avatar from '@/images/avatar_profile.png'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import SingleLoader from '@/components/global/loaders/SingleLoader';
import UserProfileCard from '../shared/profile/UserProfileCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/store/useAuth';
import { useAdminStore } from '@/store/admin/useAdmin';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const AdminProfile = ({data,isLoading}) => {
      const [section,setSection] = useState({
      businessName:true,
      personalInfo:true,
      address:true, 
    })
    const {updateProfileImage} = useAdminStore();
    const {user} = useAuth()    
    const isSuperAdmin = user?.role === 'superadmin'
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
      const [currentId,setCurrentId] = useState(null)
      const form = useForm({
          resolver:zodResolver(),
          defaultValues:{
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            gender:'',
            businessName:'',
            country:'',
            state:'',
            street:'',
            lga:'',
            picture:'',
          }
        })


  

   
        
    
         useEffect(() => {
          const formValues = {
              firstName:data?.user?.firstname,
              lastName:data?.user?.lastname,
              email:data?.user?.admin_email||data?.user?.spadmin_email,
              phoneNumber:data?.user?.admin_phone||data?.user?.spadmin_phone,
              gender:data?.user?.admin_gender||data?.user?.spadmin_gender,
              address:data?.user?.admin_address||data?.user?.spadmin_address,
              picture:data?.user?.admin_pic||data?.user?.spadmin_pic,
          }
         
          form.reset(formValues)
          }, [data, form])
        
        const handelSection = (id,data)=>{
            setSection(data)
            setCurrentId(id)
        }
        
        
    const handleEdit = (e)=>{
        const id = e.currentTarget.dataset.id
        switch(id){
          case 'personal info':
            handelSection(id,{...section,personalInfo:false})
          break;
          case 'address':
            handelSection(id,{...section,address:false})
          break;
          default :
            handelSection(id,{personalInfo:false,address:false})
        }
    }

      const onSubmit = (values)=>{
        console.log(values)
      }

      
const handleFileChange = async(e) => {
  const file = e.target.files[0];
  if (!file) return;
  const objectUrl = URL.createObjectURL(file);
  setPreviewUrl(objectUrl);
  try{
      const response = await updateProfileImage(file);
       toast(response?.message, {
                action: {
                label: <X size={16} />,
              },
            })
          }catch(error){
    toast(error?.response?.data?.message||'try again later', {
             action: {
             label: <X size={16} />,
           },
         })

  }
};
    



  return (
    <div className='pb-24 md:ml-4'>
  <Form {...form} data-testid="edit-profile-form ">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-4 xl:px-0">
          <UserProfileCard name='' age={78} cardProps = {{sectionId:'businessName',
            title:`${isSuperAdmin ? 'Super Admin Profile':'Admin Profile'}`,isAdmin:true,currentId,handleEdit}}  >

                {
                  isLoading ? <Skeleton className='w-full h-[100px]  bg-gradient-to-tr from-primary to-sidebar'/>:
                 
<div className='flex items-center gap-4 p-6'>
  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
    {isLoading ? (
      <SingleLoader name='circle' />
    ) : (
      <>
        <Image
          src={previewUrl || (data?.user?.spadmin_pic ? data.user.spadmin_pic : avatar)}
          className="rounded-full size-[120px] object-cover transition-opacity duration-200 group-hover:opacity-60"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-white text-xs mt-1 font-medium">Change</span>
        </div>
      </>
    )}

    {/* Hidden file input */}
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
    />
  </div>

  <div>
    <p className='capitalize'>full name: {data?.user?.lastname || ''} {data?.user?.firstname || ''}</p>
    <p className='capitalize'>user: {isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
  </div>
</div>
              // <div className='flex items-center gap-4 p-6'>
              // <div>
                
              //           {
              //             isLoading ? <SingleLoader name='circle'/>:
              //             <Image src={data?.user?.spadmin_pic?data?.user?.spadmin_pic:avatar} className="rounded-full size-[120px]" />
              //           }
              // </div>
              // <div>
              //         <p className='capitalize'>full name: {data?.user?.lastname||''} {data?.user?.firstname||''}</p>
              //         <p className='capitalize'>user: {isSuperAdmin ? 'Super Admin':'Admin'}</p>
              // </div>
              // </div> 
                }
              

          </UserProfileCard>

          {/* personal info */}

          <UserProfileCard cardProps = {{sectionId:'personal info',isAdmin:true,title:'personal info',currentId,handleEdit}} >
                


                  
                      <div className='flex  flex-col md:flex-row justify-between gap-6 md:gap-10 '>
                        <div className='flex-[0.48]'>
                                        <div className='relative mt-1 md:mt-5'>
                      

                    <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                      className=' left-3  transition-all duration-300 
                                        font-[700]'>First Name</FormLabel>
                                        {
                                            isLoading ? <SingleLoader/>:<Input type="text" id="firstName"   className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]   text-lg shadow-none pl-3 block h-12 text-white
                                            focus-visible:ring-0' {...field} data-testid="firstName"/>
                                        }
                                      
                                            
                                    
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>
                      
                        <div className='relative mt-5 '>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                    <div>
                                    
                                    <FormLabel 
                                      className={` left-3 -top-2  transition-all duration-300 
                                        font-[700]`}>Last Name</FormLabel>

                                          {
                                            isLoading ? <SingleLoader/>:
                                      
                                      <Input type="text" id="lastName"   className='capitalize mt-2 disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]   text-lg shadow-none pl-3 block h-12 text-white
                                            focus-visible:ring-0' {...field} data-testid="lastName"/>
                                        }
                                    </div>
                                      </FormControl>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>

                        </div>
                      
                        <div className='flex-[0.48]'>

                            <div className='relative mt-1 md:mt-5'>
                      

                    <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                      className=' left-3  transition-all duration-300 
                                        font-[700]'>Email</FormLabel>
                                          {
                                            isLoading ? <SingleLoader/>:
                                      
                                          <Input type="text" id="email"   className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]   text-lg shadow-none pl-3 block h-12 text-white
                                            focus-visible:ring-0' {...field} data-testid="email"/>
                                        }
                                    
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>
                      
                        <div className='relative mt-5 '>
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                    <div>
                                    <FormLabel htmlFor='phoneNumber' className={`${form?.formState?.errors?.lastName?.message?' bottom-10':' bottom-3.5'} block bg-white    w-[max-content]  h-[max-content] `}>
                                    </FormLabel>
                                    <FormLabel 
                                      className={` left-3 -top-2  transition-all duration-300 
                                        font-[700]`}>Phone number</FormLabel>
                                    {
                                            isLoading ? <SingleLoader/>:
                                    <Input type="text" id="phoneNumber"   className='capitalize mt-2 disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]  text-lg shadow-none pl-3 block h-12 text-white
                                              focus-visible:ring-0'  {...field} data-testid="phoneNumber" />
                                        }
                                      
                                            
                                    </div>
                                      </FormControl>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>

                        </div>
                      
                      </div>
                     
                        {/* address */}
        <div className='flex  flex-col md:flex-row justify-between gap-6 md:gap-10 '>
              <div className={`flex-[0.48]  relative md:mt-5`}>
                      

                    <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                      className=' left-3  transition-all duration-300 flex-[0.48] 
                                        font-[700]'> Gender</FormLabel>
                                        {
                                            isLoading ? <SingleLoader/>:
                                        <Input type="text" id="gender"  className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]   text-lg shadow-none pl-3 block h-12 text-white
                                              focus-visible:ring-0' {...field} data-testid="gender"/>
                                        }
                                      
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>
              <div className='flex-[0.48]'>

                <div className='relative mt-1 md:mt-5'>
            

          <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel 
                            className=' left-3  transition-all duration-300 
                              font-[700]'>Address</FormLabel>
                              {
                    isLoading ? <SingleLoader/>:
                                <Input type="text" id="address"  className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]   text-lg shadow-none pl-3 block h-12 text-white
                                  focus-visible:ring-0' {...field} data-testid="address"/>
                }
              
                          
                          <FormMessage className="text-red-500" />
                          </FormItem>
                      )}
                      />
            </div>
            
            

              </div>
          </div>
          </UserProfileCard>
                    </form>
      </Form>
    </div>
  )
}

export default AdminProfile