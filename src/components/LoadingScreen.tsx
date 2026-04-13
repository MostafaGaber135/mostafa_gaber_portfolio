import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading,  setFading]  = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setFading(true), 2000);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2500);
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
      <div className="text-center">
        {/* Logo */}
        <div
          className="text-4xl md:text-5xl font-bold gradient-text mb-4 animate-fade-up"
          style={{ animationDuration: "0.5s" }}
        >
          MGA
        </div>

        {/* Dots */}
        <div
          className="flex items-center justify-center gap-1 animate-fade-in"
          style={{ animationDelay: "0.3s", animationDuration: "0.4s" }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
