/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const compose = require('next-compose')

const nextConfig = {
    reactStrictMode: false,
    // experimental: {
    //   externalDir: true,
    // },
    images: { domains: ['api.quadspace.io'], formats: ['image/avif', 'image/webp'], },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        'react/no-unescaped-entities': 'off',
        ignoreBuildErrors: "off",
        rules: {
            '@next/next/no-page-custom-font': 'off',
        },
    },
    // webpack(config, options) {
    //   config.module.rules.push({
    //     test: /\.mp3$/,
    //     use: {
    //       loader: 'file-loader',
    //     },
    //   })
    //   return config
    // },

    async headers() {
        return [{
            source: '/api/(.*)',
            headers: [
                { key: 'Access-Control-Allow-Credentials', value: 'true' },
                { key: 'Access-Control-Allow-Origin', value: '*' },
                {
                    key: 'Access-Control-Allow-Methods',
                    value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                },
                {
                    key: 'Access-Control-Allow-Headers',
                    value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                },
            ],
        }, ]
    },
}

module.exports = nextConfig