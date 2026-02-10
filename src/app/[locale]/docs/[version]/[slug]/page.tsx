import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    locale: string;
    version: string;
    slug: string;
  };
};

// ✅ REQUIRED: Incremental Static Regeneration (60s)
export const revalidate = 60;

export default async function DocPage({ params }: PageProps) {
  const { locale, version, slug } = await params;

  // Validate that all required parameters are present
  if (!locale || !version || !slug) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "docs",
    version,
    locale,
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  
  // Normalize line endings to prevent hydration mismatches
  const normalizedContent = content.replace(/\r\n/g, '\n');

  return (
    <article className="prose max-w-none">
      {/* REQUIRED FOR AUTOMATED TESTS */}
      <div data-testid="doc-content">
        <h1>{data.title || 'Documentation'}</h1>
        <pre>{normalizedContent}</pre>
      </div>
    </article>
  );
}