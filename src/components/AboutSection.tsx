import { useRef, useEffect, useState } from "react";
import { Award, Briefcase, GraduationCap, MapPin, Code2 } from "lucide-react";

function useReveal(rootMargin = "-80px") {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin, threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return [ref, visible] as const;
}

export default function AboutSection() {
  const [ref, visible] = useReveal("-80px");

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-muted border-y-[3px] border-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-bold opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`mb-12 sm:mb-16 reveal-up${visible ? " in-view" : ""}`}>
            <span className="eyebrow bg-primary text-primary-foreground border-foreground">
              <span className="font-mono">01 //</span> About
            </span>
            <h2 className="font-display text-super mt-4">
              I MAKE PIXELS <br />
              <span className="text-stroke">BEHAVE.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-14 items-start">
            {/* Bio */}
            <div className={`space-y-6 reveal-up${visible ? " in-view" : ""}`} style={{ "--d": "0.1s" } as React.CSSProperties}>
              <div className="bold-card p-6 sm:p-8 bg-foreground text-background">
                <p className="font-mono text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(202 100% 65%)' }}>// THE STORY</p>
                <p className="text-lg sm:text-xl leading-relaxed font-medium">
                  Frontend developer obsessed with building <span className="bg-primary text-primary-foreground px-1.5 font-black">responsive</span>,{" "}
                  well-structured web applications. I write{" "}
                  <span className="bg-secondary text-secondary-foreground px-1.5 font-black">clean code</span>, integrate APIs
                  efficiently, and make sure the result feels smooth across every device.
                </p>
              </div>

              <div className="space-y-5 text-base sm:text-lg leading-relaxed font-medium">
                <p>
                  Currently at <span className="text-primary font-black">PentaValue</span> — owning end-to-end feature delivery,
                  optimizing app performance, and shipping in an Agile rhythm with a sharp team.
                </p>
                <p>
                  Comfortable across React, Next.js, TypeScript, and modern styling systems. Always learning, always sharpening
                  the craft.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 border-[2px] border-foreground bg-background">
                  <MapPin className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">LOCATION</p>
                    <p className="font-black uppercase">Egypt</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border-[2px] border-foreground bg-secondary text-secondary-foreground">
                  <Briefcase className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider opacity-80">STATUS</p>
                    <p className="font-black uppercase">@ PentaValue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards stack */}
            <div className="space-y-5">
              {/* Education */}
              <div className={`bold-card bold-card-hover p-5 sm:p-6 reveal-up${visible ? " in-view" : ""}`} style={{ "--d": "0.15s" } as React.CSSProperties}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary text-primary-foreground border-[3px] border-foreground shrink-0">
                    <GraduationCap className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">EDUCATION</p>
                    <h3 className="font-display text-lg sm:text-xl mt-0.5 leading-tight">
                      B.SC. COMPUTERS &amp; IT
                    </h3>
                    <p className="text-sm font-bold mt-1">Egyptian E-Learning University · 2020–2024</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="tag-chip tag-chip-primary">GPA 3.41 / B+</span>
                      <span className="tag-chip tag-chip-secondary">GRADUATION A+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graduation Project */}
              <div className={`bold-card bold-card-hover p-5 sm:p-6 reveal-up${visible ? " in-view" : ""}`} style={{ "--d": "0.22s" } as React.CSSProperties}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary text-secondary-foreground border-[3px] border-foreground shrink-0">
                    <Award className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">GRAD PROJECT</p>
                    <h3 className="font-display text-lg sm:text-xl mt-0.5 leading-tight">
                      ROADX
                    </h3>
                    <p className="text-sm font-bold mt-1">Full-stack demo project — A+ grade</p>
                  </div>
                </div>
              </div>

              {/* Current Role */}
              <div className={`bold-card bold-card-hover p-5 sm:p-6 bg-foreground text-background reveal-up${visible ? " in-view" : ""}`} style={{ "--d": "0.3s" } as React.CSSProperties}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary text-primary-foreground border-[3px] border-background shrink-0">
                    <Code2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">CURRENTLY</p>
                      <span className="tag-chip tag-chip-secondary border-background">
                        <span className="w-1.5 h-1.5 bg-secondary-foreground animate-pulse mr-1.5" />
                        LIVE
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl mt-0.5 leading-tight" style={{ color: 'hsl(202 100% 65%)' }}>
                      FRONTEND @ PENTAVALUE
                    </h3>
                    <p className="text-sm font-bold mt-1">Full-Time · Apr 2026 – Present</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
