import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.S3_BUCKET}.s3.${process.env.REGION}.amazonaws.com`,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: `${process.env.S3_BUCKET}.s3.amazonaws.com`,
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["dh-cake-letter.s3.us-east-1.amazonaws.com"],
  },
};

export default nextConfig;
