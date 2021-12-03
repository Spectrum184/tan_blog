/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "http://localhost:5000/api",
    BLOG_URL: 'http://localhost:3000'
  },
  poweredByHeader: false,
  generateEtags: false,
};
