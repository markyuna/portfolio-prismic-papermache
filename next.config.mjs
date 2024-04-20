const nextConfig = {
  compiler: {
    reactRemoveProperties: { properties: ['^data-custom$'] },
    styledComponents: true,
    removeConsole: true,
    relay: {
      src: './',
      artifactDirectory: './__tests__',
      language: 'typescript',
      eagerEsModules: false,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
