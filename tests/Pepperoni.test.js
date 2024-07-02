import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pepperoni from "@/components/atoms/Pepperoni";

describe("Pepperoni Component", () => {
  it("renders with correct styles", () => {
    const top = 100;
    const left = 150;
    const { getByTestId } = render(<Pepperoni top={top} left={left} />);

    const pepperoniElement = getByTestId("pepperoni");

    expect(pepperoniElement).toBeInTheDocument();

    expect(pepperoniElement).toHaveStyle({
      top: `${top}px`,
      left: `${left}px`,
    });

    expect(pepperoniElement).toHaveClass(
      "rounded-full bg-red-500 w-[30px] h-[30px] absolute"
    );
  });
});
