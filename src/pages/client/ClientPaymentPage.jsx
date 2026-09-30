import React from 'react'
import ClientPayment from '@/components/dashboard/client/payment/ClientPayment'

const ClientPaymentPage = () => {
  return (
    <section data-testid="client-payment-page" className='py-12'>
      <ClientPayment/>
    </section>
  )
}

export default ClientPaymentPage