import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Analytics } from "@vercel/analytics/react";

// Lazy load all below-fold sections — not downloaded until needed
const AboutSection       = lazy(() => import("@/components/AboutSection"));
const SkillsSection      = lazy(() => import("@/components/SkillsSection"));
const ExperienceSection  = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection    = lazy(() => import("@/components/ProjectsSection"));
const CertificatesSection= lazy(() => import("@/components/CertificatesSection"));
const ContactSection     = lazy(() => import("@/components/ContactSection"));
const Footer             = lazy(() => import("@/components/Footer"));

function SectionFallback() {
  return (
    <div className="w-full py-32 flex items-center justify-center" aria-hidden="true">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function Index() {
  return (
    <>
      <ScrollProgressBar />
      <Helmet>
        <title>Mostafa Gaber Ahmed | Frontend Developer</title>
        <meta name="description" content="Frontend Developer specializing in React, TypeScript, and modern web technologies. Building responsive, accessible, and maintainable web applications." />
        <meta name="keywords" content="Frontend Developer, React, TypeScript, JavaScript, Web Developer, Mostafa Gaber Ahmed" />
        <meta property="og:title" content="Mostafa Gaber Ahmed | Frontend Developer" />
        <meta property="og:description" content="Frontend Developer specializing in React, TypeScript, and modern web technologies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mostafagaberahmed.site/" />
      </Helmet>

      <LoadingScreen />
      <Navbar />

      <main>
        {/* Hero loads eagerly — it's the LCP element */}
        <HeroSection />

        {/* Everything below loads lazily */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CertificatesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Analytics />
    </>
  );
}
