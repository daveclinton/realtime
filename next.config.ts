import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pictures-storage.storage.eu-north1.nebius.cloud",
        protocol: "https",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
