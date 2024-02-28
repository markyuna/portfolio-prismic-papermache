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
};

export default nextConfig;
