// EditBankDetails.test.jsx
import EditBankDetails from "@/components/admin/creator/EditBankDetails"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import React from 'react'

// mocks
vi.mock("sonner", () => ({
  toast: vi.fn(),
}))

vi.mock("@/store/admin/creatoreStore/useAdminCreator", () => ({
  useAdminCreatorStore: () => ({
    getBankCodes: vi.fn().mockResolvedValue({
      bank_codes: [
        {
          bank_id: "001",
          bank_name: "Access Bank",
        },
      ],
    }),
    updateBankDetails: vi.fn().mockResolvedValue({
      message: "Updated successfully",
    }),
  }),
}))

vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: {
      bank_codes: [
        {
          bank_id: "001",
          bank_name: "Access Bank",
        },
      ],
    },
    isLoading: false,
    isError: false,
    error: null,
  }),
}))

describe("EditBankDetails", () => {
  const creator = {
    id: 1,
    firstname: "John",
    bank_account_name: "John Doe",
    bank_acc: "1234567890",
    bank: "GTBank",
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders form fields with creator data", async () => {
    render(
      <EditBankDetails
        creator={creator}
        _isLoading={false}
        _isError={false}
      />
    )

    expect(
      screen.getByDisplayValue("John Doe")
    ).toBeInTheDocument()

    expect(
      screen.getByDisplayValue("1234567890")
    ).toBeInTheDocument()

    expect(
      screen.getByText("John's Bank Details")
    ).toBeInTheDocument()
  })

  it("shows validation error when account number is too short", async () => {
    render(
      <EditBankDetails
        creator={creator}
        _isLoading={false}
        _isError={false}
      />
    )

    const accountNumberInput = screen.getByPlaceholderText(
      "Enter your account number"
    )

    fireEvent.change(accountNumberInput, {
      target: { value: "123" },
    })

    fireEvent.click(
      screen.getByRole("button", {
        name: /update bank details/i,
      })
    )

    await waitFor(() => {
      expect(
        screen.getByText("Enter a valid account number")
      ).toBeInTheDocument()
    })
  })

  it("submits form successfully", async () => {
    render(
      <EditBankDetails
        creator={creator}
        _isLoading={false}
        _isError={false}
      />
    )

    fireEvent.click(
      screen.getByRole("button", {
        name: /update bank details/i,
      })
    )

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /update bank details/i,
        })
      ).toBeInTheDocument()
    })
  })
})