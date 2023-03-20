import { HtmlComponent } from "./HtmlComponent";

export const drawerButton = new HtmlComponent("div", "drawer-bth", [
  "drawer-close",
]);
export const drawer = new HtmlComponent("div", "drawer", ["drawer-close"]);

// toggle class
drawerButton.node.addEventListener("click", () => {
  [drawerButton, drawer].forEach(({ node }) => {
    node.className =
      node.className == "drawer-open" ? "drawer-close" : "drawer-open";
  });
});

// for css
for (let i = 0; i < 3; i++) {
  drawerButton.node.appendChild(new HtmlComponent("div").node);
}

const githubLink = new HtmlComponent("a").node;
githubLink.textContent = "GitHub Link";
githubLink.href = "https://github.com/tomsal25/fizzbuzz-buzzer";
githubLink.setAttribute("target", "_blank");
githubLink.setAttribute("rel", "noopener noreferrer");

drawer.node.appendChild(githubLink);
