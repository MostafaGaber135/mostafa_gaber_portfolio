import { useEffect, useRef, useState } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

/* ── Typing roles ─────────────────────────────────────── */
const roles = ["Frontend Developer", "React Developer", "Next.js Developer", "UI Engineer"];

/* ── Animated counter (no framer) ────────────────────── */
function AnimatedCounter({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let n = 0;
    const step = Math.ceil(1800 / value);
    const t = setInterval(() => {
      n += 1; setCount(n);
      if (n >= value) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [value, start]);

  return (
    <span className="gradient-text font-bold text-3xl sm:text-4xl">
      {count}{suffix}
    </span>
  );
}

/* ── Word-by-word heading (CSS animations) ───────────── */
function AnimatedHeading() {
  const words = [
    { text: "Hi,",     gradient: false },
    { text: "I'm",     gradient: false },
    { text: "Mostafa", gradient: false },
    { text: "Gaber",   gradient: true  },
  ];

  return (
    <h1 className="font-bold leading-[1.08] mb-4 sm:mb-5 text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
      <span className="block">
        {words.slice(0, 2).map((w, i) => (
          <span
            key={w.text}
            className={`animate-word mr-[0.25em]${w.gradient ? " gradient-text" : ""}`}
            style={{ animationDelay: `${0.18 + i * 0.13}s` }}
          >
            {w.text}
          </span>
        ))}
      </span>
      <span className="block">
        {words.slice(2).map((w, i) => (
          <span
            key={w.text}
            className={`animate-word mr-[0.25em]${w.gradient ? " gradient-text" : ""}`}
            style={{ animationDelay: `${0.18 + (i + 2) * 0.13}s` }}
          >
            {w.text}
          </span>
        ))}
      </span>
    </h1>
  );
}

/* ── Stats ───────────────────────────────────────────── */
const stats = [
  { value: 5, label: "Experiences", suffix: "+" },
  { value: 3, label: "Projects",    suffix: "+" },
  { value: 1, label: "Year Active", suffix: "+" },
];

/* ── Main Section ─────────────────────────────────────── */
export default function HeroSection() {
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting,  setIsDeleting]  = useState(false);
  const [statsReady,  setStatsReady]  = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Typing animation */
  useEffect(() => {
    const current = roles[roleIndex];
    if (!isDeleting && displayText === current) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex(p => (p + 1) % roles.length);
      return;
    }
    const t = setTimeout(
      () => setDisplayText(p => isDeleting ? p.slice(0, -1) : current.slice(0, p.length + 1)),
      isDeleting ? 42 : 90,
    );
    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIndex]);

  /* Stats counter trigger */
  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-14 sm:py-16 md:py-20"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Animated orbs — CSS only */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-[5%] top-[10%] w-72 h-72 sm:w-[26rem] sm:h-[26rem] rounded-full blur-3xl animate-float"
          style={{ background: "hsl(var(--primary) / 0.18)" }}
        />
        <div
          className="absolute right-[5%] bottom-[10%] w-60 h-60 sm:w-80 sm:h-80 rounded-full blur-3xl animate-float"
          style={{ background: "hsl(220 84% 60% / 0.14)", animationDelay: "-3s", animationDuration: "9s" }}
        />
        <div
          className="absolute left-[40%] bottom-[20%] w-40 h-40 rounded-full blur-3xl animate-float"
          style={{ background: "hsl(var(--primary) / 0.10)", animationDelay: "-5s", animationDuration: "11s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div
            className="mb-6 sm:mb-8 animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border"
              style={{
                background:   "hsl(var(--primary) / 0.1)",
                borderColor:  "hsl(var(--primary) / 0.25)",
                color:        "hsl(var(--primary))",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Available for opportunities
            </span>
          </div>

          {/* Animated heading */}
          <AnimatedHeading />

          {/* Typing role */}
          <div
            className="mb-6 sm:mb-8 h-9 sm:h-11 flex items-center justify-center animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <span className="text-lg sm:text-xl md:text-2xl font-semibold" style={{ color: "hsl(var(--primary))" }}>
              {displayText}
              <span
                className="inline-block w-[2px] h-6 sm:h-7 ml-[2px] align-middle rounded-full animate-pulse"
                style={{ background: "hsl(var(--primary))" }}
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Description */}
          <p
            className="text-muted-foreground max-w-2xl mx-auto mb-9 sm:mb-11 text-sm sm:text-base md:text-lg px-2 sm:px-0 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.92s" }}
          >
            Frontend Developer focused on building responsive, well-structured web applications.
            Writing clean code, integrating APIs efficiently, and making sure the result feels smooth
            for users across all devices.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 max-w-sm sm:max-w-none mx-auto animate-fade-up"
            style={{ animationDelay: "1.05s" }}
          >
            <Button
              size="lg"
              className="group glow-effect w-full sm:w-auto font-semibold"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              View Projects
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
            </Button>
            <Button
              asChild variant="outline" size="lg"
              className="w-full sm:w-auto font-semibold"
              style={{ borderColor: "hsl(var(--primary) / 0.4)" }}
            >
              <a href="/Mostafa Gaber Ahmed CV.pdf" download className="flex items-center justify-center">
                <Download className="mr-2 w-4 h-4" aria-hidden="true" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Social links — CSS hover */}
          <div
            className="flex items-center justify-center gap-4 flex-wrap mb-14 sm:mb-16 animate-fade-in"
            style={{ animationDelay: "1.18s" }}
          >
            {[
              { href: "https://github.com/MostafaGaber135",           icon: Github,   label: "GitHub"   },
              { href: "https://www.linkedin.com/in/mostafagaber135/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:mostafagaber1234560@gmail.com",          icon: Mail,     label: "Email"    },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border/50 bg-card/80 backdrop-blur-xl transition-all duration-200 hover:scale-110 hover:border-primary/40 hover:bg-primary/10 active:scale-95"
              >
                <Icon className="w-5 h-5 transition-colors" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xs sm:max-w-md mx-auto">
            {stats.map(({ value, label, suffix }, i) => (
              <div
                key={label}
                className="glass-card p-3 sm:p-4 text-center animate-scale-in"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <AnimatedCounter value={value} suffix={suffix} start={statsReady} />
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ArrowDown className="w-5 h-5 text-muted-foreground opacity-50" />
      </div>
    </section>
  );
}
