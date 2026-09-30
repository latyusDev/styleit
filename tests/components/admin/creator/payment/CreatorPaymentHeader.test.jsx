import React from 'react'
import { render,screen } from '@testing-library/react'
import {describe,expect,it, vi} from 'vitest'
import CreatorPaymentHeader from '@/components/admin/creator/payment/CreatorPaymentHeader'

const component = value => <CreatorPaymentHeader full={value}/>
  
describe('CreatorPaymentHeader',()=>{
 
       it('shoould render the full header when the full prop is true',()=>{
        render(
            component(true)
        )
           const paymentHeader = screen.getByTestId('full-header')
           expect(paymentHeader).toBeInTheDocument();
       })
       it('shoould not render the full header when the full prop is false',()=>{
        render(
            component(false)
        )
           const paymentHeader = screen.getByTestId('half-header')
           expect(paymentHeader).toBeInTheDocument();
       })
     
})
        