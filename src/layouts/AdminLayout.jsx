import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import SidebarContainer from "@/components/global/SidebarContainer";
import { roles } from "@/pages/ViewTrendingPost";
import { useGlobalStore } from "@/store/global/useGlobal";
import { useAuth } from "@/store/useAuth";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {isAdminOpened} = useGlobalStore();
  
  const { user } = useAuth();
  const isAdmin = roles.includes(user?.role);
  const isAdminLayout = location?.pathname === '/admin' || location?.pathname === '/admin/'

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate(-1);
    } else {
      const cookieUser = Cookies.get("user");
      const parsedUser = cookieUser ? JSON.parse(cookieUser) : null;

      if (parsedUser?.status === "deactived") {
        navigate("/verifyAccount");
      }
    }
    if(user && isAdminLayout){
      navigate('/admin/dashboard')
    }
  }, [user, isAdmin, navigate]);

  return (
    <main className="overflow-hidden">
      <SidebarContainer />
      <div className="flex overflow-hidden">
        <AdminSidebar />
       {
       <div className={` md:w-full overflow-x-hidden ${isAdminOpened?'w-0':'w-full'} `}>
          <Outlet />
        </div>
       }
      </div>
    </main>
  );
};

export default AdminLayout;