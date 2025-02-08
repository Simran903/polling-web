import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "polling-web.onrender.com",
      },
      {
        protocol: "http",
        hostname: "polling-web.onrender.com",
      },
    ],
  },
};

export default nextConfig;