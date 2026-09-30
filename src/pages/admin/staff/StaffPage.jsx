import AdminActivities from '@/components/admin/admin/AdminActivities'
import Avatar from '@/components/global/Avatar'
import { admins } from '@/static/adminData'
import React, { useState } from 'react'

const StaffPage = () => {
    const [currentAdmin,setCurrentAdmin] = useState(0)
  return (
    <section className='font-lato font-[700]'>
        <div className='flex md:hidden items-center gap-2  mb-8 w-[max-content] mx-auto pr-5'>
                    <Avatar data={{complaint:{name:admins[currentAdmin].name},section:1}}/>
                    <h1 className='capitalize'>{admins[currentAdmin].name}</h1>
                </div>
                               
        <div className='flex gap-6 items-start justify-center md:justify-normal'>
            <div className='md:flex-[0.25]'>
                <ul>
                    {
                        admins.map((admin,index)=>{
                            return (
                                 <li className={`flex items-center gap-4 mb-4 hover:bg-sidebar hover:text-lightGray cursor-pointer
                     p-3 rounded-md shadow-md ${index===currentAdmin&&'bg-sidebar text-lightGray' }`} onClick={()=>setCurrentAdmin(index)}>
                        <Avatar data={{complaint:{name:admin.name},section:3}}/>
                        <p className='capitalize text-sm md:text-md font-[700]'>{admin.name}</p>
                    </li>
                            )
                        })
                    }
                </ul>
            </div>

           <AdminActivities currentAdmin={currentAdmin}/>
        </div>
    </section>
  )
}

export default StaffPage