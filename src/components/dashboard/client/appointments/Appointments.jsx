import React, { useState } from 'react'
import AppointmentCard from './AppointmentCard'
import { useQuery,  } from '@tanstack/react-query'
import PostListLoader from '@/components/global/loaders/PostListLoader'
import { Link } from 'react-router-dom'
import ErrorMessage from '@/components/global/ErrorMessage'
import { getAppointments } from '@/api/appointment'
import Paginator from '@/components/global/Paginator'

const PAGES_TO_SHOW = 3
const Appointments = () => {

  const [page,setPage] = useState(1);
  const {data,isLoading,error,isError} = useQuery({
        queryKey:['appointment',page],
        queryFn:()=>getAppointments(page),
        staleTime:1
  })

  return (
    <section className='container  px-4 xl:px-0'>
       <h1 className='text-center text-xl font-[700] capitalize my-9'>appointment details</h1>
       {
        isLoading?<PostListLoader/>: <div>
        {
          isError ?<ErrorMessage error={error} />:
            <div>
              {
              data?.appointments.length === 0 ?<div className='text-center border border-gray-200 py-16 rounded-md'>
                                                  <h1 className='text-2xl text-gray-600'> You currently have no appointment</h1>
                                                  <p className='text-gray-500 mt-3 text-md'> get started by   <Link to='/client/bookAppointment' className='text-primary'>booking an appointment</Link>  with a designer</p>
                                              </div>:
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3  '>
            {
              data?.appointments.map(appointment=>{
                return (
                    <AppointmentCard key={appointment.id}  appointment={appointment}   />
                )
            })
            }
        </div>
          }
            </div>
        }
        </div>
      
       }
        {
                   data?.appointments.length > 0 && <Paginator
                         data={data}
                         page={page}
                         setPage={setPage}
                         PAGES_TO_SHOW={PAGES_TO_SHOW}
                         currentPage={'appointment'}
                     />
                   }
    </section>

  )
}

export default Appointments