const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'es', 'fr', 'de'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
};

// Also export for ESM imports
exports.i18n = module.exports.i18n;