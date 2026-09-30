import { useGlobalStore } from '@/store/global/useGlobal'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminLink = ({link}) => {
    const [isChildrenOpened,setIsChildrenOpened] = useState(false)
    const {pathname} = useLocation()
    const {setIsAdminOpened} = useGlobalStore()

    const path = pathname.split(window.location.origin)
    const locate = pathname.split('/')[2]
    
  return (
    <li onClick={()=>setIsAdminOpened(false)} className={` text-lg  ${isChildrenOpened ? "items-start":""}  border-b-[1px] border-b-gray-400  mb-4 pb-3 px-4 capitalize text-left`}>
        <div className='flex justify-between'>
            <Link to={`/admin/${link.name}`} className={`block ${locate == link.name &&'text-primary'}`}>{link.name}</Link>
        {
            link.links&&<ChevronRight className={`${isChildrenOpened ? 'rotate-90':'rotate-0'} "bg-sidebar  "`} onClick={()=>setIsChildrenOpened(!isChildrenOpened)}/>
        }
        </div>
        {
            isChildrenOpened && <ul>
            {
                link.links.map(item=>{
                    return(
                        <Link
                        
                         to={`/admin/${link.name}/${item}`}  className={`ml-5 mt-2 block text-lightGray
                             ${(path ==  `/admin/${link.name}/${item}`|| 
                                path ==  `/admin/${link.name}/${item.split(' & ')[0]+'%20&%20'+item.split(' & ')[1]}`||
                                path ==  `/admin/${link.name}/${item.split(' ')[0]+'%20'+item.split(' ')[1]}`
                            ) &&'text-primary'}`}>{item}</Link>

                    )
                })
            }
        </ul>
        }
      </li>
  )
}

export default AdminLink