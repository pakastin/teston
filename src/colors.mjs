export const GREEN = '\x1b[32m';
export const RESET = '\x1b[0m';
export const RED = '\x1b[31m';
export const GREY = '\x1b[90m';

export const green = (str) => {
  return GREEN + str + RESET;
};
export const red = (str) => {
  return RED + str + RESET;
};
export const grey = (str) => {
  return GREY + str + RESET;
};
