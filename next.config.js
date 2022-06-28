/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },

  ignoreBuildErrors: true,
}

module.exports = nextConfig
