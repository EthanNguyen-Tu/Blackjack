import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/Blackjack",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
