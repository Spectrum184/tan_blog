/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "http://localhost:5000/api",
    SERVER_STATIC_URL: "http://localhost:8000/api",
  },
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: ["http:/localhost:8000"],
    minimumCacheTTL: 60,
  },
};
