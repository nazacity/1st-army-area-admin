const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
module.exports = {
  // reactStrictMode: true,
  ...nextTranslate(),
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    BASE_API_URL: process.env.BASE_API_URL,
  },
};
