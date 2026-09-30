import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "@/store/useAuth";


const RepresentativeLayout =()=>{
  const navigate = useNavigate();
   const {user} = useAuth();
  
  useEffect(() => {
    if (!user) {
      navigate("/representative/login");
    } else if (user?.role !== "representative") {
      navigate(-1);
    } else {
      // Prefer user store for status if available, fall back to cookie
      const cookieUser = Cookies.get("user");
      const parsedUser = cookieUser ? JSON.parse(cookieUser) : null;

      if (parsedUser?.status === "deactived") {
        navigate("/verifyAccount");
      }
    }
  }, [user, navigate]);

    return(
        <div>  
          <Outlet/>

        </div>
    )
}
export default RepresentativeLayout