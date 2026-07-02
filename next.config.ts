import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Property/agent photography is hotlinked from Unsplash (already sized via
    // URL params); the poster fallback is a local SVG. Optimizer is skipped so
    // the static/Vercel deploy needs no image loader config.
    dangerouslyAllowSVG: true,
    unoptimized: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
