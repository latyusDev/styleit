import Image from '@/components/global/Image'
import { ChevronRight, SortAsc} from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import glass from '@/images/search-normal.png';
import userPicture from '@/images/profile_i.png'
import CreatorLastPayments from './CreatorLastPayments'
import CreatorPaymentHeader from './CreatorPaymentHeader'
import { useAdminCreatorStore } from '@/store/admin/creatoreStore/useAdminCreator'
import { useQuery } from '@tanstack/react-query'
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader'
import Paginator from '@/components/global/Paginator'
import CreatorSearchModal from '../modals/CreatorSearchModal';
import CreatorPayment from './CreatorPayment';
import ErrorMessage from '@/components/global/ErrorMessage';
 
const CreatorPayments = () => {
    const [id,setId] = useState(null)
    const [sortOptions,setSortOptions] = useState(false)
    const [page, setPage] = useState(1)
    const [sortOrder, setSortOrder] = useState('latest') // Track current sort order
    const PAGES_TO_SHOW = 3
    const {getCreatorPayments} = useAdminCreatorStore(state=>state);
    const [paymentModal,setPaymentModal] = useState(false)
    
    const handleAction = useCallback((creatorId)=>{
        
        if(id === creatorId){
            setId(null)
        }else{
            setId(creatorId)
        }
    },[id])

    const handleSortSelect = (order) => {
        setSortOrder(order)
        setSortOptions(false)
    }

    // Sort payments based on selected order
    const getSortedPayments = (payments) => {
        if (!payments) return []
        
        const sorted = [...payments].sort((a, b) => {
            const itemA =  a.payment_id
            const  itemB =  b.payment_id
            
            if (sortOrder === 'oldest') {
                return itemA -  itemB // Ascending order
            } else {
                return  itemB - itemA // Descending order (latest)
            }
        })
        
        return sorted
    }

    const {data,isLoading,error,isError} = useQuery({
        queryKey:['creator-payments',page],
        queryFn:()=>getCreatorPayments(page),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
    })

    // Get sorted payments
    const sortedPayments = data?.payments ? getSortedPayments(data.payments) : []
        
    return (
        <div className='font-lato  w-full'>
      
            <div className="md:px-4 md:flex justify-between mb-8"> 
                <div className='relative ml-3 md:ml-0 flex-[0.7]'>
                    <input placeholder="Search payments..." onClick={()=>setPaymentModal(true)} type="text" className='pl-10 w-full border placeholder-gray-400 border-gray-500 outline-none  rounded-lg h-12' />
                    <Image src={glass} className={'absolute top-3 left-3.5  w-[20px]'} alt="" />
                </div>         
                <div className=" basis-[12%] relative mt-3 md:mt-0" onClick={()=>setSortOptions(!sortOptions)} >
                    <div className="flex justify-between border border-gray-500 px-6 py-2 rounded-md" 
                    >
                        <SortAsc/>
                        <p className="text-xl cursor-pointer">filter</p>
                    </div> 
                    {
                        sortOptions && <div className={`mt-4 md:mt-0 cursor-pointer md:absolute top-12 right-0 z-50 capitalize  bg-white shadow-md rounded-md  overflow-hidden transition-all duration-400 ${true ? 'h-200px':'h-0'}`}>
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
                    }
                </div>
            </div>
            <CreatorPaymentHeader full={true}/>
            {
                isLoading ? <AdminUserLoader/> :
                <>
                    {
                        isError ? <ErrorMessage error={error}/>:
                         <ul>
                    {
                        sortedPayments.map(payment=>{

                            return(
                              <CreatorPayment handleAction={handleAction} 
                              key={payment.payment_id} payment={payment}/>
                            )
                        })
                    }
                </ul>
                    }
                </>
            }
            <Paginator 
                data={data}
                page={page} 
                setPage={setPage} 
                PAGES_TO_SHOW={PAGES_TO_SHOW} 
            />
        
            <CreatorSearchModal
                paymentModal={paymentModal}
                setPaymentModal={setPaymentModal}
            />

        </div>
    )
}

export default CreatorPayments