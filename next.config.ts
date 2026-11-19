import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // /old serves the 2024 portfolio: a static single-page app built with base path /old,
  // stored in public/portfolio-2024 (a public/old folder would shadow the /old route).
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/old", destination: "/portfolio-2024/app.html" },
        { source: "/old/static/:path*", destination: "/portfolio-2024/static/:path*" },
        { source: "/old/:file(favicon\\.ico|logo\\d+\\.png|manifest\\.json|robots\\.txt)", destination: "/portfolio-2024/:file" },
      ],
      afterFiles: [],
      fallback: [{ source: "/old/:path*", destination: "/portfolio-2024/app.html" }],
    };
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
