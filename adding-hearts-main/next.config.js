/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "http://localhost:3000/",
      "localhost",
      "https://kidscareethio.org",
    ],
  },
};

module.exports = nextConfig;
