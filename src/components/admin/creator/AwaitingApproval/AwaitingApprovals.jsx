import { useAdminStore } from '@/store/admin/useAdmin'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import AwaitingApproval from './AwaitingApproval';
import AwaitingApprovalHeader from './AwaitingApprovalHeader';
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader';
import ErrorMessage from '@/components/global/ErrorMessage';
import Image from '@/components/global/Image';
import glass from '@/images/search-normal.png';
import { SortAsc } from 'lucide-react';
import Paginator from '@/components/global/Paginator';

const PAGES_TO_SHOW = 3
const AwaitingApprovals = () => {
    const {getAwaitingAproval,searchAwaitingAprovals} = useAdminStore();
    
      const [id, setId] = useState(null)
        const [page, setPage] = useState(1)
        const [debouncedSearch, setDebouncedSearch] = useState('');
        const [sortOrder, setSortOrder] = useState('latest') // Track current sort order;
        const [sortOptions, setSortOptions] = useState(false)
        
    
        useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedSearch(debouncedSearch.trim())
                if (!debouncedSearch) {
                    setPage(1) // Reset to first page when search changes
                }
            }, 300)
    
            return () => clearTimeout(timer)
        }, [debouncedSearch])
    
         const handleSortSelect = (order) => {
            setSortOrder(order)
            setSortOptions(false)
        }
    
            const getSortedAwaitingAprovals = (awaitingApprovals) => {
            if (!awaitingApprovals || awaitingApprovals.length === 0) return []
            
            const sorted = [...awaitingApprovals].sort((a, b) => {
                const itemA =  a.tpay_id
                const  itemB =  b.tpay_id
                
                if (sortOrder === 'oldest') {
                    return itemA -  itemB // Ascending order
                } else {
                    return  itemB - itemA // Descending order (latest)
                }
            })
            
            return sorted
        }
    
        // Single unified query for both search and regular fetch
        const { data, isLoading, error,isError,isFetching} = useQuery({
            queryKey: ['admin-awaiting-pproval', page, debouncedSearch],
            queryFn: () => {
                if (debouncedSearch) {
                    return searchAwaitingAprovals(debouncedSearch,page)
                }
                return getAwaitingAproval(page)
            },
            keepPreviousData: true, // Smooth transitions between pages
            staleTime: 30000, // Consider data fresh for 30 seconds
        })
    
    
        const awaitingApprovals = data?.payment || data?.results|| []
        const sortedAwaitingApprovals = getSortedAwaitingAprovals(awaitingApprovals)
    
  return (
    <div className='font-lato  w-full'>
           <div className="md:px-4 md:flex justify-between mb-8"> 
            <div className="relative flex-[0.7]">
                <input 
                    type="text"
                    onChange={(e) => setDebouncedSearch(e.target.value)}
                    className='pl-10 w-full border placeholder-gray-400 border-gray-500 outline-none rounded-lg h-12'
                    placeholder="Search awaiting approvals..."
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
        </div>
       
       <AwaitingApprovalHeader/>

        {
              isLoading?<AdminUserLoader/>:
                <>
                {
                    isError?<ErrorMessage error={error}/>:

                   <div>

                     {
                        sortedAwaitingApprovals?.length == 0 ? <h1 className='text-center text-xl mt-4'>No user found</h1>:
                         <ul>
                    {
                        sortedAwaitingApprovals.map(awaitingApproval=>{
                                return(
                                    <AwaitingApproval key={awaitingApproval.tpay_id} 
                                    awaitingApproval={awaitingApproval} />
                                
                                )
                            })
                    }
                    </ul>
                    }
                   </div>
                   
                }
                </>
        }

         <Paginator
                data={data}
                page={page} 
                setPage={setPage} 
                PAGES_TO_SHOW={PAGES_TO_SHOW} />
    </div>
  )
}

export default AwaitingApprovals

{/*   
              <Paginator
                data={data}
                page={page} 
                setPage={setPage} 
                PAGES_TO_SHOW={PAGES_TO_SHOW} /> */}
  {/* <div className="md:px-4 md:flex justify-between mb-8"> 
                <div className="relative flex-[0.7]">
                    <input type="text"
                    onChange={(e)=>setDebouncedSearch(e.target.value)}
                    className='pl-10 w-full border placeholder-gray-400 border-gray-500 outline-none  rounded-lg h-12'/>
                    <Image src={glass} className={'absolute top-3 left-3.5  w-[20px]'} alt="" />
                </div>
                       
                <div className=" basis-[12%] relative mt-3 md:mt-0">
                    <div className="flex justify-between border border-gray-500 px-6 py-2 rounded-md cursor-pointer" 
                        onClick={()=>setSortOptions(!sortOptions)}
                    >
                        <SortAsc/>
                        <p className="text-xl">filter</p>
                    </div> 
                    {
                        sortOptions && (
                            <div className={`mt-4 md:mt-0 cursor-pointer md:absolute top-12 right-0 z-50 capitalize  bg-white shadow-md rounded-md  overflow-hidden transition-all duration-400`}>
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
                        )
                    }
                </div>
            </div> */}