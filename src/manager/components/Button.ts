import { FizzBuzzNumber } from "../../types/FizzBuzz";
import { State } from "../state/State";
import { HtmlComponent } from "./HtmlComponent";

export class Button extends HtmlComponent<"button"> {
  private _index;

  public constructor(
    index: "current" | Exclude<FizzBuzzNumber, `${number}`>,
    text: string
  ) {
    super("button", index, ["btn"]);
    this._index = index;
    this.node.textContent = text;
  }

  public getNumber = (): FizzBuzzNumber => {
    const id = this._index;
    return id == "current" ? `${State.getInstance().currentNumber}` : id;
  };
}
