import React from "react";
import { Outlet } from "react-router-dom";


const AdminCreatorLayout =()=>{
    return(
        <>  
          <section  className="px-5 py-10">
            <Outlet/>
          </section>

        </>
    )
}
export default AdminCreatorLayout