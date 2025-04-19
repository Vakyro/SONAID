import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Elimina la configuración experimental por ahora
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;