import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import NewLetter from "@/components/home/NewLetter";
import React from "react";

vi.mock("axios");

describe("NewLetter", () => {
  it("should submit newsletter data", async () => {
    axios.post.mockResolvedValue({
      status: 201,
    });

    render(<NewLetter />);

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/full name/i),
      "latyus"
    );

    await user.type(
      screen.getByPlaceholderText(/email/i),
      "a@gmail.com"
    );

    await user.click(
      screen.getByRole("button", {
        name: /subscribe/i,
      })
    );

    expect(axios.post).toHaveBeenCalled();
  });
});