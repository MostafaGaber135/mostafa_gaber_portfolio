import { useEffect, useRef, useState } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide during loading screen (now much shorter — see LoadingScreen)
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      barRef.current.style.transform = `scaleX(${scrolled / total})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
