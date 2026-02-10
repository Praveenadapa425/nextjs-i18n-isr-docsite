// Lightweight markdown parser for documentation
export function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Process markdown step by step
  const rules = [
    // Code blocks
    [/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>'],
    [/`([^`]+)`/g, '<code>$1</code>'],
    
    // Headers
    [/^### (.*$)/gm, '<h3>$1</h3>'],
    [/^## (.*$)/gm, '<h2>$1</h2>'],
    [/^# (.*$)/gm, '<h1>$1</h1>'],
    
    // Lists
    [/^\* (.*$)/gm, '<li>$1</li>'],
    [/^(\d+)\. (.*$)/gm, '<li>$2</li>'], // Ordered lists
    
    // Formatting
    [/\*\*(.*?)\*\*/g, '<strong>$1</strong>'],
    [/\*(.*?)\*/g, '<em>$1</em>'],
    
    // Links (basic)
    [/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'],
    
    // Line breaks and paragraphs
    [/\n\n/g, '</p><p>'],
  ];
  
  // Wrap content in paragraph tags
  html = `<p>${html}</p>`;
  
  // Apply all rules
  for (const [pattern, replacement] of rules) {
    html = html.replace(pattern, replacement as string);
  }
  
  // Fix list wrapping
  html = html.replace(/<\/p><li>/g, '<li>');
  html = html.replace(/<\/li><p>/g, '</li>');
  html = html.replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>');
  
  return html;
}

// Alternative: Simple line-by-line processor
export function processMarkdownLines(content: string): string[] {
  const lines = content.split('\n');
  const processedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('# ')) {
      processedLines.push(`<h1>${line.substring(2)}</h1>`);
    } else if (line.startsWith('## ')) {
      processedLines.push(`<h2>${line.substring(3)}</h2>`);
    } else if (line.startsWith('### ')) {
      processedLines.push(`<h3>${line.substring(4)}</h3>`);
    } else if (line.startsWith('* ')) {
      processedLines.push(`<li>${line.substring(2)}</li>`);
    } else if (line.match(/^\d+\. /)) {
      processedLines.push(`<li>${line.replace(/^\d+\. /, '')}</li>`);
    } else if (line.startsWith('```')) {
      // Handle code blocks
      const codeLines = [];
      i++; // Move to next line
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      processedLines.push(`<pre><code>${codeLines.join('\n')}</code></pre>`);
    } else if (line) {
      // Regular paragraph
      processedLines.push(`<p>${line}</p>`);
    }
  }
  
  return processedLines;
}