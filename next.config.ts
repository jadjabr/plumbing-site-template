import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (≈20% smaller), WebP fallback for browsers without AVIF.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
