import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SignUpForm from "@/components/auth/SignUpForm";
import React from "react";

// MOCK useAuth
const signUpMock = vi.fn();

vi.mock("@/store/useAuth", () => ({
  useAuth: () => ({
    role: "client",
    signUp: signUpMock,
    isLoading: false,
    setIsLoading: vi.fn(),
  }),
}));

vi.mock('@/store/useAuthService', () => ({
  useAuthService: (cb) => {
    const state = {
      isSignUpForm: true,
      getCountries: vi.fn(),
      getStates: vi.fn(),
      getLocalGovernment: vi.fn(),
    };

    // handle BOTH cases
    return typeof cb === "function" ? cb(state) : state;
  },
}));

// MOCK react-query (VERY IMPORTANT for Level 2)
vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: {},
    isLoading: false,
    isError: false,
  }),
}));

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <SignUpForm reasons={[]} header="Join us" />
      </MemoryRouter>
    );

  // TEST 1: Renders level 1
  it("renders level 1 form inputs", () => {
    setup();

    expect(screen.getByTestId("firstName-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  // TEST 2: Moves to level 2
  it("moves to level 2 and shows Prev & Submit", async () => {
    setup();

    // Fill ALL required fields
    fireEvent.change(screen.getByTestId("firstName-input"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByTestId("lastName-input"), {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "12345678" },
    });

    fireEvent.change(screen.getByTestId("confirmPassword-input"), {
      target: { value: "12345678" },
    });

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "john123" },
    });

    fireEvent.change(screen.getByTestId("phone-input"), {
      target: { value: "08012345678" },
    });

    fireEvent.click(screen.getByTestId("male-radio"));
    const file = new File(["dummy"], "test.png", { type: "image/png" });

    fireEvent.change(screen.getByTestId("file-input"), {
    target: { files: [file] },
    });

    //  Click Next AFTER filling
    fireEvent.click(screen.getByText(/Next/i));

    //  Assert Level 2 UI
    await waitFor(() => {
      expect(screen.getByText(/Prev/i)).toBeInTheDocument();
      expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    });
   
  });

});
