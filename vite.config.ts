import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig, type Plugin } from "vite";

/**
 * Inline the emitted CSS bundle into index.html as a <style> block.
 * Eliminates the render-blocking <link rel="stylesheet"> request (~150ms savings on LCP).
 * The CSS is small enough (~13KiB / ~3KiB gzipped) that inlining is a net win.
 */
function inlineCssPlugin(): Plugin {
  return {
    name: "inline-critical-css",
    apply: "build",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;

        // Collect all emitted CSS assets
        const cssAssets: Array<{ fileName: string; source: string }> = [];
        for (const fileName of Object.keys(bundle)) {
          const asset = bundle[fileName];
          if (
            asset.type === "asset" &&
            fileName.endsWith(".css") &&
            typeof asset.source === "string"
          ) {
            cssAssets.push({ fileName, source: asset.source });
          }
        }
        if (cssAssets.length === 0) return html;

        // Remove each <link rel="stylesheet" href="...that_css..."> from the HTML
        for (const { fileName } of cssAssets) {
          const safeName = fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const linkRe = new RegExp(
            `\\s*<link[^>]+href=["'][^"']*${safeName}["'][^>]*>`,
            "g",
          );
          html = html.replace(linkRe, "");
        }

        // Inject the combined CSS as a single <style> just before </head>
        const combinedCss = cssAssets.map((a) => a.source).join("\n");
        const styleTag = `<style data-inlined>${combinedCss}</style>`;
        html = html.replace(/<\/head>/i, `${styleTag}</head>`);

        // Remove the now-redundant CSS files from the output bundle
        for (const { fileName } of cssAssets) {
          delete bundle[fileName];
        }

        return html;
      },
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: "/",

  server: {
    host: true,
    port: 8080,
    open: true,
    allowedHosts: ["mostafagaberahmed.site", "www.mostafagaberahmed.site"],
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
    inlineCssPlugin(),
  ].filter(Boolean),

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
            "@radix-ui/react-slot",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          "emailjs":      ["@emailjs/browser"],
        },
      },
    },
  },
}));
