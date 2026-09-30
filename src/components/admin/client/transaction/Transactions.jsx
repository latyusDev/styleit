import Paginator from '@/components/global/Paginator';
import { useAdminClientStore } from '@/store/admin/clientStore/useAdminClient';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Transaction from './Transaction';
import AdminUserLoader from '@/components/global/loaders/AdminUserLoader';
import ErrorMessage from '@/components/global/ErrorMessage';
import TransactionHeader from './TransactionHeader';

const PAGES_TO_SHOW = 3
const Transactions = () => {
    const {getClientTransactions} = useAdminClientStore();
    const [page,setPage] = useState(1)

    const {data,isLoading,isError,error} = useQuery({
        queryKey:['client-transactions',page],
        queryFn:()=>getClientTransactions(page),
        staleTime: 1000 * 60 * 3,
        });

        const transactionCount =  data?.transaction_payments?.length

  return (
    <div>

         {/* Header */}
         <TransactionHeader/>
       
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
                                transactionCount === 0 ? (//empty transaction
                            <div className='text-center py-10'>
                                <p className='text-gray-500'>
                                    No transaction is available
                                </p>
                            </div>
                        ) : (//all transaction
                           data?.transaction_payments.map(transaction => {
                                const statusColors = {
                                    success: 'border-green-500 text-green-500',
                                    paid: 'border-blue-500 text-blue-500',
                                    pending: 'border-yellow-500 text-yellow-500',
                                    declined: 'border-red-500 text-red-500',
                                }

                                const borderClass = transaction.status in statusColors 
                                    ? `border-r-[3px] md:border-r-0 md:border-x-[3px] ${statusColors[transaction.status].split(' ')[0]}`
                                    : ''

                                const textColorClass = statusColors[transaction.status]?.split(' ')[1] || ''

                                return (
                                   <Transaction key={transaction.payment_id}  transaction={transaction} textColorClass={textColorClass} borderClass={borderClass}  />
                                )
                            })
                        )
                                    }
                                </div>
                            )
                            
                        
                }
            </ul>

            {/* Pagination */}
            {transactionCount > 0 && (
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

export default Transactions