import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["pdf-parse"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
