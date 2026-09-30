import Image from '@/components/global/Image'
import { SortAsc } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import glass from '@/images/search-normal.png';
import { useQuery } from '@tanstack/react-query'
import { useAdminCreatorStore } from '@/store/admin/creatoreStore/useAdminCreator'
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader'
import Paginator from '@/components/global/Paginator'
import ErrorMessage from '@/components/global/ErrorMessage'
import Creator from './Creator'
import CreatorCard from './CreatorCard'
import CreatorHeader from './CreatorHeader'

const PAGES_TO_SHOW = 3
const Creators = () => {
    const [id,setId] = useState(null)
    const [page,setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [sortOptions, setSortOptions] = useState(false)
    const [sortOrder, setSortOrder] = useState('latest') // Track current sort order
    const {getCreators,searchCreators} = useAdminCreatorStore()
      
    const handleOptions = (creatorId)=>{
        if(id === creatorId){
            setId(null)
        }else{
            setId(creatorId)
        }
    }

    const handleSortSelect = (order) => {
        setSortOrder(order)
        setSortOptions(false)
    }

    // Sort designers based on selected order
    const getSortedDesigners = (designers) => {
        if (!designers || designers.length === 0) return []
        
        const sorted = [...designers].sort((a, b) => {
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

    // Debounce search input and reset to page 1
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(debouncedSearch)
            if (!debouncedSearch) {
                setPage(1) // Reset to first page when search changes
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [debouncedSearch])

    
    // Single unified query for both search and regular fetch
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['admin-creators', page, debouncedSearch],
        queryFn: () => {
            if (debouncedSearch) {
                return searchCreators(page, debouncedSearch)
            }
            return getCreators(page)
        },
        keepPreviousData: true, // Smooth transitions between pages
        staleTime: 30000, // Consider data fresh for 30 seconds
    });
    
    const designers = data?.designers || data?.results;
    const sortedDesigners = getSortedDesigners(designers);


 return (
    <div className='font-lato w-full'>
        {/* Search and Filter */}
        <div className="md:px-4 md:flex justify-between mb-8"> 
            <div className="relative flex-[0.7]">
                <input 
                    type="text"
                    onChange={(e) => setDebouncedSearch(e.target.value)}
                    className='pl-10 w-full border placeholder-gray-400 border-gray-500 outline-none rounded-lg h-12'
                    placeholder="Search creators..."
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

        {/* Loading State */}
        {isLoading? (
            <AdminUserLoader/>
        ) : (
            <>
            {/* Error State */}
                {isError ? (
                    <ErrorMessage error={error}/>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block ">
                            {/* Table Header */}
                            <div className="mb-4">
                                <CreatorHeader/>
                            </div>

                            {/* Table Body */}
                            <div className="space-y-4 pb-4">
                                {sortedDesigners.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
                                        No creators found
                                    </div>
                                ) : (
                                    sortedDesigners.map(creator => (
                                      <Creator key={creator.id} creator={creator} 
                                      handleOptions={handleOptions} id={id}/>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {sortedDesigners.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    No creators found
                                </div>
                            ) : (
                                sortedDesigners.map(creator => (
                                   <CreatorCard creator={creator} 
                                   handleOptions={handleOptions} id={id}/>
                                ))
                            )}
                        </div>
                    </>
                )}
            </>
        )}
    
        {/* Pagination */}
        
        <Paginator
            data={data}
            page={page} 
            setPage={setPage} 
            PAGES_TO_SHOW={PAGES_TO_SHOW} 
        />
    </div>
)
}

export default Creators