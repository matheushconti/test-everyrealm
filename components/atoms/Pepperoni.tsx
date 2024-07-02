interface IPepperoni {
  top: number;
  left: number;
}
const Pepperoni = ({ top, left }: IPepperoni) => {
  return (
    <div
      data-testid={`pepperoni`}
      className="rounded-full bg-red-500 w-[30px] h-[30px] absolute"
      style={{ top, left }}
    ></div>
  );
};
export default Pepperoni;
