/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    googleAPIKey: process.env.googleAPIKey,
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
  },
};
// nextConfig;
