/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
    REDIS_URL: process.env.REDIS_URL,
  },
};

export default nextConfig;
