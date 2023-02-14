import { FizzBuzzNumber } from "../types/FizzBuzz";

export const toFizzBuzz = (number: number): FizzBuzzNumber => {
  if (number % 15 === 0) {
    return "fizzbuzz";
  } else if (number % 5 === 0) {
    return "buzz";
  } else if (number % 3 === 0) {
    return "fizz";
  } else {
    return `${number}`;
  }
};
