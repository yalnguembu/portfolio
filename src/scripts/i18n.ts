/**
 * Internationalization (i18n)
 * Simple FR/EN translation system using data attributes and localStorage
 */

const LANG_KEY = "nguembu-lang";
const LANGUAGES = { FR: "fr", EN: "en" } as const;
type Lang = (typeof LANGUAGES)[keyof typeof LANGUAGES];

class I18nManager {
  private currentLang: Lang;

  constructor() {
    this.currentLang = (this.getStoredLanguage() ??
      this.detectBrowserLanguage()) as Lang;
    this.init();
  }

  private init(): void {
    localStorage.setItem(LANG_KEY, this.currentLang);
    this.applyLanguage();
    this.attachListeners();
  }

  private getStoredLanguage(): string | null {
    return localStorage.getItem(LANG_KEY);
  }

  private detectBrowserLanguage(): Lang {
    const browserLang = navigator.language.split("-")[0].toLowerCase();
    return browserLang === LANGUAGES.FR ? LANGUAGES.FR : LANGUAGES.EN;
  }

  setLanguage(lang: Lang): void {
    if (lang !== this.currentLang) {
      this.currentLang = lang;
      localStorage.setItem(LANG_KEY, lang);
      this.applyLanguage();
      this.updateUI();
    }
  }

  private applyLanguage(): void {
    document
      .querySelectorAll<HTMLElement>("[data-fr][data-en]")
      .forEach((el) => {
        const content =
          this.currentLang === LANGUAGES.FR
            ? el.getAttribute("data-fr")
            : el.getAttribute("data-en");
        if (content !== null) el.textContent = content;
      });
    document.documentElement.setAttribute("data-lang", this.currentLang);
  }

  private updateUI(): void {
    document.querySelectorAll<HTMLElement>(".lang-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-lang") === this.currentLang,
      );
    });
  }

  private attachListeners(): void {
    document.querySelectorAll<HTMLElement>(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = btn.getAttribute("data-lang") as Lang | null;
        if (lang) this.setLanguage(lang);
      });
    });
  }

  getCurrentLanguage(): Lang {
    return this.currentLang;
  }

  // Simple translation helper for programmatic use
  t(_key: string, defaultValue = ""): string {
    return defaultValue;
  }
}

let i18nManager: I18nManager | undefined;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    i18nManager = new I18nManager();
  });
} else {
  i18nManager = new I18nManager();
}

export { i18nManager, I18nManager };
export type { Lang };
