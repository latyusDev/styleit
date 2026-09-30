import Client from "@/components/admin/client/Client";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";


const mockDeactivateUser = vi.fn();
const mockMutate = vi.fn();
const mockInvalidateQueries = vi.fn();

vi.mock("@/store/admin/useAdmin", () => ({
  useAdminStore: () => ({
    deactivateUser: mockDeactivateUser,
  }),
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: () => ({
    mutate: mockMutate,
    isPending: false,
    isBanPending: false,
  }),
  useQueryClient: () => ({
    invalidateQueries: mockInvalidateQueries,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: ({ children, to }) => (
      <a href={to}>{children}</a>
    ),
  };
});

vi.mock("@/components/global/Image", () => ({
  default: ({ src }) => (
    <img src={src} alt="profile" />
  ),
}));

describe("Client", () => {
  const client = {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
    gender: "male",
    status: "active",
    profilePic: "avatar.jpg",
  };

  const handleOptions = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders client information", () => {
    render(
      <Client
        client={client}
        id={null}
        handleOptions={handleOptions}
        borderClass=""
        textColorClass=""
      />
    );

    expect(
      screen.getByTestId("name-1")
    ).toHaveTextContent("Doe John");

    expect(
      screen.getByTestId("email-1")
    ).toHaveTextContent("john@example.com");

    expect(
      screen.getByTestId("gender-1")
    ).toHaveTextContent("male");

    expect(
      screen.getByTestId("status-1")
    ).toHaveTextContent("active");
  });

  it("calls handleOptions when action button is clicked", () => {
    render(
      <Client
        client={client}
        id={null}
        handleOptions={handleOptions}
        borderClass=""
        textColorClass=""
      />
    );

    fireEvent.click(
      screen.getByTestId("actionButton-1")
    );

    expect(handleOptions).toHaveBeenCalledWith(1);
  });

  it("shows action menu when selected client id matches", () => {
    render(
      <Client
        client={client}
        id={1}
        handleOptions={handleOptions}
        borderClass=""
        textColorClass=""
      />
    );

    expect(
      screen.getByTestId("menu-1")
    ).toBeInTheDocument();
  });

  it("calls deactivate mutation when trash icon is clicked", () => {
    render(
      <Client
        client={client}
        id={1}
        handleOptions={handleOptions}
        borderClass=""
        textColorClass=""
      />
    );

    const trashIcon =
      screen
        .getByTestId("menu-1")
        .querySelector(".text-red-500");

    fireEvent.click(trashIcon);

    expect(mockMutate).toHaveBeenCalled();
  });
});