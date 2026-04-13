import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink, X, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Veritas",
    subtitle: "Real-Time News Aggregation Platform",
    description:
      "A TypeScript-first React application for browsing and searching 1,000+ real-time news articles via the GNews API, with debounced search and category-based filtering. Features a secure API proxy layer using Vercel serverless functions to protect API keys from client-side exposure.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel Serverless", "GNews API", "React.memo"],
    github: "https://github.com/MostafaGaber135/Veritas",
    live: "https://veritas-news-app.vercel.app/",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop",
    color: "from-violet-500/20 to-indigo-500/20",
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
    color: "from-blue-500/20 to-cyan-500/20",
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
    color: "from-red-500/20 to-orange-500/20",
    highlights: ["500+ movies via TMDb API", "Favorites with localStorage", "3 responsive breakpoints"],
  },
];

type Project = (typeof projects)[0];

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
      transition={{ duration: 0.65, delay: index * 0.12, ease: "easeOut" }}
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <motion.div
        className="glass-card overflow-hidden h-full flex flex-col"
        whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(8,145,178,0.15)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10`} />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-600"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent z-20" />
          {/* Overlay hint */}
          <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-background/80 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-full border border-border">
              View Details
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">{project.subtitle}</p>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-1 mb-4">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {h}
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-secondary text-xs rounded font-medium">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-4 items-center mt-auto pt-2 border-t border-border/50">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            <span className="ml-auto text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-70`} />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/90 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 z-10">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-white/80 text-sm">{project.subtitle}</p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">
              Key Highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            </Button>
            {project.live && (
              <Button variant="outline" asChild>
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
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
            My Work
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">Featured Projects</h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Real-world applications built with modern technologies and attention to detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
          transition={{ delay: 0.9 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild className="border-primary/40 hover:bg-primary/10">
            <a href="https://github.com/MostafaGaber135" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View All Projects on GitHub
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
