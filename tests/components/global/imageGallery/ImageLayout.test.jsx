import { ImageLayout } from "@/components/global/imageGallery/ImageLayout";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";


vi.mock("@/components/global/imageGallery/OneImage", () => ({
  default: () => <div data-testid="one-image">One Image</div>,
}));

vi.mock("@/components/global/imageGallery/TwoImages", () => ({
  default: () => <div data-testid="two-images">Two Images</div>,
}));

vi.mock("@/components/global/imageGallery/ThreeImages", () => ({
  default: () => <div data-testid="three-images">Three Images</div>,
}));

vi.mock("@/components/global/imageGallery/FourImages", () => ({
  default: () => <div data-testid="four-images">Four Images</div>,
}));

vi.mock("@/components/global/imageGallery/MoreThanFiveImages", () => ({
  default: () => (
    <div data-testid="more-than-five-images">
      More Than Five Images
    </div>
  ),
}));

describe("ImageLayout", () => {
  const openModal = vi.fn();

  it("renders OneImage when there is 1 image", () => {
    render(
      <ImageLayout
        images={[{ id: 1, url: "img1.jpg" }]}
        openModal={openModal}
      />
    );

    expect(screen.getByTestId("one-image")).toBeInTheDocument();
  });

  it("renders TwoImages when there are 2 images", () => {
    render(
      <ImageLayout
        images={[
          { id: 1, url: "img1.jpg" },
          { id: 2, url: "img2.jpg" },
        ]}
        openModal={openModal}
      />
    );

    expect(screen.getByTestId("two-images")).toBeInTheDocument();
  });

  it("renders ThreeImages when there are 3 images", () => {
    render(
      <ImageLayout
        images={[
          {},
          {},
          {},
        ]}
        openModal={openModal}
      />
    );

    expect(screen.getByTestId("three-images")).toBeInTheDocument();
  });

  it("renders FourImages when there are 4 images", () => {
    render(
      <ImageLayout
        images={[{}, {}, {}, {}]}
        openModal={openModal}
      />
    );

    expect(screen.getByTestId("four-images")).toBeInTheDocument();
  });

  it("renders MoreThanFiveImages when there are 5 or more images", () => {
    render(
      <ImageLayout
        images={[{}, {}, {}, {}, {}]}
        openModal={openModal}
      />
    );

    expect(
      screen.getByTestId("more-than-five-images")
    ).toBeInTheDocument();
  });

  it("renders nothing when images array is empty", () => {
    const { container } = render(
      <ImageLayout
        images={[]}
        openModal={openModal}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});