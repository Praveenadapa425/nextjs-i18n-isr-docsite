'use client';

import { useActiveSection } from "../hooks/useActiveSection";

interface ActiveTOCProps {
  headings: { text: string; id: string }[];
}

export default function ActiveTOC({ headings }: ActiveTOCProps) {
  const headingIds = headings.map(h => h.id);
  const activeId = useActiveSection(headingIds);

  return (
    <aside data-testid="table-of-contents" className="w-64 pr-8">
      <h3 className="font-semibold mb-2">Table of Contents</h3>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          data-testid={`toc-link-${h.id}`}
          className={`block text-sm py-1 hover:text-blue-600 transition-colors ${
            activeId === h.id ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }`}
          data-active={activeId === h.id ? 'true' : 'false'}
        >
          {h.text}
        </a>
      ))}
    </aside>
  );
}