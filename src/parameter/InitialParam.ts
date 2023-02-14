import { EnemyProp, Setting } from "../types/FizzBuzz";

const vh = () => window.innerHeight;

export const enemyProp: EnemyProp = {
  // response delay[ms]
  delay: 500,
  // probability of correct answer 0-1.0
  accuracy: 0.9,
} as const;

export const setting: Setting = {
  // time limit[ms]
  timeLimit: 5000,
  // level of game
  gameLevel: "normal",
  // the amount of enemy
  enemyAmount: 3,
} as const;

export const style: {
  header: () => Partial<CSSStyleDeclaration>;
  footer: () => Partial<CSSStyleDeclaration>;
  wrapper: () => Partial<CSSStyleDeclaration>;
} = {
  header: () => ({
    height: `${vh() * 0.1}px`,
  }),
  footer: () => ({
    height: `${vh() * 0.1}px`,
  }),
  wrapper: () => ({
    height: `${vh() * 0.8}px`,
  }),
} as const;

export const inputButtonText = {
  current: "0",
  fizz: "Fizz",
  buzz: "Buzz",
  fizzbuzz: "FizzBuzz",
  retry: "retry",
} as const;
