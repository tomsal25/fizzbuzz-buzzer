// number must be wrapped in a string
export type FizzBuzzNumber = `${number}` | "fizz" | "buzz" | "fizzbuzz";

export interface Choice {
  playerID: PlayerID;
  number: FizzBuzzNumber;
}

export interface EnemyProp {
  // response delay[ms]
  delay: number;
  // probability of correct answer 0-1.0
  accuracy: number;
}

export interface Setting {
  // time limit[ms]
  timeLimit: number;
  // level of game
  gameLevel: Level;
  // the amount of enemy
  enemyAmount: number;
}

export type PlayerID = "init" | `enemy-${number}` | `player-${number}`;
export type Progress = "init" | "playing" | "over";
export type Level = "normal" | "hard";
