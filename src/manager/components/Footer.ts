import { inputButtonText, style } from "../../parameter";
import { State } from "../state/State";
import { Button } from "./Button";
import { HtmlComponent } from "./HtmlComponent";

export class Footer extends HtmlComponent<"div"> {
  private static _instance: Footer | undefined;
  public readonly currentButton;
  public readonly inputButtonList;
  public readonly retryButton;

  private constructor() {
    super("div", "footer", [], style.footer());
    this.setResponsive(style.footer);

    // input buttons
    const current = new Button("current", inputButtonText.current);
    const fizz = new Button("fizz", inputButtonText.fizz);
    const buzz = new Button("buzz", inputButtonText.buzz);
    const fizzbuzz = new Button("fizzbuzz", inputButtonText.fizzbuzz);

    this.currentButton = current;
    this.inputButtonList = [current, fizz, buzz, fizzbuzz] as const;

    // #Footer > [#current, #fizz, #buzz, #fizzbuzz]
    for (const itr of this.inputButtonList) {
      this.node.appendChild(itr.node);
    }

    // retry button
    const retry = new HtmlComponent("button", "", ["btn"]);
    retry.node.textContent = inputButtonText.retry;
    this.retryButton = retry;
  }

  // singleton
  public static getInstance() {
    return (Footer._instance ??= new Footer());
  }

  public init() {
    this.currentButton.node.textContent = "1";
    if (State.getInstance().isGameOver())
      this.node.removeChild(this.retryButton.node);
    this.resumeInput();
  }

  public update() {
    this.currentButton.node.textContent = `${
      State.getInstance().currentNumber
    }`;
  }

  private disableInput() {
    for (const btn of this.inputButtonList) {
      btn.node.disabled = true;
    }
  }

  private enableInput() {
    for (const btn of this.inputButtonList) {
      btn.node.disabled = false;
    }
  }

  public stopInput() {
    this.disableInput();
  }
  public resumeInput() {
    this.enableInput();
  }
}
