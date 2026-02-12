'use client';

import { useState, useEffect } from 'react';

export const useActiveSection = (headingIds: string[], offset = 100) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined' || headingIds.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 50}px 0px`,
        threshold: 0.1
      }
    );

    // Observe all heading elements
    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headingIds, offset]);

  return activeId;
};