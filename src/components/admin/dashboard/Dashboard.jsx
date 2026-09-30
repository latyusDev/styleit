import React, { useState } from 'react'
import DashboardTabs from './DashboardTabs'
import CurrentDashboardTab from './CurrentDashboardTab'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import axios from 'axios'
import ErrorMessage from '@/components/global/ErrorMessage'
import { Skeleton } from '@/components/ui/skeleton'
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader'

const Dashboard = () => {
    const [currentTab,setCurrentTab] = useState(0);

    const getDashboardData = async()=> {
        const response = await axios.get('admin/dashboard/',{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    }

     const {data,isLoading,error,isError} = useQuery({
            queryKey:['dashboardData'],
            queryFn:getDashboardData,
            staleTime: 1000 * 60 ,
            refetchOnWindowFocus:false
            })
    
  return (
    <div>
                      
       {
        isLoading ?<div>
          <div className='flex flex-col md:flex-row gap-5 flex-wrap '>

            {
              Array.from({length:9}).map((_,index)=>(
                 <Skeleton key={index} className={`shadow-md rounded-md grow-1 py-16 px-7 md:basis-[30%]  xl:basis-[23%]  bg-gradient-to-tr from-primary to-sidebar`} />
              ))
            }
        </div>
        <div className='mt-9'>
            <AdminUserLoader/>
        </div>
        </div> : isError?<ErrorMessage error={error}/>: 
        <div>

            <DashboardTabs 
            currentTab={currentTab} data={data}
            setCurrentTab={setCurrentTab}/>
            <div className='mt-12'>
                <CurrentDashboardTab currentTab={currentTab} data={data}/>
            </div>
        </div>
        }

    </div>
  )
}

export default Dashboard