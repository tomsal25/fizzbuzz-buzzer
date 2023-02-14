import { HtmlComponent } from "../components/HtmlComponent";

export class System {
  public failedMessage(player: string) {
    const { node } = new HtmlComponent("div", "", ["message", "system"]);
    node.textContent = `system: ${player} failed.`;
    return node;
  }

  public retryMessage() {
    const { node } = new HtmlComponent("div", "", ["message", "system"]);
    node.textContent = "Continue to play?";
    return node;
  }
}
