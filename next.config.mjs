//next.config.js

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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "/**", // Se permiten todas las rutas bajo el dominio especificado
      },
    ],
  },
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
