module.exports = {
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
};
