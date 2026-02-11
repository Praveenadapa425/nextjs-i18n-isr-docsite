"use client";

import { useState } from "react";

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mt-8">
      <textarea
        data-testid="feedback-input"
        className="border w-full p-2"
        placeholder="Leave feedback..."
      />

      <button
        data-testid="feedback-submit"
        onClick={() => setSubmitted(true)}
        className="border px-2 py-1 mt-2"
      >
        Submit
      </button>

      {submitted && (
        <p data-testid="feedback-success-message">
          Thank you for your feedback!
        </p>
      )}
    </div>
  );
}