import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../images/logo.png'
import m_logo from '../../images/m_logo.png'
import hamburger from '../../images/hamburger.png'
import { useGlobalStore } from "@/store/global/useGlobal";
import { useAuth } from "@/store/useAuth";
import { Bell, Loader2, X } from "lucide-react";
import { useProfileStore } from "@/store/useProfile";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const AdminHeader = ()=>{
    
    const {user,logout} = useAuth()
    const navigate = useNavigate()
    const {setIsAdminOpened,isAdminOpened} = useGlobalStore()
        const {getProfileDetails} = useProfileStore()

    const { data:count, isLoading,isError } = useQuery({
    queryKey: ['notification-count'],
    queryFn: () => getProfileDetails(user),
    staleTime: 1,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    enabled:!!(user&&['client','designer'].includes(user?.role)),
    select: (data) => data?.data.total_notification
});

const handleLogout = async()=>{
   try {
     const result = await logout();
      toast(result?.message, {
                action: {
                label: <X size={16} />,
              },
            })
    navigate('/admin/login')

   } catch (error) {
     toast(error?.response?.message||error?.message||'something went wrong, try again', {
                action: {
                label: <X size={16} />,
              },
            })
   }
     

}

    return( 
        <header  className="relative z-20 shadow-[2px_0px_10px_#ccc]  py-5 px-4 lg:px-0 font-[400] font-[helvetica]">
      

             <div className="flex justify-between  w-full lg:hidden">
                <div >
                    <Link to={'/'}>
                        <img src={m_logo} alt="logo"  />
                    </Link>
                </div>
                {
                    isAdminOpened ? <X onClick={()=>setIsAdminOpened(false)} className="size-8 cursor-pointer text-primary"/>:
                        <div onClick={()=>setIsAdminOpened(true)} className="cursor-pointer">
                        <img src={hamburger} alt="" />
                        </div>
                }
            </div>
   <div className="hidden lg:flex justify-between md:px-8">
              <div className="hidden lg:block">
                <NavLink to={'/'}>
                    <img src={logo} alt="" className="w-[90px] lg:w-[115px]" />
                </NavLink>
            </div>
                <div className="md:flex md:gap-12 hidden  px-4 lg:px-0  items-center ">


                
                <ul className="flex  gap-6 font-bold lg:font-[400] md:text-sm lg:text-[1.27rem]  borgder justify-between  text-[#000000] text-[20px] items-center">
                    <li>
                        <NavLink to="/trending"  data-testid="trending" className={({isActive})=>isActive ? 'relative after:content-[" "] after:w-2/3 after:block  after:mx-auto after:mt-0.5 after:h-0.5 rounded-lg after:bg-primary ':''}>Trending</NavLink>
                    </li>
                    <li className="cursor-pointer" onClick={handleLogout}>
                        Logout
                    </li>

                  
                   
                    </ul>
           
                </div>
   </div>
           
        </header>
    )
}

export default AdminHeader

