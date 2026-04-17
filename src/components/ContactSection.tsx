import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export default function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast({
        title: "Email service not configured",
        description:
          "Please add EmailJS keys in .env (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY) then restart.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "mostafagaber1234560@gmail.com", href: "mailto:mostafagaber1234560@gmail.com", accent: "bg-primary text-primary-foreground" },
    { icon: Phone, label: "Phone", value: "+20 102 823 7890", href: "tel:+201028237890", accent: "bg-secondary text-secondary-foreground" },
    { icon: MapPin, label: "Location", value: "Egypt", accent: "bg-foreground text-background" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/MostafaGaber135" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mostafagaber135/" },
    { icon: Mail, label: "Email", href: "mailto:mostafagaber1234560@gmail.com" },
  ];

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="eyebrow bg-primary text-primary-foreground">
            <span className="font-mono">06 //</span> Get in touch
          </span>
          <h2 className="font-display text-super mt-4">
            LET&apos;S MAKE <br />
            <span className="text-primary">NOISE.</span>
          </h2>
          <p className="text-base sm:text-lg font-medium mt-4 max-w-2xl">
            Got a project, a role, or just a bold idea? Drop me a line — I reply fast.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="bold-card bold-card-hover flex items-stretch overflow-hidden"
                >
                  <div className={`${item.accent} p-5 border-r-[3px] border-foreground flex items-center justify-center shrink-0`}>
                    <item.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="p-4 sm:p-5 flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{item.label.toUpperCase()}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-display text-base sm:text-lg break-all hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-display text-base sm:text-lg">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bold-card p-5 sm:p-6 bg-foreground text-background">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(202 100% 65%)' }}>
                // CONNECT
              </p>
              <div className="flex gap-2">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-12 h-12 bg-background text-foreground border-[3px] border-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors active:translate-x-[2px] active:translate-y-[2px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <link.icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bold-card p-6 md:p-8 space-y-5">
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-[0.25em] mb-2">
                  // NAME
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="h-12 bg-background border-[3px] border-foreground rounded-sm font-bold focus-visible:ring-4 focus-visible:ring-primary/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-[0.25em] mb-2">
                  // EMAIL
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="h-12 bg-background border-[3px] border-foreground rounded-sm font-bold focus-visible:ring-4 focus-visible:ring-primary/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs uppercase tracking-[0.25em] mb-2">
                  // MESSAGE
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me what you're building..."
                  rows={5}
                  required
                  className="bg-background border-[3px] border-foreground rounded-sm font-medium resize-none focus-visible:ring-4 focus-visible:ring-primary/50"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-[3px] border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Send message
                    <Send className="w-5 h-5 ml-1" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
