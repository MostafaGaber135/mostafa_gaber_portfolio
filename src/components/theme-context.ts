import { createContext, useContext } from "react";

export type Theme = "dark" | "light";

export type ThemeProviderContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
