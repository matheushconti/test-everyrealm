import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PizzaContainer from "@/components/organisms/PizzaContainer";

describe("PizzaContainer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<PizzaContainer />);
    expect(container).toBeInTheDocument();
  });

  it("renders the correct number of pizza slices", () => {
    render(<PizzaContainer />);
    const pizzaSlices = screen.getAllByTestId("slice");
    expect(pizzaSlices).toHaveLength(8);
  });

  it("removes a slice when the crust is clicked", () => {
    render(<PizzaContainer />);
    const pizzaSlices = screen.getAllByTestId("slice-crust");
    fireEvent.click(pizzaSlices[0]);
    expect(
      pizzaSlices[0].parentElement.parentElement.parentElement
    ).toHaveClass("hidden");
  });

  it("resets the slices when the reset button is clicked", () => {
    render(<PizzaContainer />);
    const pizzaSlices = screen.getAllByTestId("slice");
    fireEvent.click(pizzaSlices[0]);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
    expect(pizzaSlices[0].parentElement).not.toHaveClass("hidden");
  });

  it("increments the toppings when the slice is right-clicked", () => {
    render(<PizzaContainer />);
    const pizzaSlices = screen.getAllByTestId("slice-inside");
    fireEvent.contextMenu(pizzaSlices[0]);

    const pepperonis = screen.getAllByTestId("pepperoni");
    expect(pepperonis).toHaveLength(41);
  });

  it("shows the calculation component when calculate button is clicked", () => {
    render(<PizzaContainer />);
    const calculateButton = screen.getByText("Calculate Value");
    fireEvent.click(calculateButton);
    expect(screen.getByTestId("pizza-calculation")).toBeInTheDocument();
  });

  it("disables the calculate button after clicking it", () => {
    render(<PizzaContainer />);
    const calculateButton = screen.getByText("Calculate Value");
    fireEvent.click(calculateButton);
    expect(calculateButton).toBeDisabled();
  });
});
