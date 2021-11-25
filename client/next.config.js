/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "http://localhost:5000/api",
  },
  poweredByHeader: false,
  generateEtags: false,
};
