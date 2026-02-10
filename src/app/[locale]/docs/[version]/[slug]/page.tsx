import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
// Custom markdown parser
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Simple markdown conversion rules
  const rules = [
    // Headers
    [/^### (.*$)/gm, '<h3>$1</h3>'],
    [/^## (.*$)/gm, '<h2>$1</h2>'],
    [/^# (.*$)/gm, '<h1>$1</h1>'],
    // Bold and italic
    [/\*\*(.*)\*\*/gim, '<strong>$1</strong>'],
    [/\*(.*)\*/gim, '<em>$1</em>'],
    // Code
    [/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>'],
    [/`(.*?)`/gim, '<code>$1</code>'],
    // Paragraphs
    [/\n\n/g, '</p><p>'],
  ];
  
  html = `<p>${html}</p>`;
  for (const [pattern, replacement] of rules) {
    html = html.replace(pattern, replacement as string);
  }
  
  return html;
}

type PageProps = {
  params: {
    locale: string;
    version: string;
    slug: string;
  };
};

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
  
  // Convert markdown to HTML
  const htmlContent = markdownToHtml(normalizedContent);

  return (
    <article className="prose max-w-none">
      {/* REQUIRED FOR AUTOMATED TESTS */}
      <div data-testid="doc-content">
        <h1>{data.title || 'Documentation'}</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </article>
  );
}
