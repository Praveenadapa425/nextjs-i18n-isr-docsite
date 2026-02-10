import fs from "fs";
import path from "path";
import Link from "next/link";

type SidebarProps = {
  locale: string;
  version: string;
};

export default function Sidebar({ locale, version }: SidebarProps) {
  const docsPath = path.join(process.cwd(), "docs", version, locale);

  if (!fs.existsSync(docsPath)) {
    return null;
  }

  const files = fs
    .readdirSync(docsPath)
    .filter((file) => file.endsWith(".mdx"));

  return (
    <nav data-testid="sidebar" className="space-y-2">
      {files.map((file) => {
        const slug = file.replace(".mdx", "");

        return (
          <Link
            key={slug}
            href={`/${locale}/docs/${version}/${slug}`}
            data-testid={`sidebar-nav-link-${slug}`}
            className="block text-sm text-blue-600 hover:underline"
          >
            {slug}
          </Link>
        );
      })}
    </nav>
  );
}