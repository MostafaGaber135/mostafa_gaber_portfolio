import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-context";

const navLinks = [
  { name: "Home",       href: "#home" },
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects",   href: "#projects" },
  { name: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme }  = useTheme();

  const goToSection = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    setIsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        scrolled ? "glass-card py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); goToSection("#home"); }}
          className="text-xl font-bold gradient-text hover:scale-105 transition-transform"
        >
          MGA
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); goToSection(link.href); }}
              className="nav-link text-sm font-medium animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 hover:scale-110 active:scale-90 transition-all duration-200"
          >
            {theme === "dark"
              ? <Sun  className="w-5 h-5 text-foreground" />
              : <Moon className="w-5 h-5 text-foreground" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full bg-secondary active:scale-90 transition-transform"
          >
            {theme === "dark"
              ? <Sun  className="w-5 h-5 text-foreground" />
              : <Moon className="w-5 h-5 text-foreground" />}
          </button>

          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="text-foreground active:scale-90 transition-transform"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — CSS height transition, no framer */}
      <div
        id="mobile-menu"
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="glass-card mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); goToSection(link.href); }}
              className="text-foreground hover:text-primary transition-colors py-1.5 touch-manipulation"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
