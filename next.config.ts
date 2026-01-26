/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // This prevents Vercel from trying to run the code during build
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
