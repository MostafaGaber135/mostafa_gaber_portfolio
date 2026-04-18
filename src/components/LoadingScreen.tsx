import { useEffect } from "react";

/**
 * LoadingScreen
 * ─────────────
 * Previously this component rendered a full-screen React overlay for ~700 ms
 * after mount. That overlay sat on top of the hero and delayed the Lighthouse
 * LCP measurement (Chrome only records LCP for elements visible to the user).
 *
 * We keep the static HTML splash in `index.html` for FOUC prevention before
 * React boots, and this component's only job is now to dispose of that splash
 * as soon as React takes over — it renders nothing itself, so the hero is
 * visible immediately and wins LCP on the first paint.
 */
export default function LoadingScreen() {
  useEffect(() => {
    const splash = document.getElementById("splash");
    if (!splash) return;

    // Fade the splash out in one frame, then remove it on animationend.
    // This avoids the abrupt "pop" that would happen if we detached it
    // synchronously while it was still fully opaque.
    splash.style.transition = "opacity 180ms ease-out";
    splash.style.opacity = "0";
    splash.style.pointerEvents = "none";

    const t = window.setTimeout(() => {
      splash.parentNode?.removeChild(splash);
    }, 200);

    return () => window.clearTimeout(t);
  }, []);

  return null;
}
