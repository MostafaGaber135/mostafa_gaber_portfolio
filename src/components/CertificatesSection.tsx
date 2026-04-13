import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Calendar } from "lucide-react";

const certificates = [
  { title: "Master Git & GitHub", issuer: "Udemy", type: "Online", year: "2024", description: "Essential skills for developers" },
  { title: "Introduction to Web Technologies", issuer: "ITI", type: "Offline", year: "2023", description: "Information Technology Institute" },
  { title: "IC3 Certification", issuer: "Faculty of Computers and Information", type: "Offline", year: "2020", description: "Asyut" },
];

export default function CertificatesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Achievements</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Courses & Certificates</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 group"
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {cert.year}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-primary font-medium text-sm mb-1">{cert.issuer}</p>
                <p className="text-muted-foreground text-sm flex-1">{cert.description}</p>
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 bg-secondary text-xs font-medium rounded-full">{cert.type}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
