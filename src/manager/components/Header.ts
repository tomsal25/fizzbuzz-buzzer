import { style } from "../../parameter";
import { HtmlComponent } from "./HtmlComponent";

export class Header extends HtmlComponent<"div"> {
  private static _instance: Header | undefined;

  private constructor() {
    super("div", "header", [], style.header());
    this.setResponsive(style.header);

    const { node } = new HtmlComponent("p");
    node.textContent = "FizzBuzz Buzzer";
    this.node.appendChild(node);
  }

  // singleton
  public static getInstance() {
    return (Header._instance ??= new Header());
  }
}
