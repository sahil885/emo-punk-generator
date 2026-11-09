"use client";

import { useEffect } from "react";
import { isStandalone, track, type BeforeInstallPromptEvent } from "@/lib/pwa";

// Chromium fires `beforeinstallprompt` once, early — often before the install
// card has mounted. Catch it here (this is in the root layout) and hand it to
// whoever asks later.
let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

export function getInstallPrompt(): BeforeInstallPromptEvent | null {
  return deferredPrompt;
}
export function clearInstallPrompt(): void {
  deferredPrompt = null;
  listeners.forEach((l) => l());
}
export function onInstallPromptChange(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * Site-wide PWA plumbing, mounted once in the root layout:
 * registers the service worker (production only), keeps the install event,
 * and reports installs and home-screen launches to GA4.
 */
export default function PwaSetup() {
  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      // Stop Chrome's own mini-infobar; we show the prompt at a better moment.
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      listeners.forEach((l) => l());
    };
    const onInstalled = () => {
      track("pwa_installed");
      clearInstallPrompt();
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    if (isStandalone()) {
      try {
        window.gtag?.("set", "user_properties", { display_mode: "standalone" });
      } catch {
        /* ignore */
      }
      track("pwa_launch");
    }

    // A service worker in dev caches nothing useful and makes HMR confusing.
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => {
          /* the site works the same without it */
        });
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return null;
}
