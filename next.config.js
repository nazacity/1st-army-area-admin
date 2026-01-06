const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
module.exports = {
  // reactStrictMode: true,
  ...nextTranslate({
    loadLocaleFrom: (lang, ns) =>
      import(`./src/translation/locales/${lang}/${ns}.json`).then(
        (m) => m.default
      ),
    locales: ['th', 'en'],
    defaultLocale: 'th',
    localeDetection: false,

    pages: {
      '*': ['common', 'errors'],
    },
  }),
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
