import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import windi from "vite-plugin-windicss";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), windi()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src")
    }
  }
});
