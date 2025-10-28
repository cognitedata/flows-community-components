import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Configure webpack to resolve cognite imports (for webpack builds)
    // Point to draft directory as fallback when cognite is empty
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components/ui/cognite": path.resolve(
        __dirname,
        "./src/components/ui/draft"
      ),
    };

    // Add both directories to resolve modules so webpack can find files in either location
    config.resolve.modules = [
      path.resolve(__dirname, "./src/components/ui/cognite"),
      path.resolve(__dirname, "./src/components/ui/draft"),
      ...(config.resolve.modules || ["node_modules"]),
    ];

    return config;
  },
};

export default nextConfig;
