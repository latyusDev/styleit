import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../images/logo.png'
import m_logo from '../../images/m_logo.png'
import Image from "./Image";
import { useAuth } from "@/store/useAuth";
import { X } from "lucide-react";
import { toast } from "sonner";

const RepresentativeHeader = ()=>{
    
    const {user,logout} = useAuth()
    const navigate = useNavigate();

    const isRepresentative = user?.role === 'representative'
        const handleRepresentativeLogout = async()=>{


  try {
     const result = await logout();
      toast(result?.message, {
                action: {
                label: <X size={16} />,
              },
            })
                navigate('/representative/login')

   } catch (error) {
     toast(error?.response?.message||error?.message||'something went wrong, try again', {
                action: {
                label: <X size={16} />,
              },
            })
   }
           
    }
    return( 
        <header  className="relative z-20 shadow-[2px_0px_10px_#ccc]  py-5 px-4 md:px-0 font-[400] font-[helvetica]">
      

    <div className="flex justify-between md:hidden">
                <div >
                    <Link to={'/'}>
                        <img src={m_logo} alt="logo"  />
                    </Link>
                </div>
               <ul className="flex gap-5">
                 <li className="mt-0.5">
                    <NavLink to="representative/profile" data-testid="fashion-designer" className={({isActive})=>isActive ? ' text-primary md:relative md:after:content-[" "] md:after:w-2/3 md:after:block  md:after:mx-auto md:after:mt-0.5 md:after:h-0.5 md:rounded-lg after:bg-primary ':''}>Profile</NavLink>
                </li>
                <li className="mt-0.5">
                    <NavLink to="representative/referrals"  data-testid="trending" className={({isActive})=>isActive ? 'text-primary md:relative md:after:content-[" "] md:after:w-2/3 md:after:block  md:after:mx-auto md:after:mt-0.5 md:after:h-0.5 md:rounded-lg after:bg-primary ':''}>Referrals</NavLink>
                </li>
                <li>
                        <button onClick={handleRepresentativeLogout} className=" text-lg font-lato">Logout</button>

                </li>
               </ul>
            </div>
                <div className="md:flex md:gap-12 hidden  px-4 lg:px-0  items-center container">


                
                <ul className="flex basis-[63.6%]  font-bold lg:font-[400] md:text-sm lg:text-[1.27rem]  borgder justify-between  text-[#000000] text-[20px] items-center">
                    {
                        !isRepresentative &&  <li>
                        <NavLink to="/" className={({isActive})=>isActive ? 'relative after:content-[" "] after:w-2/3 after:block  after:mx-auto after:mt-0.5 after:h-0.5 rounded-lg after:bg-primary ':''}>Home</NavLink> 
                    </li>
                    }
                    <li>
                        <NavLink to="representative/profile" data-testid="fashion-designer" className={({isActive})=>isActive ? 'relative after:content-[" "] after:w-2/3 after:block  after:mx-auto after:mt-0.5 after:h-0.5 rounded-lg after:bg-primary ':''}>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="representative/referrals"  data-testid="trending" className={({isActive})=>isActive ? 'relative after:content-[" "] after:w-2/3 after:block  after:mx-auto after:mt-0.5 after:h-0.5 rounded-lg after:bg-primary ':''}>Referrals</NavLink>
                    </li>
                    <li>
                        
                            <img src={logo} alt="" className="w-[90px] lg:w-[115px]" />
                    </li>
                   
                    </ul>

                    <div>
                        {
                            !user ? (<div className="flex gap-7 ">
                                <Link to='/login'   data-testid="login" className="border border-primary text-center cursor-pointer  w-[110px] text-sm lg:text-[1.5rem] lg:w-[190px] font-bold lg:font-[400]   py-4 rounded-lg">Login</Link>
                                <Link to='/signUp'  data-testid="signUp"  className="text-white bg-primary text-center cursor-pointer  shadow-[0px_4px_4px_0px_#FF617C33]  w-[110px] text-sm  lg:text-[1.5rem] lg:w-[190px] font-bold lg:font-[400] py-4 rounded-[0.65rem]">Sign up</Link>
                           </div>):(
                           <>
                           
                            <div className="flex items-center gap-2 capitalize ">
                                        <p>{user?.fullname?.split(' ')[0]}</p>
                                        <Image className='size-10 rounded-full' src={user?.profilePic}/>
                                    </div>
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

export default RepresentativeHeader

