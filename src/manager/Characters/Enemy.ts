import {
  Choice,
  EnemyProp,
  FizzBuzzNumber,
  PlayerID,
} from "../../types/FizzBuzz";
import { toFizzBuzz } from "../../util/Functions";
import { HtmlComponent } from "../components/HtmlComponent";
import { State } from "../state/State";

export class Enemy {
  public playerID: PlayerID;
  private _playerName;

  public constructor(id: number, private settings: EnemyProp) {
    this.playerID = `enemy-${id}`;
    this._playerName = `Enemy-${id}`;
  }

  public get playerName() {
    return this._playerName;
  }
  public get delay() {
    return this.settings.delay;
  }

  public makeMessage(message: string) {
    const { node } = new HtmlComponent("div", "", ["message", "enemy"]);
    node.textContent = `${this._playerName}: ${message}`;
    return node;
  }

  public getRandomNumber(): Choice {
    const answer = State.getInstance().currentNumber;
    // make a wrong number list
    const list: FizzBuzzNumber[] = [`${answer}`, "fizz", "buzz", "fizzbuzz"];
    list.splice(list.indexOf(toFizzBuzz(answer)), 1);
    const { playerID } = this;
    // send a wrong letter based on accuracy
    const number =
      Math.random() <= this.settings.accuracy
        ? // correct
          toFizzBuzz(answer)
        : // wrong picked up randomly
          list[Math.floor(Math.random() * list.length)];
    return { playerID, number };
  }
}
