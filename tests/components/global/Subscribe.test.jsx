import React from "react";
import {render, screen } from "@testing-library/react";
import {describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Subscribe from "@/components/global/Subscribe";

describe('Subscribe',()=>{

    it('should submit subscribe data',async()=>{
        const mockSubcribe = vi.fn();
        const data = {email:'a@gmail.com'}
        render(
            <Subscribe onSubmit={mockSubcribe(data)}/>
            )

            const email = screen.getByPlaceholderText(/email/i)
            const button = screen.getByRole('button',{name:/Subscribe/i});
            const user = userEvent.setup()
            await user.type(email,'a@gmail.com')
            await user.click(button);

            expect(mockSubcribe).toHaveBeenCalledWith(data)
        })
  
})