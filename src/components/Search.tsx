"use client";

import { useEffect, useState, useRef } from "react";
import { Index } from "flexsearch";
import { useTranslations } from "../hooks/useTranslations";

interface Doc {
  title: string;
  content: string;
}

export default function Search({ docs }: { docs: Doc[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const indexRef = useRef<Index<string> | null>(null);
  const { t } = useTranslations();

  useEffect(() => {
    indexRef.current = new Index({ tokenize: "forward" });
    docs.forEach((doc, i) => {
      indexRef.current?.add(i, doc.content);
    });
  }, [docs]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (indexRef.current) {
      const res = await indexRef.current.search(value);
      setResults(res.map((id) => {
        const index = typeof id === 'string' ? parseInt(id) : id;
        return docs[index].title;
      }));
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-1"
        placeholder={`${t('search')}...`}
      />

      <div data-testid="search-results">
        {results.length === 0 && query && (
          <p data-testid="search-no-results">{t('no_results_found')}</p>
        )}
        {results.map((r, i) => (
          <p key={i}>{r}</p>
        ))}
      </div>
    </div>
  );
}