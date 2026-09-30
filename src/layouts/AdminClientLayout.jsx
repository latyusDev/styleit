import React from "react";
import { Outlet } from "react-router-dom";


const AdminClientLayout =()=>{

    return(
        <>  
          <section  className="px-5 py-10">
            <Outlet/>
          </section>

        </>
    )
}
export default AdminClientLayout