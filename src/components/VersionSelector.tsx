"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const versions = ["v1", "v2", "v3"];

export default function VersionSelector() {
  const pathname = usePathname();

  return (
    <div data-testid="version-selector" className="flex gap-2">
      {versions.map((version) => {
        const newPath = pathname.replace(/\/v[0-9]+/, `/${version}`);

        return (
          <Link
            key={version}
            href={newPath}
            data-testid={`version-option-${version}`}
            className="text-sm hover:underline"
          >
            {version}
          </Link>
        );
      })}
    </div>
  );
}