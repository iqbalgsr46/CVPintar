import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Allow external device access for HMR
  // @ts-ignore - Some TS definitions might not have it yet
  allowedDevOrigins: ["10.91.200.121"],
};

export default nextConfig;
