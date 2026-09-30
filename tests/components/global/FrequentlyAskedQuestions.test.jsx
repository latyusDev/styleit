import React from "react"
import FrequentlyAskedQuestions from "@/components/global/FrequentlyAskedQuestions";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/static/data", () => ({
  faqs: [
    {
      id: "item-1",
      question: "What is React?",
      answer: "React is a JavaScript library.",
    },
    {
      id: "item-2",
      question: "What is Vitest?",
      answer: "Vitest is a testing framework.",
    },
  ],
}));

describe("FrequentlyAskedQuestions", () => {
  it("renders all FAQ questions", () => {
    render(<FrequentlyAskedQuestions />);

    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("What is Vitest?")).toBeInTheDocument();
  });

  it("renders FAQ answers", () => {
    render(<FrequentlyAskedQuestions />);

    expect(
      screen.getByText("React is a JavaScript library.")
    ).toBeInTheDocument();

  });

  it("renders the correct number of accordion items", () => {
    render(<FrequentlyAskedQuestions />);

    const questions = screen.getAllByRole("button");
    expect(questions).toHaveLength(2);
  });
});