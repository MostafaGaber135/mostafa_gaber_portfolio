import { useEffect, useRef, useState } from "react";

/**
 * ScrollProgressBar
 * ─────────────────
 * Draws a thin progress bar at the top of the viewport that tracks
 * how far the user has scrolled through the document.
 *
 * ── Performance notes ───────────────────────────────────────────
 * Previously this component read `document.documentElement.scrollHeight`
 * on every scroll event. Reading that property forces the browser
 * to flush any pending layout invalidations before it can return a
 * value — a classic forced reflow, which Lighthouse caught as a
 * 63–73ms synchronous layout on mobile.
 *
 * The fix is twofold:
 *   1. Cache `scrollHeight` outside the scroll handler and refresh
 *      it only when the viewport or DOM size actually changes
 *      (resize + ResizeObserver on <body>). The scroll handler
 *      then only reads `window.scrollY`, which is lock-free.
 *   2. Coalesce scroll events into a single rAF per frame so the
 *      DOM write (the transform) happens in the paint step, not
 *      on every wheel tick.
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide during loading screen (now much shorter — see LoadingScreen)
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let totalHeight = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    let ticking = false;

    const refreshTotal = () => {
      totalHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };

    const paint = () => {
      ticking = false;
      if (!barRef.current) return;
      const ratio = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      barRef.current.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    };

    // Recompute the total whenever the viewport or document size changes.
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refreshTotal, { passive: true });

    const ro = new ResizeObserver(refreshTotal);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refreshTotal);
      ro.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
