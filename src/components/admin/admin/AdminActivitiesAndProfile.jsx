import React, { useState } from 'react'
import AdminActivities from './AdminActivities'
import { Button } from '@/components/ui/button'
import LastSeen from '../shared/LastSeen'
import AdminProfile from './AdminProfile'
import { useAdminStore } from '@/store/admin/useAdmin'
import { useQuery } from '@tanstack/react-query'

const AdminActivitiesAndProfile = () => {
    const [currentTab,setCurrentTab] = useState('profile');
    const {getAdminProfileDetails} = useAdminStore()

       const {data,isLoading,error,isError} = useQuery({
        queryKey:['admin-profile'],
        queryFn:getAdminProfileDetails,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
     })

     const handleAdminTabs =tab=>{
        setCurrentTab(tab)
    }
   const period = [
    {
        id:1,
        name:'daily',
        times:data?.day_activity
    },
    {
        id:2,
        name:'weekly',
        times:data?.week_activity
    },
    {
        id:3,
        name:'monthly',
        times:data?.month_activity
    },
    {
        id:4,
        name:'yearly',
        times:data?.year_activity
    }
]

const adminActivities = [
            {
                id:1,
                activityName:'active times',
                activity:data?.daily_active_login_time,
            },
            {
                id:2,
                activityName:'banned users',
                activity:data?.total_banned_users,
            },
            {
                id:4,
                activityName:'suspended users',
                activity:data?.total_suspended_users
            }
        ]
        

  return (
    <div className='pr-4'>
        <div className='flex flex-col-reverse items-start md:flex-row justify-between md:items-center pt-10'>
       <div className='flex  gap-4  w-[max-content] pl-4 '>
            <Button className={`px-10 py-6 shadow-none capitalize text-lg text-lightGray rounded-md bg-sidebar 
                ${currentTab === 'profile'&&'bg-primary text-white' } `} onClick={()=>handleAdminTabs('profile')}>my profile</Button>
            <Button className={`px-10 py-6 shadow-none capitalize text-lg text-lightGray rounded-md bg-sidebar 
                ${currentTab === 'activies'&&'bg-primary text-white' } `} onClick={()=>handleAdminTabs('activies')}>my activities</Button>
       </div>
        <div className='mb-4 md:mb-0 pl-4 md:pl-0'>
            <LastSeen lastSeen={data?.last_seen}/>
        </div>
        </div>
       {
         currentTab === 'profile' ? <AdminProfile isLoading={isLoading} data = {data}/> : 
         <div className='mt-7'><AdminActivities 
         error={{error,isError}} isLoading={isLoading} 
          period={period} adminActivities={adminActivities}/></div>
       }

    </div>
  )
}

export default AdminActivitiesAndProfile