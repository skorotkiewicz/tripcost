import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const USER_AGENT = "TripCostCalculator/1.0";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/openstreetmap": {
        target: "https://nominatim.openstreetmap.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openstreetmap/, ""),
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, _req, _res) => {
            proxyReq.setHeader("User-Agent", USER_AGENT);
          });
        },
      },
      "/api/osrm": {
        target: "https://router.project-osrm.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/osrm/, ""),
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, _req, _res) => {
            proxyReq.setHeader("User-Agent", USER_AGENT);
          });
        },
      },
    },
  },
});
