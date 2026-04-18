import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollProgressBar from "@/components/ScrollProgressBar";

// Lazy-load everything below the fold — kept out of the initial JS chunk.
const AboutSection        = lazy(() => import("@/components/AboutSection"));
const SkillsSection       = lazy(() => import("@/components/SkillsSection"));
const ExperienceSection   = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection     = lazy(() => import("@/components/ProjectsSection"));
const CertificatesSection = lazy(() => import("@/components/CertificatesSection"));
const ContactSection      = lazy(() => import("@/components/ContactSection"));
const Footer              = lazy(() => import("@/components/Footer"));

// Analytics is non-critical — mount it only after the browser is idle.
const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
);

function SectionFallback() {
  return (
    <div className="w-full py-32 flex items-center justify-center" aria-hidden="true">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function Index() {
  const [mountAnalytics, setMountAnalytics] = useState(false);

  useEffect(() => {
    const schedule =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2500));
    const id = schedule(() => setMountAnalytics(true));
    return () => {
      const cancel =
        (window as unknown as { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback ?? window.clearTimeout;
      cancel(id as number);
    };
  }, []);

  return (
    <>
      <ScrollProgressBar />

      <LoadingScreen />
      <Navbar />

      <main>
        {/* Hero loads eagerly — it's the LCP element */}
        <HeroSection />

        {/*
         * Everything below loads lazily AND is wrapped in `.section-defer`,
         * which applies `content-visibility: auto` so the browser skips
         * layout/paint for off-screen sections until they approach the viewport.
         * This cuts initial Style & Layout work dramatically on mobile.
         */}
        <div className="section-defer">
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </div>
        <div className="section-defer">
          <Suspense fallback={<SectionFallback />}>
            <SkillsSection />
          </Suspense>
        </div>
        <div className="section-defer">
          <Suspense fallback={<SectionFallback />}>
            <ExperienceSection />
          </Suspense>
        </div>
        <div className="section-defer">
          <Suspense fallback={<SectionFallback />}>
            <ProjectsSection />
          </Suspense>
        </div>
        <div className="section-defer">
          <Suspense fallback={<SectionFallback />}>
            <CertificatesSection />
          </Suspense>
        </div>
        <div className="section-defer">
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {mountAnalytics && (
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      )}
    </>
  );
}
