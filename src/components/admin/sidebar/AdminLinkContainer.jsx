import { adminLinks } from '@/static/adminData'
import React from 'react'
import AdminLink from './AdminLink'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/useAuth'
import { useGlobalStore } from '@/store/global/useGlobal'
import { toast } from 'sonner'
import { X } from 'lucide-react'

const AdminLinkContainer = () => {
      const {pathname} = useLocation()
      const {user,logout} = useAuth();
      const {setIsAdminOpened} = useGlobalStore()
      const navigate = useNavigate()

      const currentPage = (page)=>{
      const isCurrentPage = pathname.endsWith(page)
      return isCurrentPage

      }

          const handleLogout = async()=>{
   try {
     const result = await logout();
      toast(result?.message, {
                action: {
                label: <X size={16} />,
              },
            })
      setIsAdminOpened(false)
    navigate('/admin/login')

   } catch (error) {
     toast(error?.response?.message||error?.message||'something went wrong, try again', {
                action: {
                label: <X size={16} />,
              },
            })
   }
     

}
      
      const isSuperAdmin = user?.role === 'superadmin'
      
  return (
    <ul className='mt-5 pb-16'>
        {
            adminLinks.map(link=>{
                return(
                    <AdminLink key={link.id} link={link} />
                )
            })
        }
        <li className='pb-5 border-b-[1px] border-b-gray-400' onClick={()=>setIsAdminOpened(false)}>
          <Link to={'/admin/creators/awaitingApproval'} className={`text-lg  pl-4  ${currentPage('awaitingApproval') ?'text-primary':'text-lightGray '}`}>Awaiting Approval</Link>
        </li>
          {
            isSuperAdmin && 
           <div>
             <li className='py-5 text-lg border-b-[1px] border-b-gray-400' onClick={()=>setIsAdminOpened(false)}>
          <Link to={'/admin/signUp'} className={`text-lg  pl-4  ${currentPage('signUp') ?'text-primary':'text-lightGray '}`}>Register Admin</Link>
        </li>
             <li className='py-5 text-lg border-b-[1px] border-b-gray-400' onClick={()=>setIsAdminOpened(false)}>
          <Link to={'/admin/superAdmin'} className={`text-lg  pl-4  ${currentPage('superAdmin') ?'text-primary':'text-lightGray '}`}>Staff Activities</Link>
        </li>
             <li className='py-5 text-lg border-b-[1px] border-b-gray-400' onClick={()=>setIsAdminOpened(false)}>
          <Link to={'/admin/superAdmin/mailNotification'} className={`text-lg  pl-4  ${currentPage('mailNotification') ?'text-primary':'text-lightGray '}`}>Mail Notifications</Link>
        </li>
           </div>
          }

           <li className=' border-b-[1px] lg:hidden py-5 border-b-gray-400' onClick={()=>setIsAdminOpened(false)}>
          <Link to={'/trending'} className={`text-lg  pl-4  ${currentPage('trending') ?'text-primary':'text-lightGray '}`}>Trending</Link>
        </li>
      <li className='pl-4 border-b-[1px] lg:hidden py-5 border-b-gray-400' onClick={handleLogout}>
          Logout
        </li>
    </ul>
  )
}

export default AdminLinkContainer