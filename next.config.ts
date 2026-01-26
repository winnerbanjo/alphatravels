/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    turbo: {
      // This helps stabilize the new Turbopack compiler
      rules: {
        "*.svg": ["@svgr/webpack"],
      },
    },
  },
};

export default nextConfig;
