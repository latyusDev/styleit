import { dadmins } from '@/static/adminData'
import React, { useState } from 'react'
import userPicture from '@/images/profile_i.png'
import Image from '@/components/global/Image'
import { Eye, MoreHorizontal, Trash2, UserX } from 'lucide-react'
import { Link } from 'react-router-dom'


const Admins = ({admins}) => {
    const [id,setId] = useState(null)
    const handleOptions = (adminId)=>{
        if(id === adminId){
            setId(null)
        }else{
            setId(adminId)
        }
      }
    
  return (
     <div className='font-lato  w-full'>
        <ul className=' hidden md:flex flex-row justify-between capitalize w-full font-[700] p-3 '>
            <li className='basis-[15%]'>name</li>
            <li className='basis-[15%]'>email</li>
            <li className='basis-[15%]'>gender</li>
            <li className='basis-[15%]'>status</li>
            <li className='basis-[15%]'>actions</li>
        </ul>
        <ul>
            {
                admins.map(admin=>{
                    return(
                        <li className="relative" data-role="creators">
                            <div className={`
                             flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center mt-5 shadow-md capitalize p-5 rounded-md relative`}>
                              
                                <div className='flex items-end md:items-center justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>name:</p>
                                <div className='flex items-center gap-3 '>
                                <Image src={userPicture} className="w-[50px] h-[50px] rounded-full"/>
                               <p data-testid={`name-${admin.id}`}  >{admin.name}</p>
                               </div>
                                </div>
                                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>email:</p>
                                <p data-testid={`email-${admin.id}`} >{admin.email}</p>
                                </div>
                                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>gender:</p>
                                <p data-testid={`gender-${admin.id}`} className='basis-[15%]'>{admin.gender}</p>
                                </div>
                                <div className='flex justify-between  w-full md:w-auto md:basis-[15%]'>
                                <p className='font-[700] capitalize md:hidden'>status:</p>
                                <p data-testid={`status-${admin.id}`} className={`basis-[15%]  ${admin.status=='pending'&&' md:border-y-0  text-yellow-500'}  ${admin.status=='approved'&&' md:border-y-0  text-green-500'} ${admin.status=='banned'&&' md:border-y-0  text-red-500'} ${admin.status=='suspended'&&' md:border-y-0  text-black'} `}>{admin.status}</p>
                                </div>
                                <p className='basis-[15%]' data-testid={`actionButton-${admin.id}`} ><MoreHorizontal className='cursor-pointer'
                                 onClick={()=>handleOptions(admin.id)}/> </p>
                            </div>

                            {id === admin.id&& <div data-testid={`menu-${admin.id}`} className='shadow-lg flex gap-3  py-5 z-30 px-4 bg-white rounded-md w-[max-content] absolute top-6 right-0'>
                                <Link to={`${admin.id}/profile`}><Eye  className='text-green-500 text-lg'/></Link>
                                <Trash2 className='text-red-500 text-lg'/>
                                <UserX  className='text-red-500 text-lg'/>
                            </div> }
                           
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default Admins