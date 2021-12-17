const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  env: {
    SERVER_URL: "http://localhost:5000/api",
    BLOG_URL: "http://localhost:3000",
  },
  poweredByHeader: false,
  generateEtags: false,
});
