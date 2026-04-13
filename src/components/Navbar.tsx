import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-context";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const goToSection = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }

    if (el) {
      Promise.resolve().then(() => {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    setIsOpen(false);
  };

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-card py-3" : "bg-transparent py-5"}`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goToSection("#home");
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            goToSection("#home");
          }}
          className="text-xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MGA
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                goToSection(link.href);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                goToSection(link.href);
              }}
              className="nav-link text-sm font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}

          <motion.button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-5 h-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-5 h-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <motion.button onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="p-2 rounded-full bg-secondary" whileTap={{ scale: 0.9 }}>
            {theme === "dark" ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
          </motion.button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            onTouchEnd={(e) => {
              e.preventDefault();
              setIsOpen((v) => !v);
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="text-foreground touch-manipulation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-menu"
          className="md:hidden glass-card mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(link.href);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    goToSection(link.href);
                  }}
                  className="text-foreground hover:text-primary transition-colors py-2 touch-manipulation"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
