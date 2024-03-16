/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        reactRemoveProperties: { properties: ['^data-custom$'] },
        styledComponents: true,
        removeConsole: true,
        relay: {
            // This should match relay.config.js
            src: './',
            artifactDirectory: './__tests__',
            language: 'typescript',
            eagerEsModules: false,
        },
    },
    images: {
        remotePatterns : [
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net',
                port: '',
                pathname: '/**',
            },
        ],
        domains: ['images.unsplash.com'],
    }
};

export default nextConfig;
