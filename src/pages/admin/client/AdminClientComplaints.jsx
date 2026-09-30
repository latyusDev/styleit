import React, {useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ErrorMessage from '@/components/global/ErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { useAdminStore } from '@/store/admin/useAdmin';
import Paginator from '@/components/global/Paginator';

const PAGES_TO_SHOW = 3;

const AdminClientComplaints = () => {
  const [page,setPage] = useState(1)
  const {getReports} = useAdminStore()

     const { data, isLoading, error,isError } = useQuery({
        queryKey: ['admin-reports', page],
        queryFn:()=>getReports(page),
        refetchOnWindowFocus:false,
        staleTime: 60*5*1000, // Consider data fresh for 5 mins
    })
    


  return (
    <section   className='w-full font-lato' data-testid="admin-client-complaints">
      <h1 className='text-3xl text-center font-semibold font-lato'>All Reports </h1>
         <div className="max-w-[1000px] mx-auto ">
         <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
        {
         isLoading ?<Skeleton className='w-full h-[400px]' />:
        <>
            {
              isError?<ErrorMessage error={error}/>:
               <div>
            {
                 data?.reports.map((report,index)=>(
                <div key={index}>
                    <AccordionItem value={`item-${index}`} className='border-none shadow-md border mb-3 rounded-sm py-2.5 px-7'>
                    <AccordionTrigger className='text-primary text-lg font-lato'>{report.main_reporter}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                    

                    <div className=' border p-5 rounded-md '>
                       {
                          report.client_report_id === null&& 
                          <div>
                              <div className='flex justify-between '>
                                <p>User : </p>
                                <p>Client</p>
                              </div>
                              <div className='flex justify-between mt-3 '>
                                <p>Full name : </p>
                                <p>{report.creator_firstname} {report.lastname}</p>
                              </div>
                              <div className='flex justify-between mt-3'>
                                <p>Email : </p>
                                <p>{report.creator_email}</p>
                            </div>
                              <div className='flex justify-between mt-3'>
                                <p>Business name : </p>
                                <p>{report.creator_businessName}</p>
                            </div>
                              <div className='flex justify-between mt-3'>
                                <p>report date : </p>
                                <p>{report.report_Date}</p>
                            </div>
                            
                          </div>
                       }
                       {
                          report.creator_report_id === null&& 
                          <div>
                              <div className='flex justify-between '>
                                <p>User : </p>
                                <p>Creator</p>
                              </div>
                              <div className='flex justify-between mt-3 '>
                                <p>Full name : </p>
                                <p>{report.client_firstname} {report.client_lastname}</p>
                              </div>
                              <div className='flex justify-between mt-3'>
                                <p>Email : </p>
                                <p>{report.client_email}</p>
                            </div>
                              <div className='flex justify-between mt-3'>
                                <p>report date : </p>
                                <p>{report.report_Date}</p>
                            </div>
                            
                          </div>
                       }
                      <div>
                          <h3 className='text-center mt-3 text-md'>Report</h3>
                           <p className="text-md md:text-[1rem]">
                      {report?.reason}
                    </p>
                      </div>
                    </div>
                  
                    </AccordionContent>
            </AccordionItem>
                </div>
            ))
            }
         </div>
            }
        </>
        }   
    </Accordion>

     {data?.reports?.length > 0 && (
            <Paginator
                data={data}
                page={page}
                setPage={setPage}
                PAGES_TO_SHOW={PAGES_TO_SHOW}
            />
        )}
    </div>

    </section>
  )
}

export default AdminClientComplaints