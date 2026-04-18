import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProviderContext, type Theme } from "./theme-context";

/**
 * Read the initial theme synchronously so first render matches the
 * class already applied by the inline <script> in index.html.
 * This avoids a blocking first-render guard (null until mount) that
 * was delaying FCP/LCP.
 */
function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  if (document.documentElement.classList.contains("dark")) return "dark";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* localStorage blocked — fall through */
  }
  return "light";
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return <ThemeProviderContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeProviderContext.Provider>;
}
