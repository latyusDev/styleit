import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../images/logo.png'
import m_logo from '../../images/m_logo.png'
import hamburger from '../../images/hamburger.png'
import arrow from '../../images/arrow-down.png'
import User from "./User";
import Image from "./Image";
import { useGlobalStore } from "@/store/global/useGlobal";
import { useAuth } from "@/store/useAuth";
import { Bell, Loader2 } from "lucide-react";
import { useProfileStore } from "@/store/useProfile";
import { useQuery } from "@tanstack/react-query";

const Header = ()=>{
    
    const {user,logout} = useAuth()
    const {setIsSidebarOpened,isSidebarOpened,setIsNavbarOpened} = useGlobalStore()
    const navigate = useNavigate();
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
const isRepresentative = user?.role === 'representative'
    const handleRepresentativeLogout = ()=>{
        if(isRepresentative){
            logout()
            navigate('/representative/login')
        }
    }
    return( 
        <header  className="relative z-20 shadow-[2px_0px_10px_#ccc]  py-5 px-4 xl:px-0 font-[400] font-[helvetica]">
      

    <div className="flex justify-between md:hidden">
                <div >
                    <Link to={'/'}>
                        <img src={m_logo} alt="logo"  />
                    </Link>
                </div>
                <div onClick={()=>setIsNavbarOpened()}>
                <img src={hamburger} alt="" />
                </div>
            </div>
                <div className="md:flex md:gap-12 hidden  px-4 lg:px-0  items-center container">


                
                <ul className="flex basis-[63.6%]  font-bold lg:font-[400] md:text-sm lg:text-[1.27rem]  borgder justify-between  text-[#000000] text-[20px] items-center">
                    <li>
                        <NavLink to="/" className={({isActive})=>isActive ? 'relative after:content-[" "] after:w-2/3 after:block  after:mx-auto after:mt-0.5 after:h-0.5 rounded-lg after:bg-primary ':''}>Home</NavLink> 
                    </li>
                    <li>
                        <NavLink to="/fashionDesigners" data-testid="fashion-designer" className={({isActive})=>isActive ? 'relative after:content-[" "] after:w-2/3 after:block  after:mx-auto after:mt-0.5 after:h-0.5 rounded-lg after:bg-primary ':''}>Fashion designers</NavLink>
                    </li>
                    <li>
                        <NavLink to="/trending"  data-testid="trending" className={({isActive})=>isActive ? 'relative after:content-[" "] after:w-2/3 after:block  after:mx-auto after:mt-0.5 after:h-0.5 rounded-lg after:bg-primary ':''}>Trending</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/'}>
                            <img src={logo} alt="" className="w-[90px] lg:w-[115px]" />
                        </NavLink>
                    </li>
                   
                    </ul>

                    <div>
                        {
                            !user ? (<div className="flex gap-7 ">
                                <Link to='/login'   data-testid="login" className="border border-primary text-center cursor-pointer  w-[110px] text-sm lg:text-[1.5rem] lg:w-[190px] font-bold lg:font-[400]   py-4 rounded-lg">Login</Link>
                                <Link to='/signUp'  data-testid="signUp"  className="text-white bg-primary text-center cursor-pointer  shadow-[0px_4px_4px_0px_#FF617C33]  w-[110px] text-sm  lg:text-[1.5rem] lg:w-[190px] font-bold lg:font-[400] py-4 rounded-[0.65rem]">Sign up</Link>
                           </div>):(
                           <>
                           
                                {
                                    isRepresentative ? 
                                     <div className="flex items-center gap-2 capitalize ">
                                        <p>{user?.fullname?.split(' ')[0]}</p>
                                        <Image className='size-10 rounded-full' src={user?.profilePic}/>
                                    </div>
                                    :
                                     <div className="flex items-center gap-2.5 ">
                                <Link to={'/notifications'} className="relative">
                                    <Bell className="text-primary size-9"/>
                                   {
                                    isLoading && !isError ? <Loader2 className="mr-2 h-4 w-4 text-primary animate-spin absolute -top-3 -right-2 " />:<>
                                     {
                                        count < 10 ?
                                        <p className="absolute -top-4  bg-red-600 text-white px-2 rounded-full -right-2">{count}</p>:
                                        <p className="absolute -top-4  bg-red-600 text-white p-1 pl-1.5 py-1.5 text-xs rounded-full -right-2">{count>99?'99+':count}</p>
                                    }
                                    </>
                                   }
                                </Link>
                                <div data-testid="sidebar-button"  className="flex items-center gap-4 cursor-pointer
                            " onClick={()=>setIsSidebarOpened()}>
                                        <Image src={arrow}  className={`w-4 h-4 transition-all duration-300 ${isSidebarOpened ? "rotate-180":"rotate-0"} `}/>
                                    <User
                                userProps={{
                                        name:{userProfile:user,styles:'text-black'},
                                        indicator:{styles:'h-2 w-2 absolute bottom-2 right-0 rounded-full bg-green-300',isIndicator:false},
                                        image:{profileImage:user.role === 'designer'?user?.profile_pic:user?.profilePic,fullname:false,styles:'w-[50px] h-[50px]'},
                                        container:' flex items-center gap-1 flex-row-reverse font-lato'
                                }}/>

                            </div>
                            </div>
                                }
                           </>
                           
                           )
                        }
                    </div>

                  {
                    isRepresentative && <div className="flex">
                                        
                                        <button onClick={handleRepresentativeLogout} className="text-primary text-lg font-lato">Logout</button>
                                    </div>
                  }
           
                </div>
           
        </header>
    )
}

export default Header

