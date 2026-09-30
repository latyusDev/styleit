import PasswordHeader from "@/components/auth/PasswordHeader"
import { render, screen } from "@testing-library/react"
import React from "react"
import { describe, it, expect } from "vitest"

describe("PasswordHeader", () => {

  it("renders the title passed as prop", () => {
    render(<PasswordHeader title="Forgot Password" />)

    expect(screen.getByText("Forgot Password")).toBeInTheDocument()
  })


  it("renders the logo image", () => {
    render(<PasswordHeader title="Reset Password" />)

    const image = screen.getByRole("img")

    expect(image).toBeInTheDocument()
  })

})