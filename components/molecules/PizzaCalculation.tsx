import { SliceToppingsType } from "@/components/organisms/PizzaContainer";

const PIZZA_PRICE = 10;
const SLICE_PRICE = 1.5;
const PEPPERONI_PRICE = 0.025;

interface IPizzaCalculation {
  slicesAmount: number;
  slicesToppings: SliceToppingsType[];
}

const PizzaCalculation = ({
  slicesAmount,
  slicesToppings,
}: IPizzaCalculation) => {
  const slicesPrice = slicesAmount * SLICE_PRICE;
  const pepperoniAmount =
    slicesToppings?.reduce(
      (accumulator, topping) => accumulator + topping?.toppings || 0,
      0
    ) || 0;
  const pepperoniPrice = pepperoniAmount * PEPPERONI_PRICE;

  const totalPrice = PIZZA_PRICE + slicesPrice + pepperoniPrice;
  return (
    <div className="flex-1 px-4" data-testid="pizza-calculation">
      <p>Total Amount</p>
      <div className="flex justify-between gap-4 mt-4">
        <p>Pizza:</p>
        <p>${PIZZA_PRICE.toFixed(3)}</p>
      </div>
      <div className="flex justify-between gap-4 mt-2">
        <p>Slices:</p>
        <p>
          {slicesAmount} x ${SLICE_PRICE.toFixed(3)} = ${slicesPrice.toFixed(3)}
        </p>
      </div>
      <div className="flex justify-between gap-4 mt-2">
        <p>Pepperonis:</p>
        <p>
          {pepperoniAmount} x ${PEPPERONI_PRICE.toFixed(3)} = $
          {pepperoniPrice.toFixed(3)}
        </p>
      </div>
      <div className="flex justify-between gap-4 mt-3">
        <p className="text-lg">Total Value:</p>
        <p className="text-lg font-bold">{totalPrice.toFixed(3)}</p>
      </div>
    </div>
  );
};
export default PizzaCalculation;
