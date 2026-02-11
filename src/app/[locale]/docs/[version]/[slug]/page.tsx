import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CopyButton from "../../../../../components/CopyButton";
import Feedback from "../../../../../components/Feedback";
import React from "react";

interface PreProps {
  children: React.ReactNode;
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

  // Extract headings for table of contents
  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("##"))
    .map((line) => line.replace("## ", ""))
    .map((heading) => {
      const id = heading.toLowerCase().replace(/\s+/g, "-");
      return { text: heading, id };
    });

  return (
    <div className="flex">
      {/* Table of Contents */}
      <aside data-testid="table-of-contents" className="w-64 pr-8">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            data-testid={`toc-link-${h.id}`}
            className="block text-sm py-1 hover:text-blue-600 toc-link"
            data-heading-id={h.id}
          >
            {h.text}
          </a>
        ))}
      </aside>

      {/* Main Content */}
      <article className="prose prose-sm max-w-none prose-p:my-2 prose-h1:mb-4 prose-h2:mb-3 prose-pre:my-3 flex-1">
        <div data-testid="doc-content">
          <h1>{data.title}</h1>
          <MDXRemote
            source={content}
            components={{
              h2: ({ children }: { children: React.ReactNode }) => {
                const text = String(children);
                const id = text.toLowerCase().replace(/\s+/g, "-");
                return (
                  <h2 id={id} className="scroll-mt-20 heading-element">
                    {children}
                  </h2>
                );
              },
              pre: ({ children }: PreProps) => {
                // Simple approach: try to extract text content
                let codeText = '';
                if (React.isValidElement(children)) {
                  const props = children.props as { children?: string };
                  codeText = props.children || '';
                } else if (typeof children === 'string') {
                  codeText = children;
                }
                
                return (
                  <div data-testid="code-block" className="relative">
                    {children}
                    <CopyButton text={codeText} />
                  </div>
                );
              },
            }}
          />
          <Feedback />
        </div>
      </article>
      
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          if (typeof window !== 'undefined') {
            const observer = new IntersectionObserver(
              (entries) => {
                // Reset all TOC links
                document.querySelectorAll('.toc-link').forEach(link => {
                  link.removeAttribute('data-active');
                });
                
                // Mark the active one
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const activeLinkId = entry.target.getAttribute('id');
                    const tocLink = document.querySelector(\`[data-heading-id="\${activeLinkId}"]\`);
                    if (tocLink) {
                      tocLink.setAttribute('data-active', 'true');
                    }
                  }
                });
              },
              { threshold: 0.1, rootMargin: '0% 0% -80% 0%' }
            );
            
            // Observe all heading elements
            document.querySelectorAll('.heading-element').forEach(el => {
              observer.observe(el);
            });
            
            // Clean up on page change
            window.addEventListener('beforeunload', () => {
              document.querySelectorAll('.heading-element').forEach(el => {
                observer.unobserve(el);
              });
            });
          }
        })();
      `}} />
    </div>
  );
}
