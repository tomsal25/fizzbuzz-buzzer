export class HtmlComponent<K extends keyof HTMLElementTagNameMap> {
  public readonly node: HTMLElementTagNameMap[K];
  private _classList?: string[];
  private _style?: Partial<CSSStyleDeclaration>;

  public constructor(
    tagname: K,
    id?: string,
    classList?: string[],
    style?: Partial<CSSStyleDeclaration>
  ) {
    this.node = document.createElement(tagname);
    // set id
    if (id) this.node.id = id;

    // set classes if any
    if (classList?.length) this.setClassList(classList);

    // set style if any
    if (style && Object.keys(style).length) this.setStyle(style);
  }

  public setClassList(classList: string[]) {
    this._classList = classList;
    this.node.classList.add(...classList);
  }

  public getClassList() {
    return this._classList;
  }

  public setStyle(style: Partial<CSSStyleDeclaration>) {
    this._style = style;
    Object.assign(this.node.style, style);
  }

  public getStyle() {
    return this._style;
  }

  public setResponsive(style: () => Partial<CSSStyleDeclaration>) {
    window.addEventListener("resize", () => {
      this.setStyle(style());
    });
  }
}
