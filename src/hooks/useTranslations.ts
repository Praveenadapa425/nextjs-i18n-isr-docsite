import { useTranslation } from 'next-i18next';

export const useTranslations = () => {
  const { t } = useTranslation('common');
  return { t };
};