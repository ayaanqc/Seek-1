/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Cover art courtesy of the Open Library Covers API (openlibrary.org).
      { protocol: 'https', hostname: 'covers.openlibrary.org' }
    ]
  }
};

module.exports = nextConfig;
