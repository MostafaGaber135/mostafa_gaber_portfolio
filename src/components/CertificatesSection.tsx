import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "Master Git & GitHub: Essential Skills for Developers",
    issuer: "Udemy",
    type: "Online",
    year: "2024",
    description: "Version control, branching strategies, workflows, and collaborative development best practices.",
    color: "from-orange-500/20 to-red-500/20",
    dot: "bg-orange-400",
  },
  {
    title: "Introduction to Web Technologies",
    issuer: "Information Technology Institute (ITI)",
    type: "Offline",
    year: "2023",
    description: "Foundational web technologies covering HTML, CSS, JavaScript and core frontend principles.",
    color: "from-blue-500/20 to-cyan-500/20",
    dot: "bg-blue-400",
  },
  {
    title: "IC3 Digital Literacy Certification",
    issuer: "Faculty of Computers and Information, Asyut",
    type: "Offline",
    year: "2020",
    description: "International certification validating digital literacy, computing fundamentals, and internet skills.",
    color: "from-violet-500/20 to-purple-500/20",
    dot: "bg-violet-400",
  },
];

export default function CertificatesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
            Achievements
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">Certifications</h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Verified credentials validating my technical skills and knowledge.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group"
            >
              <motion.div
                className="glass-card p-5 sm:p-6 h-full flex flex-col overflow-hidden relative"
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(8,145,178,0.12)" }}
                transition={{ duration: 0.25 }}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color.replace("/20", "")} opacity-60`} />

                <div className="flex items-start justify-between mb-4 mt-1">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} group-hover:scale-110 transition-transform`}>
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.year}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base mb-2 group-hover:text-primary transition-colors leading-snug flex-1">
                  {cert.title}
                </h3>

                <p className="text-primary font-semibold text-xs mb-2">{cert.issuer}</p>

                <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                  {cert.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs font-semibold rounded-full">
                    <span className={`w-1.5 h-1.5 rounded-full ${cert.dot}`} />
                    {cert.type}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
