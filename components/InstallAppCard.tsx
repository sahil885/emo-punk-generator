"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  dismissInstall,
  installDismissedRecently,
  installPlatform,
  isStandalone,
  track,
} from "@/lib/pwa";
import { clearInstallPrompt, getInstallPrompt, onInstallPromptChange } from "@/components/PwaSetup";

/**
 * "Add Text to Emo to your home screen" card, for phones and tablets.
 *
 * Android (Chrome/Edge/Samsung): a real Install button using the browser's own
 * prompt — it only appears once the browser says the site is installable.
 * iPhone/iPad: iOS has no install API, so the card shows the Share → Add to
 * Home Screen steps instead.
 *
 * Hidden when already running as the app, on desktop, in Instagram/TikTok-style
 * in-app browsers (they can't install), and for 3 weeks after "Not now".
 * Only mounted for signed-in users: on iOS the installed app keeps its own
 * cookies, so installing while signed in carries the session into the app.
 */
const noSubscribe = () => () => {};

/** Which install flow to offer here, or "none" to show nothing. */
function eligiblePlatform(): "prompt" | "ios" | "none" {
  // Phones and tablets only — "home screen" means nothing on a laptop.
  const touch = window.matchMedia?.("(pointer: coarse)").matches === true;
  if (!touch || isStandalone() || installDismissedRecently()) return "none";
  const p = installPlatform();
  return p === "prompt" || p === "ios" ? p : "none";
}

export default function InstallAppCard({
  context,
  className = "",
}: {
  context: "song" | "library";
  /** Spacing for the wrapper — applied only when the card actually shows. */
  className?: string;
}) {
  // Read from the browser after hydration (the server always sees "none"),
  // so server and client markup match and the card appears client-side only.
  const platform = useSyncExternalStore(noSubscribe, eligiblePlatform, () => "none" as const);
  const canPrompt = useSyncExternalStore(
    onInstallPromptChange,
    () => getInstallPrompt() !== null,
    () => false
  );
  const [hidden, setHidden] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const visible = !hidden && (platform === "ios" || (platform === "prompt" && canPrompt));

  useEffect(() => {
    if (visible) track("pwa_card_shown", { context, platform });
  }, [visible, context, platform]);

  if (!visible) return null;

  const install = async () => {
    const prompt = getInstallPrompt();
    if (!prompt) return;
    track("pwa_install_click", { context });
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    track("pwa_install_outcome", { context, outcome });
    // A prompt can only be used once.
    clearInstallPrompt();
    if (outcome === "accepted") setHidden(true);
  };

  const notNow = () => {
    dismissInstall();
    track("pwa_dismiss", { context, platform });
    setHidden(true);
  };

  // After reading the iOS steps there's no way to know if they installed, so
  // "Done" just puts the card away like "Not now" — counted separately.
  const doneWithSteps = () => {
    dismissInstall();
    track("pwa_ios_done", { context });
    setHidden(true);
  };
  const stepsOpen = platform === "ios" && showSteps;

  return (
    <div className={`rounded-2xl border border-[#00cfff]/30 bg-[#00cfff]/[0.06] p-4 ${className}`}>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny static icon */}
        <img
          src="/icons/icon-192.png"
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 flex-shrink-0 rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white leading-snug">
            Put Text to Emo on your home screen
          </p>
          <p className="text-xs text-white/50 leading-snug mt-0.5">
            Your songs one tap away — opens full screen, like an app.
          </p>
        </div>
      </div>

      {stepsOpen && (
        <ol className="mt-3 space-y-1.5 text-xs text-white/70 list-none">
          <li className="flex items-center gap-2">
            <span className="text-[#00cfff] font-bold">1</span>
            Tap
            <ShareIcon />
            <span>
              <b className="text-white">Share</b> in Safari&apos;s toolbar (or{" "}
              <b className="text-white">•••</b> then Share)
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00cfff] font-bold">2</span>
            Scroll and tap <b className="text-white">Add to Home Screen</b>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00cfff] font-bold">3</span>
            Tap <b className="text-white">Add</b>
          </li>
        </ol>
      )}

      <div className="mt-3 flex items-center gap-2">
        {platform === "prompt" ? (
          <button
            type="button"
            onClick={install}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
          >
            Install app
          </button>
        ) : (
          !showSteps && (
            <button
              type="button"
              onClick={() => {
                setShowSteps(true);
                track("pwa_ios_howto", { context });
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              Show me how
            </button>
          )
        )}
        <button
          type="button"
          onClick={stepsOpen ? doneWithSteps : notNow}
          className={`rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/50 hover:text-white/80 hover:border-white/25 transition-colors ${
            stepsOpen ? "flex-1" : ""
          }`}
        >
          {stepsOpen ? "Done" : "Not now"}
        </button>
      </div>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00cfff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Share icon"
      className="flex-shrink-0"
    >
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" />
    </svg>
  );
}
