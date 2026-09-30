import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useGlobalStore } from '@/store/global/useGlobal'
import { useAuth } from '@/store/useAuth'

const SidebarContainer = () => {
  const {setIsSidebarOpened,isSidebarOpened} = useGlobalStore(state=>state)
  const [overflow,setOverflow] = useState(true)
  const {user} = useAuth();
  const isAdmin = user?.role === 'admin'||user?.role === 'superadmin';

  const handleSideBar = (e)=>{
    const element = e.target.tagName.toLowerCase()
    if(element.includes('a','aside')){
      setIsSidebarOpened()
    }
  }
         const handleMouseIn =()=>{
              setOverflow(true)
          }
          const handleMouseOut =()=>{
              setOverflow(false)
          }
        
  return (
    <aside 
    className={` ${overflow ? 'overflow-y-auto':'overflow-y-hidden'} py-6 cursor-pointer backdrop-blur-[0.2rem] bg-white/20 z-[999]  fixed top-[80px]  overflow-hidden md:top-[96px] transition-all duration-300 bottom-0 w-0 right-0  ${isSidebarOpened ? "  w-[100%]":"w-0" } `}
    onClick={handleSideBar} onMouseLeave={handleMouseOut} onMouseEnter={handleMouseIn}>
        {
          !isAdmin&&<Sidebar/>
        }
    </aside>
  )
}

export default SidebarContainer