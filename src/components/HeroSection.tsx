import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative min-h-[100svh] flex items-center justify-center
        overflow-hidden py-14 sm:py-16 md:py-20
      "
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="
            absolute left-1/2 top-[14%] -translate-x-1/2
            sm:top-[16%] md:left-[18%] md:top-[18%] md:translate-x-0
            w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96
            bg-primary/20 rounded-full blur-3xl
          "
          animate={{ x: [0, 40, 0], y: [0, -24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="
            absolute left-1/2 bottom-[10%] -translate-x-1/2
            sm:bottom-[12%] md:left-auto md:right-[18%] md:bottom-[16%] md:translate-x-0
            w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80
            bg-cyan-500/15 rounded-full blur-3xl
          "
          animate={{ x: [0, -32, 0], y: [0, 32, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span
              className="
                inline-flex items-center justify-center
                px-3 py-2 sm:px-4
                rounded-full bg-primary/10 text-primary
                text-xs sm:text-sm font-medium
                border border-primary/20
              "
            >
              Frontend Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              font-bold leading-[1.12] mb-4 sm:mb-6
              text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl
            "
          >
            Hi, I'm <span className="gradient-text">Mostafa Gaber</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              text-muted-foreground max-w-2xl mx-auto
              mb-7 sm:mb-9
              text-sm sm:text-base md:text-lg lg:text-xl
              px-1 sm:px-0 leading-relaxed
            "
          >
            Front-end Development graduate from the Egyptian E-Learning
            University. Passionate about building responsive, accessible, and
            maintainable web applications with React, TypeScript, and modern
            technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="
              w-full flex flex-col sm:flex-row
              items-stretch sm:items-center justify-center
              gap-3 sm:gap-4 mb-9 sm:mb-12
              max-w-sm sm:max-w-none mx-auto
            "
          >
            <Button
              size="lg"
              className="group glow-effect w-full sm:w-auto"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              View Projects
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-primary/50 hover:bg-primary/10"
            >
              <a
                href="/Mostafa Gaber Ahmed CV.pdf"
                download
                className="flex items-center justify-center"
              >
                <Download className="mr-2 w-4 h-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
          >
            <motion.a
              href="https://github.com/MostafaGaber135"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/mostafagaber135/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="mailto:mostafagaber1234560@gmail.com"
              className="p-3 rounded-full glass-card hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 hidden xs:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
