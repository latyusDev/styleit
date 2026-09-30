import React, { useMemo, useCallback, memo } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import AnimatedButton from './AnimatedButton';

const Paginator = ({ data, page, setPage, PAGES_TO_SHOW,currentPage = null }) => {

    let totalPages;

    switch(currentPage){
        case 'booking':
        case 'appointment':
                totalPages = useMemo(() => 
                data?.appoint_total_pages
            , [data])
        break
        case 'post':
                totalPages = useMemo(() => 
                data?.post_total_pages
            , [data])
        break
        case 'like':
                totalPages = useMemo(() => 
                data?.like_total_pages
            , [data])
        break
        default:
                totalPages = useMemo(() => 
                data?.pagination?.total_pages || data?.pagination?.pages || data?.total ||  data?.pages || data?.total_pages
                , [data])
    }


    const visiblePages = useMemo(() => {
        if (totalPages <= PAGES_TO_SHOW) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        const currentGroup = Math.floor((page - 1) / PAGES_TO_SHOW)
        const startPage = currentGroup * PAGES_TO_SHOW + 1
        const endPage = Math.min(startPage + PAGES_TO_SHOW - 1, totalPages)
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    }, [page, totalPages, PAGES_TO_SHOW])

    const hasNextGroup = useMemo(() => page + PAGES_TO_SHOW <= totalPages, [page, PAGES_TO_SHOW, totalPages])
    const hasPrevGroup = useMemo(() => page > PAGES_TO_SHOW, [page, PAGES_TO_SHOW])

    const handlePageChange = useCallback((newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }, [totalPages, setPage])

    return (
        <div>
            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem className='hidden md:block'>

                               <AnimatedButton stiffness={150}>

                                <PaginationPrevious
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page - 1) }}
                                    className={`bg-primary text-white ${page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                />
                                </AnimatedButton>
                            </PaginationItem>

                            {hasPrevGroup && (
                                <>
                                    <PaginationItem>
                                        <PaginationLink onClick={(e) => { e.preventDefault(); handlePageChange(1) }}>
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                </>
                            )}

                            {visiblePages.map(_page => (
                                <PaginationItem key={_page}>
                                    <AnimatedButton>
                                    <PaginationLink
                                        onClick={(e) => { e.preventDefault(); handlePageChange(_page) }}
                                        isActive={page === _page}
                                        className="cursor-pointer text-primary"
                                    >
                                        {_page}
                                    </PaginationLink>
                                    </AnimatedButton>

                                </PaginationItem>
                            ))}

                            {hasNextGroup && (
                                <>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <AnimatedButton>
                                            <PaginationLink onClick={(e) => { e.preventDefault(); handlePageChange(totalPages) }}>
                                            {totalPages}
                                        </PaginationLink>
                                        </AnimatedButton>
                                    </PaginationItem>
                                </>
                            )}

                            <PaginationItem className='hidden md:block'>
                               <AnimatedButton stiffness={150}>
                                <PaginationNext
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page + 1) }}
                                    className={`bg-primary text-white ${page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                />
                                </AnimatedButton>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                    <Pagination className='mt-4'>
                        <PaginationContent>
                            <PaginationItem className='md:hidden'>
                               <AnimatedButton>
                                    <PaginationPrevious
                                        onClick={(e) => { e.preventDefault(); handlePageChange(page - 1) }}
                                        className={`bg-primary text-white ${page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                    />
                                </AnimatedButton>
                            </PaginationItem>
                            <PaginationItem className='md:hidden'>
                               <AnimatedButton>
                                     <PaginationNext
                                      
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page + 1) }}
                                    className={`bg-primary text-white ${page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                />
                               </AnimatedButton>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                    {/* <p className="text-slate-600 text-center md:text-left mt-4">Page {page} of {totalPages}</p> */}
                </div>
            )}
        </div>
    )
}

export default memo(Paginator)