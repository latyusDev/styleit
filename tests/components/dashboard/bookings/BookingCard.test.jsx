import BookingCard from "@/components/dashboard/bookings/BookingCard";
import CustomQueryClientProvider from "@/components/global/CustomQueryClientProvider";
import { appointments } from "@/static/data";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

const renderComponent  = (page)=>{
return render(
    <CustomQueryClientProvider>
        <BookingCard appointment={appointments} page={page}/>
    </CustomQueryClientProvider>
)
}

describe('BookingCard',()=>{
    it('should render accept and decline buttons when page is not history', () => {
        
        renderComponent('bookings')
        const acceptButton = screen.getByRole('button',{name:'accept'})
        const  declineButton = screen.getByRole('button',{name:'decline'})
        expect(acceptButton).toBeInTheDocument()
        expect(acceptButton).toHaveTextContent(/accept/i)
        expect(declineButton).toBeInTheDocument()
        expect(declineButton).toHaveTextContent(/decline/i)
    })
    it('should not render accept and decline buttons when page is history', () => {
        renderComponent('history')
        const acceptButton = screen.queryByRole('button',{name:'accept'})
        const  declineButton = screen.queryByRole('button',{name:'decline'})
        expect(acceptButton).not.toBeInTheDocument()
        expect(declineButton).not.toBeInTheDocument()
    })
})