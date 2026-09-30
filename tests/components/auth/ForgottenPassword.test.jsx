import ForgottenPassword from "@/components/auth/ForgottenPassword"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import React from 'react'
import { MemoryRouter } from "react-router-dom"

const renderComponent = () =>
  render(
    <MemoryRouter>
      <ForgottenPassword />
    </MemoryRouter>
  )


describe("ForgottenPassword", () => {

  it("renders the form", () => {
    renderComponent()

    expect(screen.getByText("Forgot Password")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /send reset link/i })).toBeInTheDocument()
  })


  it("allows user to type email", () => {
    renderComponent()

    const input = screen.getByPlaceholderText("Enter your email")

    fireEvent.change(input, {
      target: { value: "test@email.com" }
    })

    expect(input).toHaveValue("test@email.com")
  })


  it("submits the form", () => {

    renderComponent()

    const input = screen.getByPlaceholderText("Enter your email")
    const button = screen.getByRole("button", { name: /send reset link/i })

    fireEvent.change(input, {
      target: { value: "test@email.com" }
    })

    fireEvent.click(button)
  })

})