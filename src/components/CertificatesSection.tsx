import { Award, Calendar } from "lucide-react";
import { useIntersect } from "@/hooks/use-intersect";

const certificates = [
  {
    title: "Master Git & GitHub: Essential Skills for Developers",
    issuer: "Udemy",
    type: "Online",
    year: "2024",
    description: "Version control, branching strategies, workflows, and collaborative development best practices.",
    accent: "primary",
  },
  {
    title: "Introduction to Web Technologies",
    issuer: "Information Technology Institute (ITI)",
    type: "Offline",
    year: "2023",
    description: "Foundational web technologies covering HTML, CSS, JavaScript and core frontend principles.",
    accent: "secondary",
  },
  {
    title: "IC3 Digital Literacy Certification",
    issuer: "Faculty of Computers and Information, Asyut",
    type: "Offline",
    year: "2020",
    description: "International certification validating digital literacy, computing fundamentals, and internet skills.",
    accent: "surface",
  },
];

const accentClasses: Record<string, string> = {
  primary:   "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  surface:   "bg-foreground text-background",
};

export default function CertificatesSection() {
  const [ref, isVisible] = useIntersect({ rootMargin: "-100px" });

  return (
    <section
      id="certificates"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-muted border-y-[3px] border-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-bold opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative">
        <div className={`mb-12 sm:mb-16 reveal${isVisible ? " is-visible" : ""}`}>
          <span className="eyebrow bg-secondary text-secondary-foreground">
            <span className="font-mono">05 //</span> Receipts
          </span>
          <h2 className="font-display text-super mt-4">
            CERTIFIED &amp; <br />
            <span className="text-primary">VERIFIED.</span>
          </h2>
          <p className="text-base sm:text-lg font-medium mt-4 max-w-2xl">
            Verified credentials backing my technical skills and continuous learning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl">
          {certificates.map((cert, index) => (
            <div
              key={cert.title}
              className={`group h-full reveal${isVisible ? " is-visible" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bold-card bold-card-hover h-full flex flex-col overflow-hidden">
                {/* Accent header */}
                <div className={`${accentClasses[cert.accent]} p-5 border-b-[3px] border-foreground flex items-start justify-between`}>
                  <div className="bg-background text-foreground border-[3px] border-foreground p-3">
                    <Award className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-90">// CERT</p>
                    <p className="font-display text-3xl leading-none">{cert.year}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg leading-tight group-hover:text-primary transition-colors flex-1">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-black uppercase tracking-wider text-primary mt-3">{cert.issuer}</p>

                  <p className="text-sm font-medium leading-relaxed mt-3">{cert.description}</p>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t-[3px] border-foreground">
                    <span className="tag-chip">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {cert.type.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs font-black">#{String(index + 1).padStart(3, "0")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
