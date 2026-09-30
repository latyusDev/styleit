import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAdminClientStore } from '@/store/admin/clientStore/useAdminClient'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import PaymentNotFound from '../payment/PaymentNotFound'
import { Skeleton } from '@/components/ui/skeleton'
import { safeDate } from '@/static/data'


const CreatorSearchModal = ({paymentModal,setPaymentModal}) => {
        const [searchData,setSearchData] = useState('');
        const {searchPayment} = useAdminClientStore();

        const {data,isLoading,error,isError} = useQuery({
            queryKey:['search-payment',searchData],
            queryFn:()=>searchPayment(searchData),
            refetchOnWindowFocus: false,
            staleTime: 2 * 60 * 1000, // 2 minutes 
            enabled: !!searchData // Only run query if searchData exists
        })

        
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'paid': return 'bg-green-100 text-green-800 border-green-300';
      case 'failed': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'paid': return <CheckCircle className="w-5 h-5" />;
      case 'declined': return <XCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(safeDate(dateString));
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
    const payment = data?.payment;

  return (
    <div className='md:px-5'>
        
          <Dialog open={paymentModal} onOpenChange={setPaymentModal} className={'relative z-50 p-5'}>
                  <DialogContent className={'sm:max-w-[1200px] bg-white p-5 mx-auto gap-0 h-[550px] overflow-y-auto'}>

                    <div className="flex-1 w-full mt-8 md:mt-0 md:w-[700px]  mx-auto relative">
                      <Search className='absolute top-7 left-3  transform -translate-y-1/2 h-5 w-5 text-gray-400'/>
                      <Input
                      onChange={(e)=>setSearchData(e.target.value)}
                      defaultValue={searchData}
                      className='pl-10 py-6 border-gray-200 w-full  bg-gray-50 focus-visible:ring-[#FF617C]'
                      placeholder='Search by payment reference number'  />
                  </div>
                    {
                     isLoading?<Skeleton className={'w-full h-60 bg-gradient-to-tr from-primary to-sidebar '}/>:
                          isError ? <h1 className='text-center  text-xl py-20 shadow-md rounded-lg'>
                            error while fetching payment details
                          </h1>:
                               <div className="min-h-screen bg-gradient-to-br p-6  flex items-center justify-center">
      <div className="max-w-2xl w-full">
      {
        payment === undefined&&searchData ?    <PaymentNotFound searchData={PaymentNotFound}/>:
       <div>
            {
              searchData?  <div className="mt-24 mb-5 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Main Card */}
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF617C] to-[#d88896] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Payment Details</h1>
                  <p className="text-indigo-100 text-sm">Transaction {payment?.payment_transNo}</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${getStatusColor(payment?.payment_status)}`}>
                {getStatusIcon(payment?.payment_status)}
                <span className="font-semibold capitalize">{payment?.payment_status}</span>
              </div>
            </div>
          </div>

          {/* Amount Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Payment Amount</p>
              <p className="text-5xl font-bold text-gray-900">₦{payment?.payment_amount}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 font-medium">Payment ID</p>
                <p className="text-lg font-semibold text-gray-900">{payment?.payment_id}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500 font-medium">Transaction Number</p>
                <p className="text-lg font-semibold text-gray-900">{payment?.payment_transNo}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500 font-medium">Destination ID</p>
                <p className="text-lg font-semibold text-gray-900">{payment?.payment_desiid}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500 font-medium">Subscription ID</p>
                <p className="text-lg font-semibold text-gray-900">{payment?.payment_subid}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-1">
              <p className="text-sm text-gray-500 font-medium">Transaction Date</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(payment?.payment_transdate)}</p>
            </div>

            <div className="pt-2 space-y-1">
              <p className="text-sm text-gray-500 font-medium">Description</p>
              <p className="text-base text-gray-900">{payment?.desipaymentobj}</p>
            </div>
          </div>

         </div>:<h1 className='text-xl text-center shadow-lg -mt-44 p-10 rounded-md border border-gray-50'> Search for payment details</h1>
            }
       </div>
      }

      </div>
    </div>
                        }


            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreatorSearchModal