import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CopyButton from "../../../../../components/CopyButton";
import Feedback from "../../../../../components/Feedback";
import ActiveTOC from "../../../../../components/ActiveTOC";
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

  // Validate route parameters to prevent path traversal
  const isValidParam = (param: string) => {
    return /^[a-zA-Z0-9\-_]+$/.test(param) && param.length <= 50;
  };

  if (!isValidParam(locale) || !isValidParam(version) || !isValidParam(slug)) {
    notFound();
  }

  let content = '';
  let data: { title?: string } = {};

  try {
    if (!fs.existsSync(filePath)) {
      notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const result = matter(fileContent);
    content = result.content;
    data = result.data;
  } catch (error) {
    console.error('Error reading documentation file:', error);
    notFound();
  }

  // Extract headings for table of contents
  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("##"))
    .map((line) => line.replace("## ", ""))
    .map((heading) => {
      const id = heading.toLowerCase().replace(/\s+/g, "-");
      return { text: heading, id };
    });

  // Active section tracking will be handled by client component

  return (
    <div className="flex">
      {/* Table of Contents */}
      <ActiveTOC headings={headings} />

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
      
      
    </div>
  );
}
