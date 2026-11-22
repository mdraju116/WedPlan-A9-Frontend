import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    
      {
        protocol: "https",
        hostname: "tegamilton.com",
      },
     {
            protocol: "https",
            hostname: "www.fearlessphotographers.com",
        },
        {
            protocol: "https",
            hostname: "storage.alboom.ninja",
        },
       
        {
            protocol: "https",
            hostname: "www.parcodianabellavista.com",
        },
        {
            protocol: "https",
            hostname: "assets.hamaravenue.com",
        },
        {
            protocol: "https",
            hostname: "i0.wp.com",
        },
        {
            protocol: "https",
            hostname: "7b2c6b70e6b4b3d544b9-b6cacab5fabe90a3827e8eb927056306.ssl.cf1.rackcdn.com",
        },
        {
            protocol: "https",
            hostname: "img.partyslate.com",
        },
        {
            protocol: "https",
            hostname: "www.alexandrebotelho.com.br",
        },

    ],
  },

  experimental: {
    agentFeedback: true,
  },

  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

};

export default nextConfig;
