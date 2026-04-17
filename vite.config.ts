import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: "/",

  server: {
    host: true,
    port: 8080,
    open: true,
    allowedHosts: ["mostafagaberahmed.site", "www.mostafagaberahmed.site"],
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split heavy vendor libs into separate cacheable chunks
        manualChunks: {
          "react-core":   ["react", "react-dom"],
          "react-router": ["react-router-dom"],
          "radix-ui":     [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-slot",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          "emailjs":      ["@emailjs/browser"],
          "framer":       ["framer-motion"],
        },
      },
    },
  },
}));
