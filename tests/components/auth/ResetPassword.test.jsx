import ResetPassword from "@/components/auth/ResetPassword";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

vi.mock("axios");

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={["/reset/test-token"]}>
      <Routes>
        <Route
          path="/reset/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </MemoryRouter>
  );

describe("ResetPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders password fields and button", () => {
    renderComponent();

    expect(
      screen.getByText(/new password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/confirm password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /reset password/i,
      })
    ).toBeInTheDocument();
  });

  it("allows user to type passwords", () => {
    renderComponent();

    const newPassword =
      screen.getByTestId("new-password");

    const confirmPassword =
      screen.getByTestId("confirm-password");

    fireEvent.change(newPassword, {
      target: {
        value: "mypassword123",
      },
    });

    fireEvent.change(confirmPassword, {
      target: {
        value: "mypassword123",
      },
    });

    expect(newPassword).toHaveValue(
      "mypassword123"
    );

    expect(confirmPassword).toHaveValue(
      "mypassword123"
    );
  });

  it("submits the form successfully", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        message: "Password reset successfully",
      },
    });

    renderComponent();

    const newPassword =
      screen.getByTestId("new-password");

    const confirmPassword =
      screen.getByTestId("confirm-password");

    const button = screen.getByRole("button", {
      name: /reset password/i,
    });

    fireEvent.change(newPassword, {
      target: {
        value: "mypassword123",
      },
    });

    fireEvent.change(confirmPassword, {
      target: {
        value: "mypassword123",
      },
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "reset-password/test-token",
        {
          pwd: "mypassword123",
          cpwd: "mypassword123",
        }
      );
    });
  });
});