import React, { useEffect } from "react"
import AdminLinkContainer from "./AdminLinkContainer"
import { useGlobalStore } from "@/store/global/useGlobal"
import { useAuth } from "@/store/useAuth"

const AdminSidebar = ()=>{
    const {isAdminOpened} = useGlobalStore(state=>state)
    const {user} = useAuth()
    
   return(
       <aside className={`bg-sidebar  overflow-hidden 
        lg:w-[380px] transition-all duration-300 text-lightGray font-lato  ${isAdminOpened ? 'w-[350px]':'w-0'}  `} >
    <div className="text-center mt-16 border-b-2 border-sidebar pt-5">
        <div className="px-9 py-9  rounded-full bg-primary mt-16 text-4xl inline mx-auto">{user?.firstname?.substring(0,2)}</div>
       <div className="mt-12">
                 <p className="text-lg mt-4">{user?.firstname} {user?.lastname}</p>
        <p className="text-lg">{user?.access}</p>
       </div>
    </div>
    <AdminLinkContainer/>
</aside>
   )
}

export default AdminSidebar 