/** @type {import('next').NextConfig} */
const compose = require('next-compose')

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
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
      },
    })
    return config
  },
}

module.exports = nextConfig
