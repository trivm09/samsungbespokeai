/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
  },
};

export default nextConfig;
