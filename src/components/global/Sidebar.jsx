import { sidebarLinks } from '@/static/data'
import React from 'react'
import Image from './Image'
import User from './User'
import { Button } from '../ui/button'
import userEdit from '../../images/user-edit_2.png'
import icon from '../../images/Icon.png'
import logout  from '../../images/logout.png'
import Followers from './Followers'
import { Link, useNavigate } from 'react-router-dom'
import SidebarLinks from './SidebarLinks'
import BankDetails from './BankDetails'
import { useGlobalStore } from '@/store/global/useGlobal'
import { useAuth } from '@/store/useAuth'
import { useQuery } from '@tanstack/react-query'
import ErrorMessage from './ErrorMessage'
import { useProfileStore } from '@/store/useProfile'
import { X } from 'lucide-react'
import { toast } from 'sonner'




const Sidebar = () => {

    const {user} = useAuth()
    const navigate = useNavigate()
    const {logout:logoutFn} = useAuth()
    const {getProfileDetails} = useProfileStore()
    const {setIsSidebarOpened} = useGlobalStore();

      const {data,isLoading,isError,error} = useQuery({
        queryKey:['following'],
        queryFn:()=>getProfileDetails(user),
        enabled:!!(user&&['client','designer'].includes(user?.role)),
        staleTime:1000*30*60
        })
        const isDesigner = user?.role === 'designer'


    const handleLogout = async()=>{
        
        try {
             const result = await  logoutFn()
      toast(result?.message, {
                action: {
                label: <X size={16} />,
              },
            })
        setIsSidebarOpened()
          navigate('/login')

   } catch (error) {
     toast(error?.response?.message||error?.message||'something went wrong, try again', {
                action: {
                label: <X size={16} />,
              },
            })
   }
     
    }
    
    const userRole = isDesigner?'creator':'client';
    const totalFollowing = data?.data?.total_following||0
    const totalFollowers = data?.data?.follow_count||0


  return (
    <div className='w-72 ml-auto p-5 md:pb-9 rounded-l-xl bg-sidebar  font-lato relative z-50 cursor-auto '>
        
        <User
            userProps={{
                    name:{userProfile:user,fullName:true,styles:'text-white capitalize'},
                    indicator:{isIndicator:true,styles:'h-2 w-2 absolute bottom-2 right-0 rounded-full bg-green-300 '},
                    image:{profileImage:isDesigner?user?.profile_pic:user?.profilePic ,styles:'w-[50px] h-[50px]'},
                    container:' flex items-center gap-4 font-[700] text-lg font-lato'
            }}/>

            <Link to={`/${userRole}/profile/edit`} className='block' onClick={()=>setIsSidebarOpened()}>
            <div className='flex justify-between text-lightGray text-md border-b pt-3 pb-2  border-lgray mt-5'>
                <div className='flex items-center gap-3'>
                    <Image src={icon} className="w-6 h-6" />
                    <p>Online</p>
                </div>
                <div className="flex gap-2 bg-primary text-white rounded-xl px-4 py-2">
                <Image src={userEdit} className="w-6 h-6"  />
                    Edit
                </div>
            </div>
            </Link>
        <ul className="  font-lato textmd text-lightGray ">
           {
           isDesigner?
            <li className='flex items-center gap-4 pl-2 md:pl-1 md:border-b pb-3 pt-4  border-lgray '> 
                <Followers followers={totalFollowers} styles="text-md md:text-lg"/>
                <p className={`${totalFollowers <10?'ml-2':''}`}>Followers</p>
            </li> :
            <li className='flex items-center gap-4  pl-2 md:pl-1 md:border-b py-3 border-lgray '> 
                <Followers followers={totalFollowing} styles="text-md text-center  md:text-lg"/>
                <p className={`${totalFollowing <10?'ml-2':''}`}>Following</p>
            </li>
           }
            <SidebarLinks role={user?.role} links={isDesigner?sidebarLinks.creator:sidebarLinks.client}/>
    </ul>
    <div className='flex items-center pl-1.5 border-b py-2 border-lgray '>
        <Image src={logout} className="w-6 h-6" />
        <Button className="-indent-1 bg-sidebar hover:bg-sidebar shadow-none text-lg text-red-600" onClick={handleLogout}>Logout</Button>
    </div>

    
            {
      isError?<div className='text-white'><ErrorMessage error={error}/></div>:
      <>
          {
          isDesigner&&<BankDetails isNav={false} bankDetails={data?.data?.bank} isLoading={isLoading}/>
          }
          
          
      </>
    }
    
    </div>
  )
}

export default Sidebar