import fs from "fs";
import path from "path";

export interface NavItem {
  slug: string;
  title: string;
}

export function getSidebarNavItems(locale: string, version: string): NavItem[] {
  try {
    const docsPath = path.join(process.cwd(), "docs", version, locale);
    
    if (!fs.existsSync(docsPath)) {
      return [];
    }

    const files = fs
      .readdirSync(docsPath)
      .filter((file) => file.endsWith(".mdx"));
    
    return files.map((file) => {
      const slug = file.replace(".mdx", "");
      // Extract title from frontmatter if possible
      const filePath = path.join(docsPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      
      // Simple frontmatter extraction
      const titleMatch = content.match(/^title:\s*(.*)$/m);
      const title = titleMatch ? titleMatch[1] : slug;
      
      return {
        slug: `/${locale}/docs/${version}/${slug}`,
        title: title.trim()
      };
    });
  } catch (error) {
    console.error('Error reading documentation files:', error);
    return [];
  }
}