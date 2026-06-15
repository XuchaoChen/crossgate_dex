import type { NextConfig } from "next";

// Optional base path for sub-directory hosting (e.g. Gitee Pages serves at
// https://<user>.gitee.io/<repo>/). Set BASE_PATH=/crossgate_dex at build time
// for that target; leave unset for root hosting (Vercel / EdgeOne).
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Static export so the site can be hosted on any static CDN (EdgeOne Pages,
  // Gitee Pages, etc.) and load fast from mainland China. The dataset is a
  // small static JSON snapshot and all filtering happens client-side, so no
  // server runtime is needed.
  output: "export",
  trailingSlash: true,
  images: {
    // We render product images with plain <img>; export mode requires the
    // optimizer to be disabled regardless.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "*.alicdn.com" },
      { protocol: "https", hostname: "*.goofish.com" },
    ],
  },
};

export default nextConfig;
