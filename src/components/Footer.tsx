import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground text-background border-t-[3px] border-foreground">
      {/* Big CTA strip */}
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: 'hsl(202 100% 65%)' }}>
              // LET&apos;S BUILD
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6">
              GOT A <span style={{ color: 'hsl(202 100% 65%)' }}>BOLD</span> <br />
              IDEA?
            </h2>
            <a
              href="mailto:mostafagaber1234560@gmail.com"
              className="inline-flex items-center gap-3 font-display text-2xl sm:text-3xl underline underline-offset-[8px] decoration-[4px] decoration-primary hover:decoration-secondary transition-colors break-all"
            >
              mostafagaber1234560@gmail.com
            </a>
          </div>

          <button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="w-20 h-20 bg-primary text-primary-foreground border-[3px] border-background flex items-center justify-center font-display text-sm uppercase hover:bg-secondary transition-colors active:translate-y-1 shrink-0"
          >
            <div className="flex flex-col items-center gap-0.5">
              <ArrowUp className="w-6 h-6" />
              <span className="text-[10px]">TOP</span>
            </div>
          </button>
        </div>
      </div>

      {/* Meta row */}
      <div className="border-t-[3px] border-background/20">
        <div className="container mx-auto px-4 md:px-8 py-6 grid gap-4 md:grid-cols-3 md:items-center">
          <p className="font-mono text-xs uppercase tracking-wider text-background/70">
            © {currentYear} MOSTAFA GABER AHMED · EGYPT
          </p>

          <div className="flex items-center justify-start md:justify-center gap-5">
            {[
              { href: "#home",       label: "Home"     },
              { href: "#projects",   label: "Projects" },
              { href: "#contact",    label: "Contact"  },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-xs uppercase tracking-wider hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-start md:justify-end gap-2">
            {[
              { href: "https://github.com/MostafaGaber135",           icon: Github,   label: "GitHub"   },
              { href: "https://www.linkedin.com/in/mostafagaber135/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:mostafagaber1234560@gmail.com",          icon: Mail,     label: "Email"    },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-10 h-10 border-[2px] border-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
