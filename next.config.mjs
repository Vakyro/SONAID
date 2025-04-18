/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable image optimization
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console in production
  },
  experimental: {
    optimizeCss: true, // Optimize CSS
    optimizeServerReact: true, // Optimize server components
  },
}

export default nextConfig
