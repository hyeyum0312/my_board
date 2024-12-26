/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  instrumentationHook: true,
  experimental: { instrumentationHook: true },
};

export default nextConfig;
