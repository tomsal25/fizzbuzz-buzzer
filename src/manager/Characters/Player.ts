import { PlayerID } from "../../types/FizzBuzz";
import { HtmlComponent } from "../components/HtmlComponent";

export class Player {
  public playerID: PlayerID;

  public constructor(id: number, public playerName: string) {
    this.playerID = `player-${id}`;
  }

  public makeMessage(message: string) {
    const { node } = new HtmlComponent("div", "", ["message", "me"]);
    node.textContent = `${this.playerName}: ${message}`;
    return node;
  }
}
