/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.elrond.com",
      "devnet-media.elrond.com",
      "placehold.co",
      "images.unsplash.com",
      "pbs.twimg.com",
      "abs.twimg.com",
      "app.ashswap.io",
      "www.dextools.io",
    ],
  },
  transpilePackages: ["@multiversx/sdk-dapp"],
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
