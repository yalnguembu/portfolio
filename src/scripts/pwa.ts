/**
 * PWA Service Worker Registration & Online/Offline Detection
 */

class PWAManager {
  constructor() {
    void this.init();
  }

  private async init(): Promise<void> {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered");
      } catch (error) {
        console.log("Service Worker registration failed:", error);
      }
    }

    window.addEventListener("online", () => {
      this.handleOnline();
    });
    window.addEventListener("offline", () => {
      this.handleOffline();
    });

    if (navigator.onLine) {
      this.handleOnline();
    } else {
      this.handleOffline();
    }
  }

  private handleOnline(): void {
    console.log("Online");
    this.removeOfflineIndicator();
  }

  private handleOffline(): void {
    console.log("Offline");
    this.showOfflineIndicator();
  }

  private showOfflineIndicator(): void {
    const indicator = document.querySelector<HTMLElement>(".offline-indicator");
    if (indicator) indicator.style.display = "block";
  }

  private removeOfflineIndicator(): void {
    const indicator = document.querySelector<HTMLElement>(".offline-indicator");
    if (indicator) indicator.style.display = "none";
  }
}

new PWAManager();

export { PWAManager };
