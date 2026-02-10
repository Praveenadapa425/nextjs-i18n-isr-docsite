"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const languages = ["en", "es", "fr", "de"];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div data-testid="language-switcher" className="flex gap-2">
      {languages.map((lang) => {
        const newPath = pathname.replace(/^\/(en|es|fr|de)/, `/${lang}`);

        return (
          <Link
            key={lang}
            href={newPath}
            className="text-sm hover:underline"
          >
            {lang.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}