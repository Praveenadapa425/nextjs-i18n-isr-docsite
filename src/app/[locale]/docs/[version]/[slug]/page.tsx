import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CopyButton from "../../../../../components/CopyButton";
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

  return (
    <article className="prose prose-sm max-w-none prose-p:my-2 prose-h1:mb-4 prose-h2:mb-3 prose-pre:my-3">
      <div data-testid="doc-content">
        <h1>{data.title}</h1>
        <MDXRemote
          source={content}
          components={{
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
      </div>
    </article>
  );
}
