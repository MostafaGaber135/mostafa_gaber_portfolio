import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ExternalLink, MapPin } from "lucide-react";

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
  isLeft,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: "easeOut" }}
      className={`relative flex items-start mb-10 sm:mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 top-6 transform md:-translate-x-1/2 z-10">
        <motion.div
          className={`w-4 h-4 rounded-full border-2 border-background ${
            exp.current ? "bg-emerald-400" : "bg-primary"
          } glow-effect`}
          animate={exp.current ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Card */}
      <div className={`ml-8 md:ml-0 md:w-[46%] ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
        <motion.div
          className="glass-card p-5 sm:p-6"
          whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(8,145,178,0.12)" }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  exp.current
                    ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30"
                    : exp.type === "Full-Time"
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {exp.current ? "● Current" : exp.type}
              </span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold leading-snug">{exp.title}</h3>
          <p className="text-primary font-semibold text-sm mt-0.5">{exp.company}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {exp.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {exp.location}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{exp.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.technologies.map((tech) => (
              <span key={tech} className="px-2 py-0.5 bg-secondary text-xs rounded font-medium">
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          {exp.link && (
            <div className="flex items-center gap-3 mt-4">
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Visit Site
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
            My Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">Work Experience</h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto">
            A track record of building real products, learning fast, and delivering quality code.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-[7px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transform: "translateX(-50%)" }}
            />

            {experiences.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${exp.period}`}
                exp={exp}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>

          {/* Activities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center">
              Extracurricular Activities
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-4 flex items-center gap-4"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.organization} · {activity.period}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
