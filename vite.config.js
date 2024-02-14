import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/socket.io": {
        target: "http://localhost:3000", // Your server address
        ws: true,
      },
    },
  },
  plugins: [react()],
});
