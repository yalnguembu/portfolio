/**
 * Main TypeScript - Page initialization, reveal animations, navigation
 */

import "./i18n.ts";
import "./pwa.ts";
import { themeManager } from "./theme.ts";

/**
 * Intersection Observer for reveal animations
 */
class RevealAnimations {
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    const options: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          this.observer!.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll(".reveal").forEach((el) => {
      this.observer!.observe(el);
    });
  }
}

/**
 * Navigation & Hamburger Menu
 */
class Navigation {
  private readonly hamburger: HTMLElement | null;
  private readonly navLinks: HTMLElement | null;

  constructor() {
    this.hamburger = document.querySelector<HTMLElement>(".hamburger");
    this.navLinks = document.querySelector<HTMLElement>(".nav-links");
    this.init();
  }

  private init(): void {
    if (!this.hamburger) return;

    this.hamburger.addEventListener("click", () => {
      this.toggleMenu();
    });

    this.navLinks?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMenu();
      });
    });

    document.addEventListener("click", (e) => {
      if (!(e.target as Element).closest("nav")) {
        this.closeMenu();
      }
    });
  }

  private toggleMenu(): void {
    this.navLinks?.classList.toggle("active");
    this.hamburger?.classList.toggle("active");
    this.hamburger?.setAttribute(
      "aria-expanded",
      this.hamburger.classList.contains("active") ? "true" : "false",
    );
  }

  private closeMenu(): void {
    this.navLinks?.classList.remove("active");
    this.hamburger?.classList.remove("active");
    this.hamburger?.setAttribute("aria-expanded", "false");
  }
}

/**
 * Theme Toggle Button Handler
 */
class ThemeToggleHandler {
  private readonly button: HTMLElement | null;

  constructor() {
    this.button = document.querySelector<HTMLElement>(".theme-toggle");
    this.init();
  }

  private init(): void {
    if (!this.button) return;

    this.button.addEventListener("click", () => {
      themeManager?.toggle();
    });

    const currentTheme = localStorage.getItem("nguembu-theme") ?? "system";
    this.button.setAttribute(
      "aria-label",
      `Toggle theme (current: ${currentTheme})`,
    );
  }
}

/**
 * Smooth scroll behavior
 */
function initSmoothScroll(): void {
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        if (!href) return;
        const target = document.querySelector<HTMLElement>(href);
        target?.scrollIntoView({ behavior: "smooth" });
      });
    });
}

/**
 * Navbar scroll effects
 */
function initNavbarEffects(): void {
  const nav = document.querySelector<HTMLElement>("nav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    nav.style.boxShadow = window.scrollY > 10 ? "var(--shadow-md)" : "none";
  });
}

/**
 * Skip link focus management
 */
function initSkipLink(): void {
  const skipLink = document.querySelector<HTMLElement>(".skip-link");
  if (!skipLink) return;

  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector<HTMLElement>("main");
    if (target) {
      target.focus();
      target.scrollIntoView();
    }
  });
}

/**
 * Initialize all components
 */
function init(): void {
  new RevealAnimations();
  new Navigation();
  new ThemeToggleHandler();
  initSmoothScroll();
  initNavbarEffects();
  initSkipLink();

  console.log("nguembu.cloud initialized");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export { RevealAnimations, Navigation };
