import Image from '@/components/global/Image'
import { SortAsc } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader'
import { useAdminClientStore } from '@/store/admin/clientStore/useAdminClient'
import glass from '@/images/search-normal.png';
import Paginator from '@/components/global/Paginator'
import ErrorMessage from '@/components/global/ErrorMessage'
import Client from './Client'
import ClientHeader from './ClientHeader'


const PAGES_TO_SHOW = 3;
const Clients = () => {
    const [id, setId] = useState(null)
    const [page, setPage] = useState(1)
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('latest') // Track current sort order;
    const [sortOptions, setSortOptions] = useState(false)
    
    const { getClients,searchClients } = useAdminClientStore()

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(debouncedSearch.trim())
            if (!debouncedSearch) {
                setPage(1) // Reset to first page when search changes
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [debouncedSearch])

    const handleOptions = (creatorId) => {
        setId(id === creatorId ? null : creatorId)
    }
     const handleSortSelect = (order) => {
        setSortOrder(order)
        setSortOptions(false)
    }

        const getSortedClients = (clients) => {
        if (!clients || clients.length === 0) return []
        
        const sorted = [...clients].sort((a, b) => {
            const itemA =  a.id
            const  itemB =  b.id
            
            if (sortOrder === 'oldest') {
                return itemA -  itemB // Ascending order
            } else {
                return  itemB - itemA // Descending order (latest)
            }
        })
        
        return sorted
    }

    // Single unified query for both search and regular fetch
    const { data, isLoading, error,isError } = useQuery({
        queryKey: ['admin-clients', page, debouncedSearch],
        queryFn: () => {
            if (debouncedSearch) {
                return searchClients(debouncedSearch,page)
            }
            return getClients(page)
        },
        keepPreviousData: true, // Smooth transitions between pages
        staleTime: 30000, // Consider data fresh for 30 seconds
    })


    const clients = data?.customers || data?.results|| []
    const sortedClients = getSortedClients(clients)


    return (
        <div className='font-lato w-full'>
          <div className="md:px-4 md:flex justify-between mb-8"> 
            <div className="relative flex-[0.7]">
                <input 
                    type="text"
                    onChange={(e) => setDebouncedSearch(e.target.value)}
                    className='pl-10 w-full border placeholder-gray-400 border-gray-500 outline-none rounded-lg h-12'
                    placeholder="Search clients..."
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
                               
            {/* Header */}
         <ClientHeader/>
       
            {/* Clients List */}
            <ul>
                {
                    isLoading ?
                    // loading state
                    <AdminUserLoader/> : (
                        <div>
                            {
                                isError ? <ErrorMessage error={error}/>//error message
                                :
                                sortedClients.length === 0 ? (//empty clients
                            <div className='text-center py-10'>
                                <p className='text-gray-500'>
                                    {debouncedSearch ? 'No clients found matching your search' : 'No clients available'}
                                </p>
                            </div>
                        ) : (//all clients
                            sortedClients.map(client => {
                                const statusColors = {
                                    actived: 'border-green-500 text-green-500',
                                    deactived: 'border-red-500 text-red-500',
                                    ban: 'border-red-500 text-red-500',
                                    suspended: 'border-black text-black'
                                }

                                const borderClass = client.status in statusColors 
                                    ? `border-r-[3px] md:border-r-0 md:border-x-[3px] ${statusColors[client.status].split(' ')[0]}`
                                    : ''

                                const textColorClass = statusColors[client.status]?.split(' ')[1] || ''

                                return (
                                   <Client key={client.id}  client={client} borderClass={borderClass}
                                   handleOptions={handleOptions} textColorClass={textColorClass} id={id} />
                                )
                            })
                        )
                                    }
                                </div>
                            )
                            
                        
                }
            </ul>

            {/* Pagination */}
            {clients?.length > 0 && (
                <Paginator
                    data={data}
                    page={page}
                    setPage={setPage}
                    PAGES_TO_SHOW={PAGES_TO_SHOW}
                />
            )}
        </div>
    )
}

export default Clients


