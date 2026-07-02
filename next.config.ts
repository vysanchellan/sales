import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder assets are SVG; allow them and skip the optimizer so
    // the static/Vercel deploy works with no remote loader configured.
    dangerouslyAllowSVG: true,
    unoptimized: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
