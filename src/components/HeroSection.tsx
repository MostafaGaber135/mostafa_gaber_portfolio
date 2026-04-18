import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

/* ── Typing roles ─────────────────────────────────────── */
const roles = ["FRONTEND DEVELOPER", "REACT ENGINEER", "NEXT.JS BUILDER", "UI CRAFTSMAN"];

/* ── Animated counter ─────────────────────────────────── */
function AnimatedCounter({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let n = 0;
    const step = Math.ceil(1600 / value);
    const t = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= value) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [value, start]);

  return (
    <span className="font-display text-5xl sm:text-6xl md:text-7xl text-primary leading-none">
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 5, label: "Experiences", suffix: "+" },
  { value: 3, label: "Projects",    suffix: "+" },
  { value: 1, label: "Year Active", suffix: "+" },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [statsReady, setStatsReady] = useState(false);
  /*
   * The typing animation re-renders every ~40-80ms, which on mobile can
   * compete with the critical paint / hydration work and inflate TBT.
   * We keep it idle until the browser is genuinely idle post-LCP.
   */
  const [typingReady, setTypingReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Typing animation — only engages after the page is idle */
  useEffect(() => {
    if (!typingReady) return;
    const current = roles[roleIndex];
    if (!isDeleting && displayText === current) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((p) => (p + 1) % roles.length);
      return;
    }
    const t = setTimeout(
      () => setDisplayText((p) => (isDeleting ? p.slice(0, -1) : current.slice(0, p.length + 1))),
      isDeleting ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIndex, typingReady]);

  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), 900);
    // Kick the typing animation off during idle time, with a generous
    // setTimeout fallback for browsers that lack requestIdleCallback.
    const schedule =
      (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const idleId = schedule(() => setTypingReady(true), { timeout: 2000 });
    return () => {
      clearTimeout(t);
      const cancel =
        (window as unknown as { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback ?? window.clearTimeout;
      cancel(idleId as number);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 border-b-[3px] border-foreground"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-bold opacity-60 pointer-events-none" aria-hidden="true" />

      {/* Diagonal stripe accents */}
      <div
        className="absolute -right-24 top-20 w-72 h-12 bg-primary border-[3px] border-foreground -rotate-6 hidden md:block pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 bottom-32 w-72 h-8 bg-secondary border-[3px] border-foreground rotate-3 hidden md:block pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl">
          {/* Status badge */}
          <div className="mb-6 sm:mb-8 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <span className="eyebrow bg-secondary text-secondary-foreground">
              <span className="w-2 h-2 rounded-full bg-secondary-foreground animate-pulse" aria-hidden="true" />
              Available for hire · 2026
            </span>
          </div>

          {/*
           * Massive display heading — LCP element.
           * We intentionally avoid opacity-based entrance animations here so the
           * browser paints the hero text on the first frame (LCP ≈ TTFB).
           * The subtle slide/skew reveal is still applied via `animate-rise-word`,
           * which animates transform only (opacity stays at 1).
           */}
          <h1 className="display-hero mb-6 sm:mb-8 text-[clamp(3rem,12vw,10rem)]">
            <span className="block animate-rise-word" style={{ animationDelay: "0.02s" }}>
              MOSTAFA
            </span>
            <span className="block animate-rise-word text-primary" style={{ animationDelay: "0.06s" }}>
              GABER
            </span>
            <span className="block animate-rise-word text-stroke" style={{ animationDelay: "0.1s" }}>
              AHMED.
            </span>
          </h1>

          {/* Role + description row */}
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start mb-10 sm:mb-12">
            {/* Typing role block */}
            <div
              className="bold-card bg-foreground text-background px-5 py-4 animate-fade-up inline-block"
              style={{ animationDelay: "0.55s", boxShadow: "var(--shadow-sharp-primary)" }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] mb-1 opacity-70">// ROLE</p>
              <p className="font-display text-xl sm:text-2xl md:text-3xl flex items-center" style={{ color: 'hsl(202 100% 65%)' }}>
                <span>{displayText || "\u00A0"}</span>
                <span
                  className="inline-block w-3 h-6 sm:h-7 ml-1 shrink-0 animate-blink"
                  aria-hidden="true"
                  style={{ contain: 'layout', backgroundColor: 'hsl(202 100% 65%)' }}
                />
              </p>
            </div>

            {/*
             * Description — often detected by Lighthouse as the LCP element.
             * Render with opacity 1 immediately (no fade-up) so LCP fires on the
             * first paint. Container-level entrance motion is not needed here.
             */}
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-xl"
            >
              I build <span className="bg-primary text-primary-foreground px-1.5 font-black">fast</span>,{" "}
              <span className="bg-secondary text-secondary-foreground px-1.5 font-black">accessible</span>, and
              unapologetically <span className="underline decoration-[4px] decoration-primary underline-offset-4">bold</span> web
              interfaces. Currently shipping production frontends at PentaValue.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14 sm:mb-16 animate-fade-up"
            style={{ animationDelay: "0.85s" }}
          >
            <Button
              size="lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              See the work
              <ArrowRight className="ml-1 w-5 h-5" aria-hidden="true" />
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/Mostafa Gaber Ahmed CV.pdf" download className="flex items-center justify-center">
                <Download className="mr-1 w-5 h-5" aria-hidden="true" />
                Download CV
              </a>
            </Button>

            {/* Social rail */}
            <div className="flex items-center gap-2 sm:ml-4">
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
                  className="inline-flex items-center justify-center w-11 h-11 border-[3px] border-foreground bg-background hover:bg-primary hover:text-primary-foreground transition-colors duration-200 active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 border-[3px] border-foreground bg-background shadow-bold-lg">
            {stats.map(({ value, label, suffix }, i) => (
              <div
                key={label}
                className={`p-5 sm:p-7 text-center animate-scale-in ${
                  i < stats.length - 1 ? "border-r-[3px] border-foreground" : ""
                } ${i === 1 ? "bg-foreground text-background" : ""}`}
                style={{ animationDelay: `${0.95 + i * 0.08}s` }}
              >
                <AnimatedCounter value={value} suffix={suffix} start={statsReady} />
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-black mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-foreground text-background border-t-[3px] border-foreground overflow-hidden h-10 flex items-center"
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap animate-marquee font-display text-sm uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="flex shrink-0">
              {["React", "Next.js", "TypeScript", "Tailwind", "Node", "Supabase", "Figma", "Git"].map((w) => (
                <span key={`${r}-${w}`} className="px-6 flex items-center gap-6">
                  {w}
                  <span className="w-2 h-2 bg-primary" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
