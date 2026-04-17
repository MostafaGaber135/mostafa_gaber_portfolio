import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden px-4">
      <div className="absolute inset-0 bg-grid-bold opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-2xl text-center">
        <div className="inline-flex items-center justify-center px-6 py-4 bg-primary text-primary-foreground border-[4px] border-foreground shadow-bold-lg mb-8 rotate-[-3deg]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] font-black">ERROR // 404</p>
        </div>

        <h1 className="font-display text-[clamp(5rem,18vw,12rem)] leading-none mb-4">
          <span className="block">PAGE</span>
          <span className="block text-stroke">NOT</span>
          <span className="block text-primary">FOUND.</span>
        </h1>

        <p className="text-lg font-medium mb-8 max-w-md mx-auto">
          The URL <span className="font-mono bg-foreground text-background px-2 py-0.5 break-all">{location.pathname}</span> doesn&apos;t exist.
        </p>

        <Button asChild size="lg">
          <a href="/">
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back home
          </a>
        </Button>
      </div>
    </div>
  );
}
