import { Helmet } from "react-helmet-async";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Analytics } from "@vercel/analytics/react";

export default function Index() {
  return (
    <>
      <ScrollProgressBar />
      <Helmet>
        <title>Mostafa Gaber Ahmed | Frontend Developer</title>
        <meta
          name="description"
          content="Frontend Developer specializing in React, TypeScript, and modern web technologies. Building responsive, accessible, and maintainable web applications."
        />
        <meta
          name="keywords"
          content="Frontend Developer, React, TypeScript, JavaScript, Web Developer, Mostafa Gaber Ahmed"
        />
        <meta property="og:title" content="Mostafa Gaber Ahmed | Frontend Developer" />
        <meta
          property="og:description"
          content="Frontend Developer specializing in React, TypeScript, and modern web technologies."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>

      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
