import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Goofish/闲鱼 product images are served from Alibaba CDNs.
    remotePatterns: [
      { protocol: "https", hostname: "*.alicdn.com" },
      { protocol: "https", hostname: "*.goofish.com" },
    ],
  },
};

export default nextConfig;
