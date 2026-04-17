import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading,  setFading]  = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setFading(true), 800);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";

      // Remove the static HTML splash from DOM so it never blocks clicks.
      const splash = document.getElementById("splash");
      if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      style={{
        transition: "opacity 0.5s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-label="Loading"
      role="status"
    >
      <div className="bg-grid-bold absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative text-center">
        <div
          className="inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 bg-primary text-primary-foreground border-[4px] border-foreground font-display text-5xl md:text-6xl shadow-bold-lg animate-scale-in"
          style={{ animationDuration: "0.5s" }}
        >
          MGA
        </div>

        <div
          className="mt-6 flex items-center justify-center gap-1 animate-fade-in"
          style={{ animationDelay: "0.3s", animationDuration: "0.4s" }}
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-foreground animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <p
          className="font-mono text-xs uppercase tracking-[0.4em] mt-5 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          LOADING PORTFOLIO
        </p>
      </div>
    </div>
  );
}
