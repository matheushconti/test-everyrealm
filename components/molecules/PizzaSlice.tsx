import styles from "./PizzaSlice.module.css";
import Pepperoni from "@/components/atoms/Pepperoni";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { getRndInteger } from "@/utils/handlers";
import { memo } from "react";

interface IPizzaSlice {
  id: string;
  className?: string;
  onCrustClick: () => void;
  pepperoniAmount: number;
  onRightClick: (e: any) => void;
}
const PizzaSlice = memo(function PizzaSliceF({
  id = "",
  className = "",
  onCrustClick,
  pepperoniAmount,
  onRightClick,
}: IPizzaSlice) {
  const { width } = useWindowDimensions();
  const maxLeft = width > 640 ? 150 : 75;
  const maxTop = width > 640 ? 200 : 100;
  const pepperoniSize = width > 640 ? 50 : 30;
  const pepperonis: any = [];
  for (let i = 0; i < pepperoniAmount; i++) {
    const left = getRndInteger(20, maxLeft);
    const top = getRndInteger(left + pepperoniSize, maxTop);
    pepperonis.push(
      <Pepperoni key={`peperoni_${id}_${i}`} top={top} left={left} />
    );
  }
  return (
    <div
      data-testid={`slice`}
      className={`${styles.sliceHoldContainer} ${styles[id]} ${className}`}
    >
      <div className={styles.sliceHold}>
        <div
          className={styles.sliceBorder}
          data-testid={`slice-crust`}
          onClick={onCrustClick}
        >
          <div
            data-testid={`slice-inside`}
            className={styles.slice}
            onClick={onRightClick}
            onContextMenu={onRightClick}
          >
            {pepperonis}
          </div>
        </div>
      </div>
    </div>
  );
});
export default PizzaSlice;
