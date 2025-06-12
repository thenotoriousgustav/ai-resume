import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["pdf-parse"],
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.ts",
    },
  },
}

export default nextConfig
