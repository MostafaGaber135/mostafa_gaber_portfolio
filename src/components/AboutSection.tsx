import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
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
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-14">
            <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
              Get to know me
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">About Me</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Bio */}
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-5">
                Frontend Developer who enjoys building responsive, well-structured web applications.
                Focused on writing clean code, integrating APIs efficiently, and making sure the result
                feels smooth for users across all devices.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-5">
                Currently working full-time at <span className="text-primary font-semibold">PentaValue</span>, where
                I contribute to client-facing products, own end-to-end feature delivery, and optimize
                application performance in an Agile environment.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-7">
                Proficient in React, Next.js, TypeScript, and modern styling systems. Always looking
                to learn, improve, and work with teams that care about quality.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>Egypt</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-emerald-500 font-semibold">Working at PentaValue</span>
                </div>
              </div>
            </motion.div>

            {/* Cards */}
            <motion.div variants={itemVariants} className="space-y-4 order-1 md:order-2">
              {/* Education */}
              <motion.div
                className="glass-card p-4 sm:p-5 glow-effect"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base">Education</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Bachelor of Computers & Information Technology
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Egyptian E-Learning University · 2020 – 2024
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        GPA: 3.41 / 4.0 (B+)
                      </span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        Graduation: A+
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Graduation Project */}
              <motion.div
                className="glass-card p-4 sm:p-5"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base">Graduation Project</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      RoadX – Full-stack demonstration project
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Comprehensive project showcasing full-stack development capabilities
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-semibold rounded-full">
                      Grade: A+
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Current Role */}
              <motion.div
                className="glass-card p-4 sm:p-5"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 shrink-0">
                    <Briefcase className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm sm:text-base">Currently</h3>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 text-xs font-semibold border border-emerald-400/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Frontend Developer at <span className="text-foreground font-semibold">PentaValue</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Full-Time · Apr 2026 – Present</p>
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
