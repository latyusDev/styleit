import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LinkTabsContainer from "@/components/global/linkTabs/LinkTabsContainer";
import Cookies from "js-cookie";
import { useAuth } from "@/store/useAuth";

const CreatorLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user?.role !== "designer") {
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


  return (
    <>
      <LinkTabsContainer />
      <Outlet />
    </>
  );
};

export default CreatorLayout;