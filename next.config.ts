import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal server bundle for the Docker image (see Dockerfile).
  output: "standalone",
  cacheComponents: true,
  // In-memory cache for 'use cache' / pages (default 50 MB; the VPS has plenty of RAM).
  cacheMaxMemorySize: 256 * 1024 * 1024,
  // Cache lifetimes used by lib/api/server.ts (seconds).
  cacheLife: {
    // Lists, categories, filters — refreshed about every 10 minutes (plan §4).
    catalog: { stale: 300, revalidate: 600, expire: 60 * 60 * 24 },
    // A single work/book, its TOC and pages — content rarely changes.
    content: { stale: 60 * 60, revalidate: 60 * 60 * 24, expire: 60 * 60 * 24 * 30 },
  },
};

export default nextConfig;
