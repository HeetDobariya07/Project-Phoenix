import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'meet2304-project-phoenix.hf.space',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
