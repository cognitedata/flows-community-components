import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Improve cache management and stability
  experimental: {
    // Disable problematic features that can cause cache issues
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  
  // Better error handling during development
  onDemandEntries: {
    // Keep pages in memory for 25 seconds
    maxInactiveAge: 25 * 1000,
    // Pages that should be kept in memory
    pagesBufferLength: 2,
  },

  // Reduce cache conflicts
  generateEtags: false,
  
  // Better TypeScript handling
  typescript: {
    // Don't fail build on TypeScript errors during development
    ignoreBuildErrors: false,
  },

  // Optimize images
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
