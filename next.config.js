/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  serverRuntimeConfig: {
    PEXELS_KEY: process.env.PEXELS_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
    ],
  },
};

module.exports = nextConfig;
