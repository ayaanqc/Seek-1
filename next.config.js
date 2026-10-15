/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Cover art courtesy of the Open Library Covers API (openlibrary.org).
      { protocol: 'https', hostname: 'covers.openlibrary.org' }
    ],
    // Serve covers crisply on retina: request widths that cover 2x DPR for
    // the hero (232px) and card (up to ~300px) slots, in modern formats.
    deviceSizes: [320, 420, 640, 768, 1024, 1280],
    imageSizes: [64, 96, 128, 192, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  }
};

module.exports = nextConfig;
