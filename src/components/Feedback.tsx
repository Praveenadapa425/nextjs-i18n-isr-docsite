"use client";

import { useState } from "react";
import { useTranslations } from "../hooks/useTranslations";

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslations();

  return (
    <div className="mt-8">
      <textarea
        data-testid="feedback-input"
        className="border w-full p-2"
        placeholder={t('leave_feedback')}
      />

      <button
        data-testid="feedback-submit"
        onClick={() => setSubmitted(true)}
        className="border px-2 py-1 mt-2"
      >
        {t('submit')}
      </button>

      {submitted && (
        <p data-testid="feedback-success-message">
          {t('thank_you_feedback')}
        </p>
      )}
    </div>
  );
}