//src/app/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: { properties: ["^data-custom$"] },
    styledComponents: true,
    removeConsole: true,
    relay: {
      src: "./",
      artifactDirectory: "./__tests__",
      language: "typescript",
      eagerEsModules: false,
    },
  },
  images: {
    domains: ["oaidalleapiprodscus.blob.core.windows.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
