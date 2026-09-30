import {NavLink } from 'react-router-dom'
import Image from './Image'
import React, { memo } from 'react'
import { Bell } from 'lucide-react'

const SidebarLinks = ({links,role})=>{
    const isClient = role === 'client'
    return(
        <>
         {
                links.map(link=>{
                    return(
                        <li key={link.id}  className='flex items-center gap-3.5 text-md md:text-lg pl-1 md:border-b border-lgray py-3 '>
                            {
                                link.icon ? <Image src={link.icon} className="w-6 h-6" />:
                                <Bell className='text-gray-300'/>
                            }
                            {
                                link.route == '/notifications'? <NavLink  to={link.route} className={({isActive})=>`${isActive && 'text-primary'}`} >{link.name}</NavLink>
                            :
                            <NavLink  to={`/${isClient?'client':'creator'}${link.route}`} className={({isActive})=>`${isActive && 'text-primary'}`} >{link.name}</NavLink>
                            }
                        </li>
                    )
                })
            }
        </>
    )
}

export default memo(SidebarLinks)