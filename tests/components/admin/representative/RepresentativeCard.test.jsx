import RepresentativeCard from "@/components/admin/representative/RepresentativeCard"
import { render, screen } from "@testing-library/react"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect, vi } from "vitest"

// Mock Image component
vi.mock("@/components/global/Image", () => ({
  default: (props) => <img {...props} />,
}))

const mockRepresentative = {
  id: 1,
  name: "Yunus Uthman",
  email: "yunus@gmail.com",
  phone: "1234567890",
  gender: "male",
  state: "Lagos",
  lga: "Ikeja",
  refercode: 4121,
  pic: "https://example.com/image.png",
}

const renderComponent = () => {
  render(
    <BrowserRouter>
      <RepresentativeCard representative={mockRepresentative} />
    </BrowserRouter>
  )
}

describe("RepresentativeCard", () => {

  it("renders name", () => {
    renderComponent()
    expect(screen.getByText(/yunus uthman/i)).toBeInTheDocument()
  })

  it("renders email", () => {
    renderComponent()
    expect(screen.getByText(/yunus@gmail.com/i)).toBeInTheDocument()
  })

  it("renders phone", () => {
    renderComponent()
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument()
  })

  it("renders gender", () => {
    renderComponent()
    expect(screen.getByText(/male/i)).toBeInTheDocument()
  })

  it("renders state and lga", () => {
    renderComponent()
    expect(screen.getByText(/lagos/i)).toBeInTheDocument()
    expect(screen.getByText(/ikeja/i)).toBeInTheDocument()
  })

  it("renders reference code", () => {
    renderComponent()
    expect(screen.getByText(/4121/i)).toBeInTheDocument()
  })

  it("renders link with correct url", () => {
    renderComponent()
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute(
      "href",
      `/admin/representatives/profile/${mockRepresentative.refercode}`
    )
  })

})