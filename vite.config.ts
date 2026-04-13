import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: "./",

  server: {
    host: true,
    port: 8080,
    open: true,
    allowedHosts: ["mostafagaberahmed.site","www.mostafagaberahmed.site"],
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
