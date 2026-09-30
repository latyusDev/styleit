import React, { useEffect } from "react";
import Header from "../components/global/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/global/Footer";
import SidebarContainer from "@/components/global/SidebarContainer";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/global/Navbar";
import { useGlobalStore } from "@/store/global/useGlobal";
import ScrollToTopButton from "@/components/global/ScrollButton";
import { useAuth } from "@/store/useAuth";
import AdminHeader from "@/components/global/AdminHeader";
import RepresentativeHeader from "@/components/global/RepresentativeHeader";


const Layout =()=>{
    const {pathname} = useLocation();
    const {isNavbarOpened} = useGlobalStore();
    const {user} = useAuth();
    const isAdmin =  user?.role === 'admin'||user?.role === 'superadmin'
    const isRepresentative =  user?.role == 'representative'
    
    
    useEffect(() => {
  if (typeof window === "undefined") return;
  
  // Scroll to top on route change, but safely
  try {
    window.scrollTo({ top: 0, behavior: 'auto' });
  } catch (error) {
    console.warn('Failed to scroll:', error);
    // Fallback for older browsers
    document.documentElement.scrollTop = 0;
  }
}, [pathname]);
    return(
        <>  
           {
                isAdmin? <AdminHeader/>: <>
                        {
                    isRepresentative ? <RepresentativeHeader/>:<Header/>
                } 
                </>
           }
            
            {
                isNavbarOpened&& <Navbar/>
            }
           
                <main className="">
                    <Outlet/>
                </main>
                <ScrollToTopButton/>

                {
                    pathname.split('/')[1] !== 'admin'&&<Footer/>
                }
            <SidebarContainer/>

                <Toaster 
            toastOptions={{
                className: "text-xl text-white bg-gradient-to-tr from-primary to-sidebar",
                style: {
                background: 'linear-gradient(to top right, #FF617C, #27213c)',
                color: '#fff',
                border:'none'
                },
                        descriptionClassName: "text-white",

            }}
            />
            
        </>
    )
}
export default Layout