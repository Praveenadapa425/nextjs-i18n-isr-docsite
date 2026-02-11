import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/<\/li>\s*<li>/gim, '</li><li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|p|u|o|l|c])/gim, '<p>')
    .replace(/(?!<\/[h|p|u|o|l|c])$/gim, '</p>')
    // Line breaks
    .replace(/\n/g, '<br>');
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
  
  // Convert markdown to HTML
  const htmlContent = markdownToHtml(content);

  return (
    <article className="prose prose-sm max-w-none prose-p:my-2 prose-h1:mb-4 prose-h2:mb-3 prose-pre:my-3">
      <div data-testid="doc-content">
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </article>
  );
}
