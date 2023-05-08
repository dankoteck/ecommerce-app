export const getClassNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};
