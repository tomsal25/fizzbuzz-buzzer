import { HtmlComponent } from "./HtmlComponent";

export class Main extends HtmlComponent<"div"> {
  private static _instance: Main | undefined;

  private constructor() {
    super("div", "main");
  }

  // singleton
  public static getInstance() {
    return (Main._instance ??= new Main());
  }
}
