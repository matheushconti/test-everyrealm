"use client";
import PizzaSlice from "@/components/molecules/PizzaSlice";
import { useState } from "react";
import PizzaCalculation from "../molecules/PizzaCalculation";

export type SliceToppingsType = {
  slice: number;
  toppings: number;
};

const SLICES_ARR = [0, 1, 2, 3, 4, 5, 6, 7];
const SLICES_TOPPINGS: SliceToppingsType[] = SLICES_ARR.map((v) => ({
  slice: v,
  toppings: 5,
}));

const PizzaContainer = () => {
  const [slicesRemoved, setSlicesRemoved] = useState<number[]>([]);
  const [slicesToppings, setSlicesToppings] =
    useState<SliceToppingsType[]>(SLICES_TOPPINGS);
  const [showCalculate, setShowCalculate] = useState<boolean>(false);
  const removeSlice = (item: number) => {
    setSlicesRemoved([...slicesRemoved, item]);
  };
  const resetSlices = () => {
    setSlicesRemoved([]);
    setSlicesToppings(SLICES_TOPPINGS);
    setShowCalculate(false);
  };

  const handleRightClick = (e: any, slice: number) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === "contextmenu") {
      const newToppings =
        slicesToppings?.map((topping) => {
          if (topping?.slice === slice) {
            return { ...topping, toppings: topping?.toppings + 1 };
          } else {
            return topping;
          }
        }) || SLICES_TOPPINGS;
      setSlicesToppings(newToppings);
    }
  };

  const calculate = () => {
    setShowCalculate(true);
  };
  const slicesAmount = SLICES_ARR.length - slicesRemoved.length;

  return (
    <div className="text-center flex flex-col justify-center">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-yellow-100">
          {SLICES_ARR?.map((slice) => (
            <div
              key={slice}
              className={slicesRemoved.includes(slice) ? "hidden" : ""}
            >
              <PizzaSlice
                id={`slice${slice}`}
                onCrustClick={() => removeSlice(slice)}
                pepperoniAmount={
                  slicesToppings?.find((topping) => topping.slice === slice)
                    ?.toppings || 0
                }
                onRightClick={(e) => handleRightClick(e, slice)}
              />
            </div>
          ))}
        </div>
        {showCalculate && (
          <PizzaCalculation
            slicesAmount={slicesAmount}
            slicesToppings={slicesToppings}
          />
        )}
      </div>
      <div className="w-full flex gap-4">
        <button
          className="flex-1 py-4 px-6 rounded-xl bg-blue-800 text-white mt-4"
          onClick={resetSlices}
        >
          Reset
        </button>
        <button
          className="flex-1 py-4 px-6 rounded-xl bg-blue-800 text-white mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={calculate}
          disabled={showCalculate}
        >
          Calculate Value
        </button>
      </div>
    </div>
  );
};
export default PizzaContainer;
