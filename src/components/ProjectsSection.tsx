import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, X, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Veritas",
    subtitle: "Real-Time News Aggregation Platform",
    description:
      "A TypeScript-first React application for browsing and searching 1,000+ real-time news articles via the GNews API, with debounced search and category-based filtering. Features a secure API proxy layer using Vercel serverless functions to protect API keys from client-side exposure.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel Serverless", "GNews API", "React.memo"],
    github: "https://github.com/MostafaGaber135/Veritas",
    live: "https://veritas-opal.vercel.app/",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop",
    accent: "primary",
    highlights: ["1,000+ real-time articles", "Secure API proxy layer", "Debounced search & filtering"],
  },
  {
    title: "CodeMap",
    subtitle: "Developer Learning Roadmap Platform",
    description:
      "A bilingual (Arabic/English) web application with 20+ structured learning roadmaps, using Next.js App Router with SSG for fast page loads and SEO optimization. Integrated Supabase as a backend-as-a-service for real-time data management and scalable content delivery.",
    technologies: ["Next.js", "Material UI", "Supabase", "TypeScript", "SSG", "SEO"],
    github: "https://github.com/MostafaGaber135/CodeMap",
    live: "https://code-map-psi.vercel.app/",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
    accent: "secondary",
    highlights: ["20+ learning roadmaps", "Arabic & English support", "SSG for fast loads"],
  },
  {
    title: "MovieFlix",
    subtitle: "Movie Discovery & Favorites App",
    description:
      "A single-page application consuming the TMDb REST API to browse 500+ movies, with global state management via Context API for favorites persistence using localStorage. Features debounced search, dynamic routing for detail views, and optimistic UI updates for a fast, app-like experience.",
    technologies: ["React", "Context API", "React Router", "DaisyUI", "Tailwind CSS", "TMDb API"],
    github: "https://github.com/MostafaGaber135/MovieFlix.git",
    live: "https://movie-flix-bice-pi.vercel.app/",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
    accent: "surface",
    highlights: ["500+ movies via TMDb API", "Favorites with localStorage", "3 responsive breakpoints"],
  },
];

type Project = (typeof projects)[0];

const accentClasses: Record<string, string> = {
  primary:   "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  surface:   "bg-foreground text-background",
};

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="bold-card bold-card-hover overflow-hidden h-full flex flex-col">
        {/* Accent header */}
        <div className={`${accentClasses[project.accent]} px-5 py-3 flex items-center justify-between border-b-[3px] border-foreground`}>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-black">
            // PROJECT {String(index + 1).padStart(2, "0")}
          </span>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden shrink-0 bg-muted border-b-[3px] border-foreground">
          <img
            src={project.image.replace("w=800&h=500", "w=600&h=375")}
            srcSet={`${project.image.replace("w=800&h=500", "w=400&h=250")} 400w, ${project.image.replace("w=800&h=500", "w=600&h=375")} 600w, ${project.image} 800w`}
            sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px"
            alt={`${project.title} – ${project.subtitle}`}
            width={600}
            height={375}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ filter: "contrast(1.05) saturate(1.1)" }}
          />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h3 className="font-display text-2xl sm:text-3xl leading-none group-hover:text-primary transition-colors">
            {project.title.toUpperCase()}.
          </h3>
          <p className="text-xs font-black uppercase tracking-wider mt-1.5 text-muted-foreground">{project.subtitle}</p>

          <p className="text-sm font-medium leading-relaxed mt-3 line-clamp-2 flex-1">{project.description}</p>

          {/* Highlights */}
          <ul className="flex flex-col gap-1.5 mt-4">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs font-bold">
                <span className="w-2 h-2 bg-primary border-[2px] border-foreground shrink-0 mt-1" />
                {h}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="tag-chip">{tech}</span>
            ))}
            {project.technologies.length > 3 && (
              <span className="tag-chip tag-chip-primary">+{project.technologies.length - 3}</span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-4 items-center mt-5 pt-4 border-t-[3px] border-foreground">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" /> CODE
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" /> LIVE
              </a>
            )}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-primary group-hover:underline decoration-[3px] underline-offset-4">
              CLICK TO EXPAND →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bold-card bg-background max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative ${accentClasses[project.accent]} border-b-[3px] border-foreground`}>
          <img
            src={project.image.replace("w=800&h=500", "w=600&h=375")}
            srcSet={`${project.image.replace("w=800&h=500", "w=400&h=250")} 400w, ${project.image.replace("w=800&h=500", "w=600&h=375")} 600w, ${project.image} 800w`}
            sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px"
            alt={`${project.title} – ${project.subtitle}`}
            width={600}
            height={375}
            loading="lazy"
            decoding="async"
            className="w-full h-56 object-cover mix-blend-multiply opacity-80"
          />
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-11 h-11 bg-background border-[3px] border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors active:translate-x-[2px] active:translate-y-[2px]"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-1 opacity-90">// CASE STUDY</p>
            <h3 id="project-modal-title" className="font-display text-3xl sm:text-4xl leading-none">
              {project.title.toUpperCase()}.
            </h3>
            <p className="text-xs font-bold uppercase tracking-wider mt-1 opacity-90">{project.subtitle}</p>
          </div>
        </div>

        <div className="p-6">
          <p className="font-medium leading-relaxed mb-6">{project.description}</p>

          <div className="mb-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] mb-3 text-muted-foreground">
              // KEY HIGHLIGHTS
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm font-bold">
                  <span className="w-2.5 h-2.5 bg-primary border-[2px] border-foreground shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] mb-3 text-muted-foreground">
              // STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag-chip tag-chip-primary">{tech}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            </Button>
            {project.live && (
              <Button asChild>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <span className="eyebrow bg-primary text-primary-foreground">
              <span className="font-mono">04 //</span> Selected Work
            </span>
            <h2 className="font-display text-super mt-4">
              FEATURED <br />
              <span className="text-stroke">PROJECTS.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg font-medium max-w-md">
            Real-world applications built with modern technologies, obsessive attention to detail, and a bias for shipping.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-14"
        >
          <Button variant="surface" size="lg" asChild>
            <a href="https://github.com/MostafaGaber135" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              See everything on GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
