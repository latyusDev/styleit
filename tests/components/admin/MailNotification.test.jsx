
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import axios from "axios"
import MailNotification from "@/components/admin/superAdmin/MailNotification"
import React from "react"


vi.mock("axios")

vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(() => "fake-token"),
  },
}))

vi.mock("sonner", () => ({
  toast: vi.fn(),
}))

describe("MailNotification", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders form fields", () => {
    render(<MailNotification />)

    expect(
      screen.getByPlaceholderText("Enter the subject")
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText("Enter the message")
    ).toBeInTheDocument()

    expect(
      screen.getByRole("button", {
        name: /send notification/i,
      })
    ).toBeInTheDocument()
  })

  it("shows validation errors when fields are empty", async () => {
    render(<MailNotification />)

    fireEvent.click(
      screen.getByRole("button", {
        name: /send notification/i,
      })
    )

    expect(
      await screen.findByText("Enter a valid subject")
    ).toBeInTheDocument()

    expect(
      await screen.findByText("Enter a valid body")
    ).toBeInTheDocument()
  })

  it("submits the form successfully", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: {},
    })

    render(<MailNotification />)

    fireEvent.change(
      screen.getByPlaceholderText("Enter the subject"),
      {
        target: {
          value: "Test Subject",
        },
      }
    )

    fireEvent.change(
      screen.getByPlaceholderText("Enter the message"),
      {
        target: {
          value: "This is a test message",
        },
      }
    )

    fireEvent.click(
      screen.getByRole("button", {
        name: /send notification/i,
      })
    )

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1)
    })

    expect(axios.post).toHaveBeenCalledWith(
      "mail-notification",
      {
        subject: "Test Subject",
        body: "This is a test message",
      },
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      })
    )
  })
})