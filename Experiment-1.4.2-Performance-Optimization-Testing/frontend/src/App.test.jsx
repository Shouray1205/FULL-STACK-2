import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Performance Optimized Post Manager", () => {
  test("renders the post manager", () => {
    render(<App />);

    expect(
      screen.getByText("Performance Optimized Post Manager")
    ).toBeInTheDocument();

    expect(screen.getByText("React Tutorial")).toBeInTheDocument();
    expect(screen.getByText("AI Project Update")).toBeInTheDocument();
  });

  test("searches posts correctly", () => {
    render(<App />);

    const searchBox = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchBox, {
      target: { value: "React" },
    });

    expect(screen.getByText("React Tutorial")).toBeInTheDocument();
    expect(screen.queryByText("AI Project Update")).not.toBeInTheDocument();
  });

test("updates a post status", () => {
  render(<App />);

  const updateButtons = screen.getAllByText("Update");

  fireEvent.click(updateButtons[0]);

  const postCards = screen.getAllByText("React Tutorial");

  expect(postCards[0]).toBeInTheDocument();

  expect(
    postCards[0].closest(".post-card").querySelector(".status")
  ).toHaveTextContent("Scheduled");
});

  test("deletes a post", () => {
    render(<App />);

    expect(screen.getByText("College Event")).toBeInTheDocument();

    const deleteButtons = screen.getAllByText("Delete");

    fireEvent.click(deleteButtons[2]);

    expect(screen.queryByText("College Event")).not.toBeInTheDocument();
  });

  test("triggers unrelated state update", () => {
    render(<App />);

    const button = screen.getByText("Trigger Re-render");

    fireEvent.click(button);

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});