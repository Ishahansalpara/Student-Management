/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // 👈 Enables better debugging + SSR support
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
