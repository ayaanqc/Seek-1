/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Covers are vendored under public/covers/, so no remote cover host is
    // needed at request time anymore.
    remotePatterns: [],
    // Serve covers crisply on retina: request widths that cover 2x DPR for
    // the hero (232px) and card (up to ~300px) slots, in modern formats.
    deviceSizes: [320, 420, 640, 768, 1024, 1280],
    imageSizes: [64, 96, 128, 192, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        source: '/covers/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
