import SuccessfulPayment from '@/components/dashboard/client/payment/SuccessfulPayment'
import React from 'react'

const SuccessfulPaymentPage = () => {
  return (
    <div data-testid="client-successful-payment" className='bg-gradient-to-tl from-pink-50 p-4  to-[50%] from-[50%] md:to-[54.2%] to-gray-50 md:from-[54.7%] '>
        <SuccessfulPayment/>
    </div>
  )
}

export default SuccessfulPaymentPage