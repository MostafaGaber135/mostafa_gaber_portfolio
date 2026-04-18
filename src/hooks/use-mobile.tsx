import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile
 * ───────────
 * Reports whether the viewport is below the Tailwind `md` breakpoint.
 *
 * Previously this hook read `window.innerWidth` on mount and on every
 * matchMedia change. Reading `window.innerWidth` flushes pending style
 * invalidations and triggers a synchronous layout pass — exactly the
 * kind of forced reflow Lighthouse was attributing to React's commit
 * phase (55–86 ms on mobile).
 *
 * The fix is to rely entirely on MediaQueryList.matches, which is a
 * pre-computed boolean the browser exposes without touching layout.
 * We also defer the initial state read to `requestAnimationFrame` so
 * the first read happens after React has finished committing, never
 * inside the commit step itself.
 */
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const apply = (matches: boolean) => setIsMobile(matches);
    const onChange = (e: MediaQueryListEvent) => apply(e.matches);

    // Prime the state after the current commit finishes — never during it.
    const raf = window.requestAnimationFrame(() => apply(mql.matches));

    mql.addEventListener("change", onChange);
    return () => {
      window.cancelAnimationFrame(raf);
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return !!isMobile;
}
