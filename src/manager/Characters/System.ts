import { HtmlComponent } from "../components/HtmlComponent";

export class System {
  public failedMessage(player: string) {
    const { node } = new HtmlComponent("div", "", ["message", "system"]);
    node.textContent = `システム: ${player}の負けです。`;
    return node;
  }

  public retryMessage() {
    const { node } = new HtmlComponent("div", "", ["message", "system"]);
    node.textContent = "続けますか？";
    return node;
  }

  public makeMessage(message: string) {
    const { node } = new HtmlComponent("div", "", ["message", "system"]);
    node.innerText = `システム: ${message} `;
    return node;
  }
}
