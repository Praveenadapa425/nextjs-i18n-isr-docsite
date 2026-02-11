"use client";

import { useTranslations } from "../hooks/useTranslations";

export default function CopyButton({ text }: { text: string }) {
  const copy = () => {
    navigator.clipboard.writeText(text);
  };
  const { t } = useTranslations();

  return (
    <button
      data-testid="copy-code-button"
      onClick={copy}
      className="absolute top-1 right-1 text-xs border px-1"
    >
      {t('copy')}
    </button>
  );
}