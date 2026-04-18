import { useEffect, useRef, useState } from "react";

/**
 * Lightweight replacement for framer-motion's useInView.
 * Uses IntersectionObserver — zero forced reflows.
 */
export function useIntersect(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el); // once only
      }
    }, { threshold: 0.1, rootMargin: "-60px", ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
