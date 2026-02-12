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
        aria-label={t('leave_feedback')}
        rows={4}
      />

      <button
        data-testid="feedback-submit"
        onClick={() => setSubmitted(true)}
        className="border px-2 py-1 mt-2"
        aria-label={t('submit_feedback') || 'Submit feedback'}
        type="button"
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