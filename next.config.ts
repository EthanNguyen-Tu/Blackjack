import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
export const pathPrefix = isProd ? "/Blackjack" : "";

const nextConfig: NextConfig = {
    output: "export",
    basePath: pathPrefix,
    assetPrefix: pathPrefix,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
