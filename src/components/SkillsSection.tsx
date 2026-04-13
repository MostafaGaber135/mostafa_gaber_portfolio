import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const frontendSkills = [
  { name: "HTML5", level: 95 },
  { name: "CSS3 / Sass", level: 90 },
  { name: "JavaScript (ES6+)", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 90 },
  { name: "Next.js", level: 80 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Material UI", level: 80 },
];

const toolsSkills = [
  { name: "Git / GitHub", level: 90 },
  { name: "Firebase", level: 75 },
  { name: "Supabase", level: 75 },
  { name: "Vercel / Netlify", level: 85 },
  { name: "REST APIs", level: 85 },
  { name: "Postman", level: 80 },
];

const softSkills = ["Communication", "Problem Solving", "Collaboration", "Teamwork", "Time Management", "Adaptability"];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center gap-3">
        <span className="text-sm font-medium truncate">{name}</span>
        <span className="text-sm text-muted-foreground shrink-0">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">What I can do</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">Skills & Expertise</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="glass-card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-5 sm:mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              Frontend Development
            </h3>
            <div className="space-y-4">
              {frontendSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-5 sm:mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
              Tools & Technologies
            </h3>
            <div className="space-y-4">
              {toolsSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-5 sm:mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              Soft Skills
            </h3>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {softSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-3 py-2 sm:px-4 bg-secondary rounded-full text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="mt-7 sm:mt-8">
              <h4 className="text-sm font-semibold mb-4 text-muted-foreground">Languages</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm gap-3">
                  <span>Arabic</span>
                  <span className="text-primary shrink-0">Native</span>
                </div>
                <div className="flex justify-between text-sm gap-3">
                  <span>English</span>
                  <span className="text-primary shrink-0">B2</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
