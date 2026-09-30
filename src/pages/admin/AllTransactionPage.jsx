import AllAdminTransaction from '@/components/admin/allTransfer/AllAdminTransaction'
import React from 'react'

const AllTransactionPage = () => {
  return (
    <div>
        <h1 className='mt-8 font-semibold text-3xl text-center '>All Transactions</h1>
        <AllAdminTransaction/>
    </div>
  )
}

export default AllTransactionPage