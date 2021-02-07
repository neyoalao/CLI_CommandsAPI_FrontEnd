import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private renderer: Renderer2;
  private colorTheme: string;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  update(theme: "dark-mode" | "light-mode"): void {
    this.setColorTheme(theme);
    const previousColorTheme =
      theme === "dark-mode" ? "light-mode" : "dark-mode";
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  isDarkMode(): boolean {
    return this.colorTheme === "dark-mode";
  }

  private setColorTheme(theme: string): void {
    this.colorTheme = theme;
    localStorage.setItem("user-theme", theme);
  }

  private getColorTheme(): void {
    if (localStorage.getItem("user-theme")) {
      // @ts-ignore
      this.colorTheme = localStorage.getItem("user-theme");
    } else {
      this.colorTheme = "light-mode";
    }
  }
}
