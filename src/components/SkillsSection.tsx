import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center gap-3">
        <span className="text-sm font-medium truncate">{name}</span>
        <span className="text-xs text-muted-foreground shrink-0 font-semibold">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
            What I can do
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">Skills & Expertise</h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Technologies and tools I use to build modern, production-ready web applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {/* Core & Frameworks */}
          <motion.div variants={itemVariants} className="glass-card p-5 sm:p-6">
            <h3 className="text-sm sm:text-base font-bold mb-5 flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              Core & Frameworks
            </h3>
            <div className="space-y-4">
              {coreSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* UI & Styling */}
          <motion.div variants={itemVariants} className="glass-card p-5 sm:p-6">
            <h3 className="text-sm sm:text-base font-bold mb-5 flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
              UI & Styling
            </h3>
            <div className="space-y-4 mb-8">
              {uiSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.08} />
              ))}
            </div>

            <h3 className="text-sm sm:text-base font-bold mb-4 flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1.5 bg-secondary rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.07 }}
                  whileHover={{ scale: 1.07 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Tools & Backend */}
          <motion.div variants={itemVariants} className="glass-card p-5 sm:p-6">
            <h3 className="text-sm sm:text-base font-bold mb-5 flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
              Tools & Backend
            </h3>
            <div className="space-y-4 mb-8">
              {toolsSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.08} />
              ))}
            </div>

            <div className="pt-2 border-t border-border/50">
              <h4 className="text-xs font-bold mb-3 text-muted-foreground uppercase tracking-wide">
                Languages
              </h4>
              <div className="space-y-2">
                {[
                  { lang: "Arabic", level: "Native", width: 100 },
                  { lang: "English", level: "B2 – Upper Intermediate", width: 70 },
                ].map(({ lang, level, width }) => (
                  <div key={lang}>
                    <div className="flex justify-between text-sm gap-3 mb-1">
                      <span className="font-medium">{lang}</span>
                      <span className="text-primary text-xs shrink-0">{level}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${width}%` } : { width: 0 }}
                        transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
