import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Add path alias for cognite -> draft directory mapping
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components/ui/cognite': path.resolve(__dirname, './src/components/ui/draft'),
    };
    return config;
  },
};

export default nextConfig;
