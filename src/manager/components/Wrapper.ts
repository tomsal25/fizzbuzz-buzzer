import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

import { style } from "../../parameter";
import { HtmlComponent } from "./HtmlComponent";

export class Wrapper extends HtmlComponent<"div"> {
  private static _instance: Wrapper | undefined;
  private readonly _scrollTarget;

  private constructor(contentNode: HTMLElement) {
    super("div", "wrapper", [], style.wrapper());
    this.setResponsive(style.wrapper);

    // set scrollbar
    const simpleBar = new SimpleBar(this.node);
    this._scrollTarget = simpleBar.getScrollElement();
    simpleBar.getContentElement().appendChild(contentNode);
  }

  // singleton
  public static getInstance(contentNode: HTMLElement) {
    return (Wrapper._instance ??= new Wrapper(contentNode));
  }

  public autoScrollToBottom(target = this._scrollTarget) {
    target.scroll({
      top: target.scrollHeight,
      behavior: "smooth",
    });
  }
}
