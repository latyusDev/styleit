import Image from '@/components/global/Image'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userPicture from '@/images/profile_i.png'
import { creators  } from '@/static/adminData'


const UserLists = () => {
 
  return (
    <div className='font-lato  w-full '>
        <ul className=' hidden border-b-2 border-b-sidebar  pb-4  md:flex flex-row justify-between capitalize w-full font-[700] p-3 '>
            <li className='basis-[15%]'>name</li>
            <li className='basis-[15%]'>email</li>
            <li className='basis-[15%]'>role</li>
            <li className='basis-[15%]'>status</li>
            <li className='basis-[15%]'>gender</li>
            <li className='basis-[15%]'>created at</li>
        </ul>
        <ul>
            {
                creators.map(creator=>{
                    return(
                        <li className="relative" data-role="creators">
                            <div className={`flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center  border-b-2 shaddow-md capitalize p-5 rounded-md relative`}>
                              
                                <div className='flex items-end md:items-center justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>name:</p>
                                <div className='flex items-center gap-3 '>
                                <Image src={userPicture} className="w-[50px] h-[50px] rounded-full"/>
                               <p data-testid={`name-${creator.id}`}  >{creator.name}</p>
                               </div>
                                </div>
                                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>email:</p>
                                <p data-testid={`email-${creator.id}`} >{creator.email}</p>
                                </div>
                                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>role:</p>
                                <p data-testid={`role-${creator.id}`} className='basis-[15%]'>{creator.role}</p>
                                </div>
                                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>status:</p>
                                <p data-testid={`status-${creator.id}`} className={`basis-[15%] 
                                    ${creator.status=='approved'&&' md:border-y-0  text-green-500'} 
                                    ${creator.status=='banned'&&' md:border-y-0  text-red-500'} 
                                    ${creator.status=='suspended'&&' md:border-y-0  text-black'} `}>{creator.status}</p>
                                </div>
                                 <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>role:</p>
                                <p data-testid={`gender-${creator.id}`} className='basis-[15%] indent-3'>{creator.gender}</p>
                                </div>
                                 <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>created at:</p>
                                <p data-testid={`gender-${creator.id}`} className='basis-[15%] indent-3'>May 22nd,2025</p>
                                </div>
                               
                             
                            </div>

                       
                           
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default UserLists