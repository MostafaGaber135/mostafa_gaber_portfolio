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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 animate-slide-down ${
        scrolled
          ? "bg-background border-b-[3px] border-foreground shadow-bold py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo block */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); goToSection("#home"); }}
          className="group flex items-center gap-2"
          aria-label="Home"
        >
          <span className="flex items-center justify-center w-11 h-11 bg-primary text-primary-foreground border-[3px] border-foreground font-display text-xl shadow-bold group-hover:bg-secondary transition-colors">
            M
          </span>
          <span className="font-display text-lg hidden sm:inline">GABER.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); goToSection(link.href); }}
              className="nav-link text-xs font-black animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-10 h-10 bg-background border-[3px] border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            {theme === "dark"
              ? <Sun  className="w-5 h-5" />
              : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-10 h-10 bg-background border-[3px] border-foreground flex items-center justify-center active:translate-x-[2px] active:translate-y-[2px] transition-transform"
          >
            {theme === "dark"
              ? <Sun  className="w-5 h-5" />
              : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="w-10 h-10 bg-foreground text-background border-[3px] border-foreground flex items-center justify-center active:translate-x-[2px] active:translate-y-[2px] transition-transform"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "500px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="bold-card mt-3 mx-4 p-5 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); goToSection(link.href); }}
              className="flex items-center justify-between font-display uppercase tracking-wider text-lg py-3 border-b-[2px] border-foreground last:border-b-0 hover:text-primary transition-colors touch-manipulation"
            >
              <span>{link.name}</span>
              <span className="font-mono text-xs opacity-50">{String(i + 1).padStart(2, "0")}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
