// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // Build settings
  build: {
    // Output directory for production build.
    // Change this to "dist" so Vercel can find it by default.
    outDir: "dist",

    // Increase the warning limit if you have large bundles.
    chunkSizeWarningLimit: 2000
  },

  // Project plugins
  plugins: [
    tsconfigPaths(),  // Resolve TypeScript path aliases
    react(),          // React support
    tagger()          // DhiWise component tagger
  ],

  // Dev server configuration
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [
      ".amazonaws.com",
      ".builtwithrocket.new"
    ]
  }
});
