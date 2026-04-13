import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

/* ── Typing roles ─────────────────────────────────────── */
const roles = [
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "UI Engineer",
];

/* ── Word-by-word animated heading ───────────────────── */
function AnimatedHeading() {
  const line1 = ["Hi,", "I'm"];
  const line2 = ["Mostafa", "Gaber"];

  const wordVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.18 + i * 0.13,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <h1 className="font-bold leading-[1.08] mb-4 sm:mb-5 text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
      <span className="block">
        {line1.map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block">
        {line2.map((word, i) => (
          <motion.span
            key={word}
            custom={line1.length + i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className={`inline-block mr-[0.25em] ${i === line2.length - 1 ? "gradient-text" : ""}`}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

/* ── Magnetic wrapper ─────────────────────────────────── */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 15 });
  const sy = useSpring(y, { stiffness: 160, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.32);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}

/* ── Animated counter ─────────────────────────────────── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let n = 0;
    const step = Math.ceil(1800 / value);
    const t = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= value) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [value]);

  return (
    <span className="gradient-text font-bold text-3xl sm:text-4xl">
      {count}{suffix}
    </span>
  );
}

/* ── Main Section ─────────────────────────────────────── */
const stats = [
  { value: 5, label: "Experiences", suffix: "+" },
  { value: 3, label: "Projects", suffix: "+" },
  { value: 1, label: "Year Active", suffix: "+" },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [statsReady, setStatsReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  /* Typing animation */
  useEffect(() => {
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
      () => setDisplayText((p) => isDeleting ? p.slice(0, -1) : current.slice(0, p.length + 1)),
      isDeleting ? 42 : 90,
    );
    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIndex]);

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

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute left-[5%] top-[10%] w-72 h-72 sm:w-[26rem] sm:h-[26rem] rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.18)" }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[5%] bottom-[10%] w-60 h-60 sm:w-80 sm:h-80 rounded-full blur-3xl"
          style={{ background: "hsl(220 84% 60% / 0.14)" }}
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[40%] bottom-[20%] w-40 h-40 rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.10)" }}
          animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border"
              style={{
                background: "hsl(var(--primary) / 0.1)",
                borderColor: "hsl(var(--primary) / 0.25)",
                color: "hsl(var(--primary))",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Animated heading */}
          <AnimatedHeading />

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-6 sm:mb-8 h-9 sm:h-11 flex items-center justify-center"
          >
            <span className="text-lg sm:text-xl md:text-2xl font-semibold" style={{ color: "hsl(var(--primary))" }}>
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.75, repeat: Infinity }}
                className="inline-block w-[2px] h-6 sm:h-7 ml-[2px] align-middle rounded-full"
                style={{ background: "hsl(var(--primary))" }}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.92, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground max-w-2xl mx-auto mb-9 sm:mb-11 text-sm sm:text-base md:text-lg px-2 sm:px-0 leading-relaxed"
          >
            Frontend Developer focused on building responsive, well-structured web applications.
            Writing clean code, integrating APIs efficiently, and making sure the result feels smooth
            for users across all devices.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 max-w-sm sm:max-w-none mx-auto"
          >
            <Button
              size="lg"
              className="group glow-effect w-full sm:w-auto font-semibold"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              View Projects
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              asChild variant="outline" size="lg"
              className="w-full sm:w-auto font-semibold"
              style={{ borderColor: "hsl(var(--primary) / 0.4)" }}
            >
              <a href="/Mostafa Gaber Ahmed CV.pdf" download className="flex items-center justify-center">
                <Download className="mr-2 w-4 h-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          {/* Social links — magnetic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.18, duration: 0.6 }}
            className="flex items-center justify-center gap-4 flex-wrap mb-14 sm:mb-16"
          >
            {[
              { href: "https://github.com/MostafaGaber135", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/mostafagaber135/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:mostafagaber1234560@gmail.com", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <Magnetic key={label}>
                <motion.a
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border/50 bg-card/80 backdrop-blur-xl transition-colors group hover:border-primary/40"
                  whileHover={{ scale: 1.12, backgroundColor: "hsl(var(--primary) / 0.12)" }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 transition-colors group-hover:text-primary" />
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xs sm:max-w-md mx-auto">
            {stats.map(({ value, label, suffix }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30, scale: 0.85 }}
                animate={statsReady ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card p-3 sm:p-4 text-center"
              >
                <AnimatedCounter value={value} suffix={suffix} />
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug font-medium">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        aria-hidden="true"
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground opacity-50" />
      </motion.div>
    </section>
  );
}
