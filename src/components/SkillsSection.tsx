import { useRef, useEffect, useState } from "react";

const coreSkills = [
  { name: "JavaScript (ES6+)", level: 92 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 90 },
  { name: "Next.js", level: 82 },
  { name: "HTML5 / Semantic HTML", level: 95 },
  { name: "CSS3 / Responsive Design", level: 90 },
  { name: "React Router", level: 88 },
  { name: "Context API", level: 85 },
];

const uiSkills = [
  { name: "Tailwind CSS", level: 95 },
  { name: "Material UI (MUI)", level: 82 },
  { name: "DaisyUI", level: 80 },
  { name: "Sass", level: 80 },
  { name: "Bootstrap", level: 78 },
];

const toolsSkills = [
  { name: "Git / GitHub", level: 90 },
  { name: "REST APIs", level: 88 },
  { name: "Vercel / Netlify", level: 87 },
  { name: "Firebase", level: 75 },
  { name: "Supabase", level: 75 },
  { name: "Postman", level: 80 },
];

const softSkills = [
  "Communication",
  "Problem Solving",
  "Collaboration",
  "Teamwork",
  "Time Management",
  "Adaptability",
];

function useReveal(rootMargin = "-60px") {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin, threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return [ref, visible] as const;
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "-20px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center gap-3">
        <span className="text-sm font-black uppercase tracking-wider truncate">{name}</span>
        <span className="font-mono text-xs font-bold shrink-0">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className={`skill-bar-fill${visible ? " animate-fill" : ""}`}
          style={{ "--skill-w": `${level}%`, "--d": `${delay}s` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [ref, visible] = useReveal("-80px");

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Header */}
        <div className={`mb-12 sm:mb-16 reveal-up${visible ? " in-view" : ""}`}>
          <span className="eyebrow bg-secondary text-secondary-foreground">
            <span className="font-mono">02 //</span> Arsenal
          </span>
          <h2 className="font-display text-super mt-4">
            TOOLS I USE TO <br />
            <span className="text-primary">SHIP THINGS.</span>
          </h2>
          <p className="text-base sm:text-lg font-medium mt-4 max-w-2xl">
            A focused, production-ready stack for building modern web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
          {/* Core & Frameworks */}
          <div className={`bold-card p-6 sm:p-7 reveal-up${visible ? " in-view" : ""}`} style={{ "--d": "0.1s" } as React.CSSProperties}>
            <div className="flex items-center justify-between mb-5 pb-4 border-b-[3px] border-foreground">
              <h3 className="font-display text-xl">CORE</h3>
              <span className="tag-chip tag-chip-primary">FRAMEWORKS</span>
            </div>
            <div className="space-y-4">
              {coreSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.06} />
              ))}
            </div>
          </div>

          {/* UI & Styling + Soft */}
          <div className={`bold-card p-6 sm:p-7 bg-foreground text-background reveal-up${visible ? " in-view" : ""}`} style={{ "--d": "0.18s" } as React.CSSProperties}>
            <div className="flex items-center justify-between mb-5 pb-4 border-b-[3px] border-background">
              <h3 className="font-display text-xl" style={{ color: 'hsl(202 100% 65%)' }}>UI</h3>
              <span className="tag-chip tag-chip-secondary">STYLING</span>
            </div>
            <div className="space-y-4 mb-7">
              {uiSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.06} />
              ))}
            </div>

            <div className="pt-5 border-t-[3px] border-background">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] mb-3 opacity-80">
                // SOFT SKILLS
              </h4>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`tag-chip border-background bg-transparent text-background hover:bg-background hover:text-foreground transition-colors cursor-default reveal-scale${visible ? " in-view" : ""}`}
                    style={{ "--d": `${0.3 + index * 0.05}s` } as React.CSSProperties}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & Languages */}
          <div className={`bold-card p-6 sm:p-7 reveal-up${visible ? " in-view" : ""}`} style={{ "--d": "0.26s" } as React.CSSProperties}>
            <div className="flex items-center justify-between mb-5 pb-4 border-b-[3px] border-foreground">
              <h3 className="font-display text-xl">TOOLS</h3>
              <span className="tag-chip tag-chip-surface">BACKEND</span>
            </div>
            <div className="space-y-4 mb-7">
              {toolsSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.06} />
              ))}
            </div>

            <div className="pt-5 border-t-[3px] border-foreground">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] mb-3 text-muted-foreground">
                // LANGUAGES
              </h4>
              <div className="space-y-3">
                {[
                  { lang: "Arabic", level: "NATIVE", width: 100, bg: "hsl(var(--primary))" },
                  { lang: "English", level: "B2 UPPER-INT", width: 70, bg: "hsl(var(--secondary))" },
                ].map(({ lang, level, width, bg }) => (
                  <div key={lang}>
                    <div className="flex justify-between gap-3 mb-1.5 items-center">
                      <span className="font-black uppercase tracking-wider text-sm">{lang}</span>
                      <span className="font-mono text-xs font-bold text-primary shrink-0">{level}</span>
                    </div>
                    <div className="skill-bar">
                      <SkillBar name="" level={width} delay={0.5} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
