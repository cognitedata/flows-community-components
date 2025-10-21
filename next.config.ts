import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;
