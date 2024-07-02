import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PizzaSlice from "@/components/molecules/PizzaSlice";

jest.mock("./PizzaSlice.module.css", () => ({
  sliceHoldContainer: "sliceHoldContainer",
  sliceHold: "sliceHold",
  sliceBorder: "sliceBorder",
  slice: "slice",
}));

describe("PizzaSlice Component", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <PizzaSlice
        id="test"
        onCrustClick={jest.fn()}
        pepperoniAmount={3}
        onRightClick={jest.fn()}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("renders the correct number of pepperonis", () => {
    const pepperoniAmount = 3;
    const { getAllByTestId } = render(
      <PizzaSlice
        id="test"
        onCrustClick={jest.fn()}
        pepperoniAmount={pepperoniAmount}
        onRightClick={jest.fn()}
      />
    );
    const pepperonis = getAllByTestId("pepperoni");
    expect(pepperonis).toHaveLength(pepperoniAmount);
  });

  it("calls onCrustClick when the crust is clicked", () => {
    const onCrustClick = jest.fn();
    const { getByTestId } = render(
      <PizzaSlice
        id="test"
        onCrustClick={onCrustClick}
        pepperoniAmount={3}
        onRightClick={jest.fn()}
      />
    );
    const crust = getByTestId("slice-crust");
    fireEvent.click(crust);
    expect(onCrustClick).toHaveBeenCalled();
  });

  it("calls onRightClick when the pizza slice is right-clicked", () => {
    const onRightClick = jest.fn();
    const { container } = render(
      <PizzaSlice
        id="test"
        onCrustClick={jest.fn()}
        pepperoniAmount={3}
        onRightClick={onRightClick}
      />
    );
    const slice = container.querySelector(".slice");
    fireEvent.contextMenu(slice);
    expect(onRightClick).toHaveBeenCalled();
  });
});
