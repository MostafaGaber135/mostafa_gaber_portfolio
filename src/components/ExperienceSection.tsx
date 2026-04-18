import { Briefcase, Calendar, ExternalLink, MapPin } from "lucide-react";
import { useIntersect } from "@/hooks/use-intersect";

const experiences = [
  {
    title: "Frontend Developer",
    company: "PentaValue",
    type: "Full-Time",
    period: "Apr 2026 – Present",
    location: "Egypt",
    current: true,
    description:
      "Develop and ship production-ready frontend components in a fast-paced Agile environment, contributing to client-facing products across multiple business verticals.",
    bullets: [
      "Own end-to-end frontend feature delivery from technical design through code review to deployment",
      "Optimize performance through code splitting, lazy loading, and caching strategies",
      "Implement responsive, accessible UI layouts supporting 3+ screen breakpoints with modular component architecture",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Agile", "Git"],
  },
  {
    title: "Frontend Developer",
    company: "Beetleware",
    type: "Internship",
    period: "Nov 2025 – Mar 2026",
    location: "Egypt",
    description:
      "Developed 10+ reusable UI components using React and Tailwind CSS within a modular architecture, translated Figma designs into pixel-perfect interfaces.",
    bullets: [
      "Developed 10+ reusable UI components using React and Tailwind CSS",
      "Translated Figma design mockups into pixel-perfect, accessible interfaces",
      "Delivered features on time within sprint cycles, collaborating closely with the team",
    ],
    technologies: ["React", "Tailwind CSS", "Figma", "Git", "Semantic HTML"],
  },
  {
    title: "Front-End & Cross-Platform Mobile Developer",
    company: "ITI – Information Technology Institute",
    type: "Intensive Training",
    period: "Dec 2024 – Apr 2025",
    location: "Egypt",
    description:
      "Completed a 4-month intensive program covering advanced React patterns, Next.js (SSR/SSG), TypeScript, and cross-platform mobile development fundamentals.",
    bullets: [
      "Advanced React patterns, Next.js (SSR/SSG), TypeScript, and mobile dev fundamentals",
      "Built multiple full-stack projects with component-driven architecture and Context API",
      "Gained hands-on experience with Git workflows and CI/CD basics",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Git", "CI/CD"],
  },
  {
    title: "Frontend Developer",
    company: "PassAhead",
    type: "Freelance",
    period: "2024",
    location: "Remote",
    description:
      "Architected and developed a full-scale exam preparation platform using Next.js and Tailwind CSS, serving 100+ active users with a bank of 1,000+ questions.",
    bullets: [
      "Serving 100+ active users with a bank of 1,000+ questions",
      "Achieved 30% reduction in initial page load time via lazy loading and API pagination",
      "Designed fully responsive, mobile-first interface ensuring consistent UX across all viewports",
    ],
    technologies: ["Next.js", "Tailwind CSS", "REST APIs", "JavaScript (ES6+)", "Git"],
    link: "https://passahead.com/",
  },
];

const activities = [
  { title: "Public Relations Member", organization: "VOP", period: "2022 – 2024" },
  { title: "IT Member", organization: "Enactus EELU", period: "2021 – 2023" },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const [ref, isVisible] = useIntersect({ rootMargin: "-60px" });

  const accent = exp.current ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`grid md:grid-cols-[140px_1fr] gap-4 md:gap-8 mb-6 reveal${isVisible ? " is-visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Index + period */}
      <div className="flex md:flex-col gap-3 md:gap-2 items-center md:items-start md:pt-1">
        <div className={`w-14 h-14 md:w-20 md:h-20 ${accent} border-[3px] border-foreground flex items-center justify-center font-display text-xl md:text-3xl shadow-bold`}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex-1 md:flex-initial">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">PERIOD</p>
          <p className="font-black text-sm">{exp.period}</p>
        </div>
      </div>

      {/* Card */}
      <div className="bold-card bold-card-hover p-5 sm:p-7">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`tag-chip ${exp.current ? "tag-chip-secondary" : "tag-chip-primary"}`}>
                {exp.current && <span className="w-1.5 h-1.5 bg-current animate-pulse mr-1" />}
                {exp.current ? "CURRENT" : exp.type.toUpperCase()}
              </span>
              <span className="tag-chip">
                <MapPin className="w-3 h-3 mr-1" />
                {exp.location.toUpperCase()}
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl leading-tight">{exp.title}</h3>
            <p className="font-display text-base sm:text-lg text-primary mt-0.5">@ {exp.company}</p>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground shrink-0">
            <Calendar className="w-4 h-4" />
            {exp.period}
          </div>
        </div>

        <p className="text-sm sm:text-base font-medium leading-relaxed mt-3">{exp.description}</p>

        {/* Bullets */}
        <ul className="mt-4 space-y-2">
          {exp.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm font-medium leading-relaxed">
              <span className="w-3 h-3 bg-primary border-[2px] border-foreground shrink-0 mt-1.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t-[2px] border-foreground">
          {exp.technologies.map((tech) => (
            <span key={tech} className="tag-chip">{tech}</span>
          ))}
        </div>

        {exp.link && (
          <a
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 font-display text-sm uppercase tracking-wider underline decoration-[3px] decoration-primary underline-offset-4 hover:decoration-secondary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Site
          </a>
        )}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [ref, isVisible] = useIntersect({ rootMargin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-muted border-y-[3px] border-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-bold opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative">
        <div className={`mb-12 sm:mb-16 reveal${isVisible ? " is-visible" : ""}`}>
          <span className="eyebrow bg-foreground text-background border-foreground">
            <span className="font-mono text-secondary">03 //</span> Track Record
          </span>
          <h2 className="font-display text-super mt-4">
            WHERE I&apos;VE <br />
            <span className="text-primary">SHIPPED.</span>
          </h2>
          <p className="text-base sm:text-lg font-medium mt-4 max-w-2xl">
            Real products, real teams, real deadlines. A track record of building, learning, and delivering.
          </p>
        </div>

        <div className="max-w-5xl">
          {experiences.map((exp, index) => (
            <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} index={index} />
          ))}

          {/* Activities */}
          <div
            className={`mt-12 pt-10 border-t-[3px] border-foreground reveal${isVisible ? " is-visible" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="font-display text-2xl sm:text-3xl mb-5">
              EXTRACURRICULAR.
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bold-card bold-card-hover p-5 flex items-center gap-4"
                >
                  <div className="p-3 bg-primary text-primary-foreground border-[3px] border-foreground shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display uppercase">{activity.title}</h4>
                    <p className="text-xs font-bold mt-0.5 text-muted-foreground uppercase tracking-wider">
                      {activity.organization} · {activity.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
