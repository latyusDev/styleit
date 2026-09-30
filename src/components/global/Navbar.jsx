import { X } from 'lucide-react';
import { useGlobalStore } from '@/store/global/useGlobal';
import m_logo from '@/images/m_logo.png'
import Image from './Image';
import { NavLink, useNavigate } from 'react-router-dom';
import NavbarLinks from './NavbarLinks';
import User from './User';
import { useAuth } from '@/store/useAuth';
import profileImage from '../../images/avatar_profile.png'
import { clientDashboardLinks, dashboardLinks, navItems } from '@/static/data';
import { useQuery } from '@tanstack/react-query';
import { useProfileStore } from '@/store/useProfile';
import { toast } from 'sonner';
import BankDetails from './BankDetails';
import ErrorMessage from './ErrorMessage';


export default function Navbar() {
const {setIsNavbarOpened} = useGlobalStore();
const {user,logout} = useAuth();
const {getProfileDetails} = useProfileStore()
const navigate = useNavigate()
const isClient = user?.role === 'client'
const {data,isLoading,isError,error} = useQuery({
        queryKey:['following'],
        queryFn:()=>getProfileDetails(user),
        enabled:!!(user&&['client','designer'].includes(user?.role)),
        staleTime:1000*30*60
        })
    
    const totalFollowing = data?.data?.total_following
    const totalFollowers = data?.data?.follow_count
    const totalNotifications = data?.data?.total_notification
     
        

const handleLogout = async()=>{
    try {
     const result = await logout();
      toast(result?.message, {
                action: {
                label: <X size={16} />,
              },
            })
    setIsNavbarOpened()
    navigate('/login')


   } catch (error) {
     toast(error?.response?.message||error?.message||'something went wrong, try again', {
                action: {
                label: <X size={16} />,
              },
            })
   }
}
    const userLinks = isClient ? clientDashboardLinks : dashboardLinks

  return (

        <div className='font-lato md:hidden'>
              <nav className='px-5 font-lato py-6  flex justify-center  gap-3 bg-[rgba(0,0,0,0.1)]   z-[999]  fixed top-0  bottom-0 left-0 right-0  overflow-hidden transition-all duration-300 '>
            
            <div className="overflow-hidden  bg-gradient-to-tl to-white font-lato to-[50%] from-[50%] md:to-[54.2%] from-pink-50 md:from-[54.7%]  text-white w-[1200px] shadow-md rounded-md relative z-50 py-6">
               {/* header */}
            <div className="flex justify-between items-center mb-3 border-b-2 pb-2 border-gray-200 px-5">
                  <div>
                      <Image src={m_logo} />
                  </div>
                  <div>
                  <X className="h-8 w-8 -mt-2 text-sidebar scale-[0.8] transition-all duration-300 hover:scale-[1.5] cursor-pointer"
                   onClick={()=>setIsNavbarOpened(false)}/>

                  </div>
            </div>

            {/* body */}
                <h1 className=' font-[700] text-xl text-sidebar px-5'>General</h1>


             <ul className=" px-5 md:text-sm lg:text-[1.27rem] mt-3  justify-between  text-[#000000] text-[20px] items-center">
               {
                    navItems.map(link=>(
                       <NavbarLinks link={link} key={link.name}/>
                    ))
               }
                {
                    !user&&<>
                            <li className='mt-1 text-sidebar capitalize text-[0.97rem] hover:text-primary transition-all duration-150'   onClick={()=>setIsNavbarOpened()}>
                           <NavLink to='/login' className={({isActive})=>isActive ? 'w-full bordder-b-[2px] text-primary':''}>login</NavLink> 
                </li>
                <li className='mt-1 text-sidebar capitalize text-[0.97rem] hover:text-primary transition-all duration-150'   onClick={()=>setIsNavbarOpened()}>
                           <NavLink to='/signUp' className={({isActive})=>isActive ? 'w-full bordder-b-[2px] text-primary':''}>sign up</NavLink> 
                </li>
                    
                    </>
                }
                </ul>

                {
                user&&  <div>
                            <div className='text-sidebar mt-6 px-5 overflow-y-scroll h-[230px]'>
                                <h1 className=' font-[700] text-xl'>Dashboard</h1>
            
                                    
            
                                    <ul className="text-[0.97rem] mt-3  justify-between  text-[#000000] items-center">
                                    {
                                            userLinks.map(link=>(
                                            <NavbarLinks  link={link} key={link.name}/>
                                            ))
                                    }

                                     {
                                    isClient ?  <li className='mt-1.5  text-sidebar capitalize flex justify-between'>
                                        <p>following</p>
                                        <p className='text-primary'>{totalFollowing}</p>
                                    </li>:
                                    <div>
                                        <li className='mt-1.5 text-sidebar capitalize flex justify-between'>
                                        <p>followers</p>
                                        <p className='text-primary'>{totalFollowers}</p>
                                    </li>
                                    <li className='mt-1.5 text-sidebar capitalize flex justify-between'>
                                            <NavbarLinks link={{route:'notifications',name:'Notification'}} />
                                        <p className='text-primary'>
                                            
                                            {totalNotifications > 99 ? '99+':totalNotifications}</p>
                                    </li>
                                    </div>
                                   }
                                    {
                                        !isClient &&  <li className='mt-1.5  text-sidebar capitalize flex justify-between'>
                                               {
                                    isError?<div className='text-white'><ErrorMessage error={error}/></div>:
                                    <>
                                        <BankDetails isNav={true} bankDetails={data?.data?.bank} isLoading={isLoading}/>
                                        
                                    </>
                                    }
                                        </li>
                                    }
                                  
                                        </ul>
                            </div>
            
                                <div className='w-full flex items-center justify-between absolute text-red-600 bottom-4 px-5'>
                                    <div>
                                    <User
                                    userProps={{
                                            name:{userProfile:user,fullName:true,styles:'text-sidebar text-sm font-[400] capitalize'},
                                            indicator:{isIndicator:true,styles:'h-2 w-2 absolute bottom-2 right-0 rounded-full bg-green-300 '},
                                            image:{profileImage:user?.profile_pic||profileImage,styles:'w-[35px] h-[35px]'},
                                            container:' flex items-center gap-2 font-[700] text-lg font-lato'
                                    }}/>
                                    </div>
                                    <div>
                                        <button onClick={handleLogout}>Log out</button>
                                    </div>
                            </div>

                </div>

                }
            </div>

            </nav>
        </div>
  );
}