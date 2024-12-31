export const isNumeric = (num: number | string) => {
  return !Number.isNaN(+num);
};
