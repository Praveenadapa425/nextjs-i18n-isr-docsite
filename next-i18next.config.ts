import path from 'path';

export const i18n = {
  locales: ['en', 'es', 'fr', 'de'],
  defaultLocale: 'en',
  localeDetection: false,
};

const config = {
  i18n,
  localePath: path.resolve('./public/locales'),
};

export default config;
