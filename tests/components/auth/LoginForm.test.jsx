import React from "react";
import {render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import redLady from '@/images/redLady.png'
import LoginForm from "@/components/auth/LoginForm";
import { reasons } from "@/static/data";
import userEvent from "@testing-library/user-event";


vi.mock('../../../src/store/useAuthService',()=>({
    useAuthService:vi.fn()
}))


import { useAuthService } from "@/store/useAuthService";
import { MemoryRouter } from "react-router-dom";

describe('LoginForm',()=>{
    
    const mockLogin = vi.fn()
    beforeEach(()=>{
    
        vi.clearAllMocks();

        useAuthService.mockImplementation(()=>({
            isLoginForm:true,
        }))
        render(
            <MemoryRouter>
            <LoginForm onSubmit={mockLogin({
                email:'a@gmail.com',password:'pass123'
            })} header="Ready to find your next client ? let's go" reasons={reasons.clientLogin} image={redLady}/>
        </MemoryRouter>
            )
    })
        it('should display the login page and submit the user credentials',async()=>{
            expect(screen.getAllByRole('heading',{name:/Login to your account/i})[0]).toBeInTheDocument();

            const email = screen.getByPlaceholderText(/Enter email/i)
            const password = screen.getByPlaceholderText(/Enter password/i)
            const button = screen.getByRole('button',{name:/login/i});
            const user = userEvent.setup()

            await user.type(email,'a@gmail.com')
            await user.type(password,'pass123')
            await user.click(button);

            expect(mockLogin).toHaveBeenCalledWith({
                email:'a@gmail.com',password:'pass123'
            })

        })
  
})