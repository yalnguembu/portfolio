/**
 * Theme Management
 * Handles light/dark/system theme switching with localStorage persistence
 */

const THEME_KEY = "nguembu-theme";
const THEMES = { LIGHT: "light", DARK: "dark", SYSTEM: "system" } as const;
type Theme = (typeof THEMES)[keyof typeof THEMES];

class ThemeManager {
  private readonly htmlElement: HTMLElement;
  private readonly prefersDark: MediaQueryList;

  constructor() {
    this.htmlElement = document.documentElement;
    this.prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    this.init();
  }

  private init(): void {
    const storedTheme = (localStorage.getItem(THEME_KEY) ??
      THEMES.SYSTEM) as Theme;
    this.setTheme(storedTheme);

    this.prefersDark.addEventListener("change", () => {
      if (this.getStoredTheme() === THEMES.SYSTEM) {
        this.updateSystemTheme();
      }
    });
  }

  getStoredTheme(): Theme {
    return (localStorage.getItem(THEME_KEY) ?? THEMES.SYSTEM) as Theme;
  }

  setTheme(theme: Theme): void {
    localStorage.setItem(THEME_KEY, theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    if (theme === THEMES.SYSTEM) {
      this.updateSystemTheme();
    } else {
      this.updateThemeAttribute(theme);
    }
  }

  private updateSystemTheme(): void {
    const isDark = this.prefersDark.matches;
    this.updateThemeAttribute(isDark ? THEMES.DARK : THEMES.LIGHT);
  }

  private updateThemeAttribute(theme: Theme): void {
    this.htmlElement.classList.add("theme-switching");

    if (theme === THEMES.LIGHT) {
      this.htmlElement.removeAttribute("data-theme");
    } else if (theme === THEMES.DARK) {
      this.htmlElement.setAttribute("data-theme", THEMES.DARK);
    }

    setTimeout(() => {
      this.htmlElement.classList.remove("theme-switching");
    }, 300);
  }

  toggle(): void {
    const current = this.getStoredTheme();
    let next: Theme = THEMES.LIGHT;

    if (current === THEMES.LIGHT) {
      next = THEMES.DARK;
    } else if (current === THEMES.DARK) {
      next = THEMES.SYSTEM;
    }

    this.setTheme(next);
    this.updateUI();
  }

  updateUI(): void {
    const themeToggle = document.querySelector<HTMLElement>(".theme-toggle");
    if (themeToggle) {
      const currentTheme = this.getStoredTheme();
      const icon = themeToggle.querySelector<HTMLElement>("svg") ?? themeToggle;

      icon.classList.add("scale-up", "visible");
      setTimeout(() => {
        icon.classList.remove("scale-up", "visible");
      }, 400);

      themeToggle.setAttribute("aria-label", `Current theme: ${currentTheme}`);
    }
  }

  isDark(): boolean {
    const theme = this.getStoredTheme();
    if (theme === THEMES.SYSTEM) return this.prefersDark.matches;
    return theme === THEMES.DARK;
  }
}

let themeManager: ThemeManager | undefined;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    themeManager = new ThemeManager();
  });
} else {
  themeManager = new ThemeManager();
}

export { themeManager, ThemeManager };
export type { Theme };
