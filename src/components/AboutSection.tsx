import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
              Get to know me
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">About Me</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-5 sm:mb-6">
                I'm a passionate Frontend Developer with a Bachelor's degree in Computers and Information Technology
                from the Egyptian E-Learning University. I specialize in building responsive, accessible, and
                maintainable web applications.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-5 sm:mb-6">
                With proficiency in HTML, CSS, JavaScript (ES6+), TypeScript, and React, I bring designs to life with
                clean code and attention to detail. I'm always eager to learn new technologies and improve my skills.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>Egypt</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span>Available for work</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 order-1 md:order-2">
              <motion.div
                className="glass-card p-4 sm:p-6 glow-effect"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg">Education</h3>
                    <p className="text-sm text-muted-foreground mt-1 break-words">
                      Egyptian E-Learning University
                    </p>
                    <p className="text-sm text-muted-foreground">Bachelor's in IT • 2020 - 2024</p>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        GPA: 3.41 (B+)
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Graduation Project: A+
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-card p-4 sm:p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg">Graduation Project</h3>
                    <p className="text-sm text-muted-foreground mt-1">RoadX - Achieved A+ Grade</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Comprehensive project demonstrating full-stack development capabilities
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
