import { fragment, init, setup } from "./manager";
import { HtmlComponent } from "./manager/components/HtmlComponent";
import "./style.scss";

export const app = new HtmlComponent("div", "app");
app.node.appendChild(fragment);

window.addEventListener("load", () => {
  init();
  setup();
});
