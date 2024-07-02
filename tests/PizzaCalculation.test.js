import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PizzaCalculation from "@/components/molecules/PizzaCalculation";

describe("PizzaCalculation Component", () => {
  const basePrice = 10;
  const slicePrice = 1.5;
  const pepperoniPrice = 0.025;

  it("renders without crashing", () => {
    const { container } = render(
      <PizzaCalculation slicesAmount={8} slicesToppings={[]} />
    );
    expect(container).toBeInTheDocument();
  });

  it("correctly calculates and displays the total price for given slices and pepperonis", () => {
    const slicesToppings = [
      { slice: 1, toppings: 5 },
      { slice: 2, toppings: 3 },
    ];
    const slicesAmount = 2;
    const totalSlicesPrice = slicesAmount * slicePrice;
    const totalPepperoniAmount = slicesToppings.reduce(
      (acc, curr) => acc + curr.toppings,
      0
    );
    const totalPepperoniPrice = totalPepperoniAmount * pepperoniPrice;
    const totalPrice = basePrice + totalSlicesPrice + totalPepperoniPrice;

    render(
      <PizzaCalculation
        slicesAmount={slicesAmount}
        slicesToppings={slicesToppings}
      />
    );

    expect(screen.getByText(`$${basePrice.toFixed(3)}`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${slicesAmount} x $${slicePrice.toFixed(
          3
        )} = $${totalSlicesPrice.toFixed(3)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${totalPepperoniAmount} x $${pepperoniPrice.toFixed(
          3
        )} = $${totalPepperoniPrice.toFixed(3)}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(totalPrice.toFixed(3))).toBeInTheDocument();
  });

  it("correctly handles zero slices and zero pepperonis", () => {
    render(<PizzaCalculation slicesAmount={0} slicesToppings={[]} />);

    expect(screen.getByText("$10.000")).toBeInTheDocument();
    expect(screen.getByText("0 x $1.500 = $0.000")).toBeInTheDocument();
    expect(screen.getByText("0 x $0.025 = $0.000")).toBeInTheDocument();
    expect(screen.getByText("10.000")).toBeInTheDocument();
  });

  it("correctly handles only slices with no pepperonis", () => {
    const slicesAmount = 4;
    const totalSlicesPrice = slicesAmount * slicePrice;
    const totalPrice = basePrice + totalSlicesPrice;

    render(
      <PizzaCalculation slicesAmount={slicesAmount} slicesToppings={[]} />
    );

    expect(screen.getByText(`$${basePrice.toFixed(3)}`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${slicesAmount} x $${slicePrice.toFixed(
          3
        )} = $${totalSlicesPrice.toFixed(3)}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText("0 x $0.025 = $0.000")).toBeInTheDocument();
    expect(screen.getByText(totalPrice.toFixed(3))).toBeInTheDocument();
  });

  it("correctly handles slices with varying amounts of pepperonis", () => {
    const slicesToppings = [
      { slice: 1, toppings: 10 },
      { slice: 2, toppings: 15 },
      { slice: 3, toppings: 20 },
    ];
    const slicesAmount = 3;
    const totalSlicesPrice = slicesAmount * slicePrice;
    const totalPepperoniAmount = slicesToppings.reduce(
      (acc, curr) => acc + curr.toppings,
      0
    );
    const totalPepperoniPrice = totalPepperoniAmount * pepperoniPrice;
    const totalPrice = basePrice + totalSlicesPrice + totalPepperoniPrice;

    render(
      <PizzaCalculation
        slicesAmount={slicesAmount}
        slicesToppings={slicesToppings}
      />
    );

    expect(screen.getByText(`$${basePrice.toFixed(3)}`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${slicesAmount} x $${slicePrice.toFixed(
          3
        )} = $${totalSlicesPrice.toFixed(3)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${totalPepperoniAmount} x $${pepperoniPrice.toFixed(
          3
        )} = $${totalPepperoniPrice.toFixed(3)}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(totalPrice.toFixed(3))).toBeInTheDocument();
  });
});
