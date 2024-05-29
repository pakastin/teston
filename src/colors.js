export const GREEN = '\x1b[32m';
export const RESET = '\x1b[0m';
export const RED = '\x1b[31m';
export const GREY = '\x1b[90m';

export const green = (str) => {
  return (typeof window !== "undefined")? str : GREEN + str + RESET;
};
export const red = (str) => {
  return (typeof window !== "undefined")? str : RED + str + RESET;
};
export const grey = (str) => {
  return (typeof window !== "undefined")? str : GREY + str + RESET;
};
