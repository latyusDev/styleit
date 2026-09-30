import Avatar from '@/components/global/Avatar'
import React, { useState } from 'react'

const Admins = ({adminItem, currentAdmin,setCurrentAdmin,superAdmin=true}) => {
    const [open,setOpen] = useState(true)
    const handleMouse = position =>{
        if(position === 'enter'){
            setOpen(true)
        }else{
            setOpen(false)
        }
    }

    
  return (
        <ul className=' shadow-md md:shadow-none p-5 rounded-md mt-3'
                 onMouseLeave={()=>handleMouse('leave')} onMouseEnter={()=>handleMouse('enter')}
        >
            {
                adminItem.map((admin,index)=>{
                    return (
                            <li key={index} data-id={`admin-item-${index}`}
                             className={`flex items-center gap-4 mb-7 md:mb-4 md:hover:bg-sidebar md:hover:text-lightGray cursor-pointer
                 p-3 rounded-md md: shadow-md ${index===currentAdmin&&'bg-sidebar text-lightGray' }`}
                onClick={()=>setCurrentAdmin(index)}>
                    <Avatar data={{complaint:{name:admin?.admin?.admin_firstname+' '+admin?.admin?.admin_lastname},section:3}} />
                    {
                        superAdmin ? <p className={`capitalize text-sm md:text-md font-[700] ${open ? 'block':'hidden'} sm:block`} 
                        >{admin?.admin?.admin_firstname+' '+admin?.admin?.admin_lastname}</p>:
                        <p className='capitalize text-sm md:text-md font-[700]'>{admin?.admin?.admin_firstname+' '+admin?.admin?.admin_lastname}</p>
                    }
                </li>
                    )
                })
            }
        </ul>
  )
}

export default Admins