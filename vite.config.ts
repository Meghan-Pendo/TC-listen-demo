// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build (set by .github/workflows/deploy-pages.yml): static SPA served from /TC-listen-demo/.
// Lovable builds don't set this, so they're unaffected.
const ghPages = process.env["GITHUB_PAGES"] === "true";
const base = "/TC-listen-demo/";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(ghPages && {
      spa: { enabled: true, prerender: { outputPath: "/index.html" } },
      router: { basepath: base },
    }),
  },
  ...(ghPages && { vite: { base } }),
});
