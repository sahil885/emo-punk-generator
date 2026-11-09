// Browser-side helpers for the installable app (PWA). Client components only.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
  interface Navigator {
    /** iOS Safari: true when launched from the home screen. */
    standalone?: boolean;
  }
}

/** Chromium's install event — not in the TS DOM lib. */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

/** True when running as the installed app rather than in a browser tab. */
export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches === true ||
    window.navigator.standalone === true
  );
}

export type InstallPlatform =
  /** Chrome/Edge/Samsung on Android (and desktop): a real install button. */
  | "prompt"
  /** iPhone/iPad in Safari or another browser that can Add to Home Screen. */
  | "ios"
  /** Instagram/TikTok/Facebook etc. in-app browsers — can't install from here. */
  | "ios-in-app"
  | "unsupported";

/**
 * How this browser installs apps. "prompt" is only confirmed once
 * `beforeinstallprompt` fires, so callers treat it as "maybe" until then.
 */
export function installPlatform(): InstallPlatform {
  if (typeof navigator === "undefined") return "unsupported";
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac; touch support gives it away.
  const isIOS =
    /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (isIOS) {
    return /Instagram|FBAN|FBAV|FB_IAB|TikTok|musical_ly|Snapchat|Line\/|Twitter/i.test(ua)
      ? "ios-in-app"
      : "ios";
  }
  return "prompt";
}

/** GA4 event, if analytics is loaded. Never throws. */
export function track(event: string, params?: Record<string, unknown>): void {
  try {
    window.gtag?.("event", event, params ?? {});
  } catch {
    /* analytics must never break the app */
  }
}

const DISMISS_KEY = "tte_install_dismissed_at";
const DISMISS_DAYS = 21;

export function installDismissedRecently(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return Number.isFinite(at) && at > 0 && Date.now() - at < DISMISS_DAYS * 864e5;
  } catch {
    return false;
  }
}

export function dismissInstall(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    /* private mode — the card just comes back next visit */
  }
}
