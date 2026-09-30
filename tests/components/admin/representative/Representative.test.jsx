import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Representative from "@/components/admin/representative/Representative"

// Mock Image component
vi.mock("@/components/global/Image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}))

// Mock fallback image
vi.mock("@/images/avatar_profile.png", () => ({
  default: "fallback-image.png",
}))

describe("Representative Component", () => {
  const mockRepresentative = {
    name: "Yunus Uthman",
    email: "yunus@gmail.com",
    phone: "11111111111",
    gender: "male",
    state: "Lagos",
    lga: "Ikeja",
    refercode: 1234,
    pic: "profile.png",
  }

  it("renders representative details correctly", () => {
    render(
      <MemoryRouter>
        <Representative representative={mockRepresentative} />
      </MemoryRouter>
    )

    expect(screen.getByText("Yunus Uthman")).toBeInTheDocument()
    expect(screen.getByText("yunus@gmail.com")).toBeInTheDocument()
    expect(screen.getByText("11111111111")).toBeInTheDocument()
    expect(screen.getByText("male")).toBeInTheDocument()
    expect(screen.getByText("Lagos")).toBeInTheDocument()
    expect(screen.getByText("Ikeja")).toBeInTheDocument()
    expect(screen.getByText("1234")).toBeInTheDocument()
  })

  it("renders profile image when provided", () => {
    render(
      <MemoryRouter>
        <Representative representative={mockRepresentative} />
      </MemoryRouter>
    )

    const img = screen.getByAltText("User")
    expect(img).toHaveAttribute("src", "profile.png")
  })

  it("renders fallback image when pic is missing", () => {
    const noPicData = { ...mockRepresentative, pic: null }

    render(
      <MemoryRouter>
        <Representative representative={noPicData} />
      </MemoryRouter>
    )

    const img = screen.getByAltText("User")
    expect(img).toHaveAttribute("src", "fallback-image.png")
  })

  it("has correct navigation link", () => {
    render(
      <MemoryRouter>
        <Representative representative={mockRepresentative} />
      </MemoryRouter>
    )

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute(
      "href",
      "/admin/representatives/profile/1234"
    )
  })
})