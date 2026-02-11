'use client';

import { useState, useEffect } from 'react';

export const useScrollSpy = (selectors: string[], offset = 0) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0% -80% 0%` }
    );

    selectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      selectors.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [selectors, offset]);

  return activeId;
};