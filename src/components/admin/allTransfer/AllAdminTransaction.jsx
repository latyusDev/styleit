import Image from '@/components/global/Image'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import AdminUserLoader from '@/components/global/loaders/AdminUserLoader'
import Paginator from '@/components/global/Paginator'
import ErrorMessage from '@/components/global/ErrorMessage'
import { useAdminStore } from '@/store/admin/useAdmin'
import AdminTransaction from './AdminTransaction'
import TransactionHeader from './TransactionHeader'

const PAGES_TO_SHOW = 3
const AllAdminTransaction = () => {
    const [id,setId] = useState(null)
    const [page,setPage] = useState(1);
    const {allTransfer} = useAdminStore();
    
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('latest') // Track current sort order;
    const [sortOptions, setSortOptions] = useState(false)

    const handleSortSelect = (order) => {
        setSortOrder(order)
        setSortOptions(false)
    }

      
    const handleAction = (bookingId)=>{
    if(id === bookingId){
            setId(null)
        }else{
            setId(bookingId)
        }
    }
    useEffect(() => {
           const timer = setTimeout(() => {
               setDebouncedSearch(debouncedSearch)
               if (!debouncedSearch) {
                   setPage(1) // Reset to first page when search changes
               }
           }, 300)
   
           return () => clearTimeout(timer)
       }, [debouncedSearch])
   
     const {data,isLoading,isError,error} = useQuery({
        queryKey:['admin-transactions',page,debouncedSearch],
        queryFn:()=>{
            // if(debouncedSearch){
            //     return searchBookings(debouncedSearch,page)
            // }
            return allTransfer(page)
        },
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus:false
        });
   
    const allTransactions = data?.transfers

    
  return (
    <div className='font-lato  w-full md: px-5 md:pr-0'>
          {/* <div className="md:px-4 md:flex justify-between mb-8"> 
                    <div className="relative flex-[0.7]">
                        <input 
                            type="text"
                            onChange={(e) => setDebouncedSearch(e.target.value)}
                            className='pl-10 w-full border placeholder-gray-400 border-gray-500 outline-none rounded-lg h-12'
                            placeholder="Search bookings..."
                        />
                        <Image src={glass} className={'absolute top-3 left-3.5 w-[20px]'} alt="" />
                    </div>
                           
                    <div className="basis-[12%] relative mt-3 md:mt-0">
                        <div 
                            className="flex justify-between border border-gray-500 px-6 py-2 rounded-md cursor-pointer" 
                            onClick={() => setSortOptions(!sortOptions)}
                        >
                            <SortAsc/>
                            <p className="text-xl">filter</p>
                        </div> 
                        {sortOptions && (
                            <div className='mt-4 md:mt-0 cursor-pointer md:absolute top-12 right-0 z-50 capitalize bg-white shadow-md rounded-md overflow-hidden'>
                                <p 
                                    className={`border-b py-4 md:py-2 pl-4 pr-12 border-gray-400 hover:bg-gray-100 ${sortOrder === 'oldest' ? 'bg-gray-200 font-bold' : ''}`}
                                    onClick={() => handleSortSelect('oldest')}
                                >
                                    oldest
                                </p>
                                <p 
                                    className={`py-4 md:py-2 pl-4 pr-12 hover:bg-gray-100 ${sortOrder === 'latest' ? 'bg-gray-200 font-bold' : ''}`}
                                    onClick={() => handleSortSelect('latest')}
                                >
                                    latest
                                </p>
                            </div>
                        )}
                    </div>
                </div> */}
       {/* Transaction Header */}
        <TransactionHeader/>
      {
        isLoading?(
            <AdminUserLoader/>
        ):(
             <div>
                {
                    isError?<ErrorMessage error={error}/>: <ul>
            {
                allTransactions.map(transaction=>{
                    return(
                       <AdminTransaction key={transaction?.transfer_id} id={id} handleAction={handleAction} transaction={transaction} />
                       
                    )

                })
            }
        </ul>
                }
             </div>
        )
      }

       <Paginator
        data={data}
        page={page} 
        setPage={setPage} 
        PAGES_TO_SHOW={PAGES_TO_SHOW} />
    </div>
  )
}

export default AllAdminTransaction
