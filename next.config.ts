import type { NextConfig } from "next";
const nextConfig = {
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
} as any;
export default nextConfig;
