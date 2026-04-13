import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Front-end and Cross-Platform Mobile Developer",
    company: "ITI",
    type: "Internship",
    period: "Dec 2024 – Apr 2025",
    location: "Egypt",
    description: "Intensive training program focused on front-end development and cross-platform mobile development.",
  },
  {
    title: "Frontend Developer",
    company: "PassAhead",
    type: "Freelance",
    period: "2024",
    location: "Remote",
    description: "Built an online platform that provides question banks to help students and professionals prepare for exams.",
    technologies: ["Next.js", "Tailwind CSS", "REST APIs", "JavaScript (ES6+)", "Git/GitHub"],
    link: "https://passahead.com/",
  },
  {
    title: "Summer Training",
    company: "Banque Misr",
    type: "Training",
    period: "Jun 2021 – Jul 2021",
    location: "Online",
    description: "Summer training project focusing on banking systems and software development practices.",
  },
];

const activities = [
  { title: "Public Relations Member", organization: "VOP", period: "2022 – 2024" },
  { title: "IT Member", organization: "Enactus EELU", period: "2021 – 2023" },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">My Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Experience</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-border" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-effect z-10" />

                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <motion.div className="glass-card p-6 inline-block text-left" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">{exp.type}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{exp.description}</p>
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-secondary text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">Extracurricular Activities</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-4 flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {activity.organization} • {activity.period}
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
