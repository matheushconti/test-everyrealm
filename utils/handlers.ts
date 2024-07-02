export const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
