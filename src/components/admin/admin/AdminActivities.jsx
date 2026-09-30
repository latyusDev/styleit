
import React from 'react'
import StaffActivityIcon from '../superAdmin/staff/StaffActivityIcon'
import AdminPeriodActivities from './AdminPeriodActivities'
import { Skeleton } from '@/components/ui/skeleton'
import ErrorMessage from '@/components/global/ErrorMessage'

const AdminActivities = ({adminActivities,period,isLoading,error}) => {
  return (
     <div className=''>
          {
            isLoading ? <Skeleton className='w-full h-[400]'/>:
            <div>
              {
                error.isError ?<ErrorMessage error={error.error} />: <div className='pl-4'>
                   <AdminPeriodActivities period={period}/>
                <div className=' flex flex-col sm:flex-row  gap-6 flex-wrap'>
                {
                    adminActivities?.map(activity=>{
                        return (
                            <div key={activity.id} className={` basis-[30%] lg:basis-[40%] xl:basis-[30%]  cursor-pointer
                                 ${activity.activityName == 'suspended users'&&'bg-black '} ${activity.activityName == 'banned users'&&'bg-red-600 '}
                               ${activity.activityName == 'active times'&&'bg-green-600 '} ${activity.activityName == 'reset password'&&'bg-blue-600 '}  pt-12f p-6 rounded-lg`}>
                    <div className=' justify-between text-white capitalize  text-lg'>
                        <div className='flex justify-between '>
                            <p className='text-sm md:text-lg'> {activity.activityName}</p> 
                            <p className='text-sm md:text-lg'>{activity.activity}</p>                  
                        </div>
                      
                      <StaffActivityIcon activity={activity}/>
                    </div>  
                </div>
                        )
                    })
                }
            </div>
                </div>
              }
            </div>
          }
          
            </div>

  )
}

export default AdminActivities;
