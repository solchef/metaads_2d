/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    'react/no-unescaped-entities': 'off',
    ignoreBuildErrors: true,
    rules: {
      '@next/next/no-page-custom-font': 'off',
    },
  },
}

module.exports = nextConfig
