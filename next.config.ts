import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: { globalNotFound: true },
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    // The 2024 portfolio stays online but out of search results.
    return ["/old", "/old/:path*", "/portfolio-2024/:path*"].map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    }));
  },
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
