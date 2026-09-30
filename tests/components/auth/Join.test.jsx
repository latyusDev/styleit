import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Join from "@/components/auth/Join";


describe('Join',()=>{
    let role = 'Fashion'
    it('should display login role, select the Client and submit it',async()=>{

        const mockLogin = vi.fn();
        render(<Join page="login" header="Log in as" onSubmit={mockLogin('Client')}/>)
        const Fashion = screen.getByRole('radio',{name:/Fashion/i})
        const Client = screen.getByRole('radio',{name:/Client/i})
        const user = userEvent.setup()

        await user.click(Client)
        expect(Client).toBeChecked()
        expect(Fashion).not.toBeChecked()

        await user.click(screen.getByRole('button',{name:/proceed/i}))
        expect(mockLogin).toHaveBeenCalledWith('Client')

})
    it('should display login role,select the Fashion and submit it',async()=>{

        const mockLogin = vi.fn();
        render(<Join page="login" header="Log in as" onSubmit={mockLogin('Fashion')}/>)
        const Fashion = screen.getByRole('radio',{name:/Fashion/i})
        const Client = screen.getByRole('radio',{name:/Client/i})
        const user = userEvent.setup()

        await user.click(Fashion)
        expect(Fashion).toBeChecked()
        expect(Client).not.toBeChecked()

        await user.click(screen.getByRole('button',{name:/proceed/i}))
        expect(mockLogin).toHaveBeenCalledWith('Fashion')

})

// sign up
    it('should display signUp roles,select the Client and submit it',async()=>{

        const mockSignUp = vi.fn();
        render(<Join page="signUp" header="Join us as" onSubmit={mockSignUp('Client')}/>)
        const Fashion = screen.getByRole('radio',{name:/Fashion/i})
        const Client = screen.getByRole('radio',{name:/Client/i})
        const user = userEvent.setup()

        await user.click(Client)
        expect(Client).toBeChecked()
        expect(Fashion).not.toBeChecked()

        await user.click(screen.getByRole('button',{name:/proceed/i}))
        expect(mockSignUp).toHaveBeenCalledWith('Client')

})
    it('should display signUp roles,select the Fashion and submit it',async()=>{

        const mockSignUp = vi.fn();
        render(<Join page="signUp" header="join us as" onSubmit={mockSignUp('Fashion')}/>)
        const Fashion = screen.getByRole('radio',{name:/Fashion/i})
        const Client = screen.getByRole('radio',{name:/Client/i})
        const user = userEvent.setup()

        await user.click(Fashion)
        expect(Fashion).toBeChecked()
        expect(Client).not.toBeChecked()

        await user.click(screen.getByRole('button',{name:/proceed/i}))
        expect(mockSignUp).toHaveBeenCalledWith('Fashion')

})

})