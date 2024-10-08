// __tests__/components/Layout.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Layout from "../../components/Layout";

// Mock the CreateDealModal component
jest.mock("../../components/Deals/CreateDeal", () => {
  return function MockCreateDealModal({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) {
    return (
      <div data-testid="modal" style={{ display: isOpen ? "block" : "none" }}>
        <button onClick={onClose}>Close Modal</button>
      </div>
    );
  };
});

jest.mock("next/image", () => {
  return ({ src, alt }: { src: string; alt: string }) => {
    return <img src={src} alt={alt} />;
  };
});

describe("Layout Component", () => {
  const title = "Test Title";

  it("renders the layout with the correct title and content", () => {
    render(<Layout title={title}>Content</Layout>);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("opens the CreateDealModal when 'Add New' button is clicked", () => {
    render(<Layout title={title}>Content</Layout>);

    // Click the 'Add New' button
    fireEvent.click(screen.getByRole("button", { name: /add new/i }));

    // Modal should be visible
    expect(screen.getByTestId("modal")).toBeVisible();
  });

  it("closes the CreateDealModal when close button is clicked", () => {
    render(<Layout title={title}>Content</Layout>);

    // Open the modal
    fireEvent.click(screen.getByRole("button", { name: /add new/i }));

    // Close the modal
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));

    // Modal should not be visible
    expect(screen.getByTestId("modal")).not.toBeVisible();
  });

  it("updates the selected icon based on the current path", () => {
    render(<Layout title={title}>Content</Layout>);
    // Simulate navigation by directly manipulating window location
    Object.defineProperty(window, "location", {
      writable: true,
      value: { pathname: "/deals" },
    });

    // Re-rendering to reflect the new path
    fireEvent.click(screen.getByRole("menuitem", { name: "Deals" }));

    expect(screen.getByRole("menuitem", { name: "Deals" })).toHaveClass(
      "bg-[#514EF3]"
    );
    expect(screen.getByRole("menuitem", { name: "Dashboard" })).not.toHaveClass(
      "bg-[#514EF3]"
    );
  });

  const setViewport = (width: number, height: number) => {
    global.innerWidth = width;
    global.innerHeight = height;
    global.dispatchEvent(new Event("resize"));
  };

  beforeEach(() => {
    setViewport(375, 667); // Set to a small screen size (e.g., iPhone)
  });

  it("toggles the sidebar on small screens", () => {
    render(<Layout title={title}>Content</Layout>);

    // Initially, the sidebar button should be present
    expect(
      screen.getByRole("button", { name: "Toggle sidebar" })
    ).toBeInTheDocument();

    console.log(screen.getByRole("navigation"));

    // Click the sidebar toggle button to open the sidebar
    fireEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }));
    expect(screen.getByRole("navigation")).toHaveClass("translate-x-0");

    // Click the sidebar toggle button again to close the sidebar
    fireEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }));
    expect(screen.getByRole("navigation")).toHaveClass("-translate-x-full");
  });
});
