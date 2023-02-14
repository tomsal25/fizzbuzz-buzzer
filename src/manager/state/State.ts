import {
  Choice,
  FizzBuzzNumber,
  PlayerID,
  Progress,
} from "../../types/FizzBuzz";
import { toFizzBuzz } from "../../util/Functions";
import { Enemy, Player } from "../Characters";

export class State {
  private static _instance: State | undefined;
  private _currentNumber = 0;
  private _currentPlayerID: PlayerID = "init";
  private _currentPlayerName = "";
  private _progress: Progress = "init";
  private _character: (Enemy | Player)[] | undefined;

  private constructor() {
    /* */
  }

  // singleton
  public static getInstance() {
    return (State._instance ??= new State());
  }

  public get currentNumber() {
    return this._currentNumber;
  }

  public get currentPlayerName() {
    return this._currentPlayerName;
  }

  public init(character: (Enemy | Player)[]) {
    this._character = character;
    this.initPlayerID(character[0].playerID);
    this.initCurrentNumber();
    this._progress = "playing";
  }

  public update() {
    const list = this._character;
    if (!list?.length) return;

    // set next player
    const currentIndex = (this._currentNumber - 1 + 1) % list.length;
    this._currentPlayerID = list[currentIndex].playerID;
    this._currentPlayerName = list[currentIndex].playerName;

    // increase number
    this._currentNumber++;
  }

  private initPlayerID(playerID: PlayerID) {
    this._currentPlayerID = playerID;
  }
  private isValidPlayerID(player: PlayerID) {
    return this._currentPlayerID === player;
  }

  private initCurrentNumber() {
    this._currentNumber = 1;
  }
  private isValidNumber(number: FizzBuzzNumber) {
    return toFizzBuzz(this._currentNumber) === number;
  }

  public isValidChoice(choice: Choice) {
    return (
      this.isValidPlayerID(choice.playerID) && this.isValidNumber(choice.number)
    );
  }

  public isGameOver() {
    return this._progress === "over";
  }

  public stopGame() {
    this._progress = "over";
  }
}
