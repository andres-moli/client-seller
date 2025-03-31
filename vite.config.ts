import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import fs from 'fs';
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    https: {
      key: fs.readFileSync('./intranet_cytech_net_co.key', 'utf-8'),  // 📌 Asegúrate de que sean archivos separados
      cert: fs.readFileSync('./intranet_cytech_net_co.pem', 'utf-8'),
    },
    host: 'localhost', // Asegura que el host sea accesible
    port: 3000,        // Puedes cambiar el puerto si lo deseas
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
