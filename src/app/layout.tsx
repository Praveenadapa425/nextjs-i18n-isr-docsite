import "./globals.css";
import Sidebar from "../components/Sidebar";
import LanguageSwitcher from "../components/LanguageSwitcher";
import VersionSelector from "../components/VersionSelector";
import ThemeProvider from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import Search from "../components/Search";

export const metadata = {
  title: "Docs Portal",
  description: "Multi-language documentation site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen bg-gray-50">
        <ThemeProvider>
        
        {/* Sidebar */}
        <aside
          className="w-64 border-r bg-white p-4"
          data-testid="sidebar"
        >
          <h2 className="font-bold text-lg mb-4">
            Docs
          </h2>

          <Search docs={[
            { title: "Introduction", content: "Welcome to the documentation portal. This is the English version of the documentation." },
            { title: "Getting Started", content: "This project demonstrates incremental static regeneration, internationalization, and versioned documentation." },
            { title: "Introducción", content: "Bienvenido al portal de documentación. Esta es la versión en español." }
          ]} />

          <Sidebar locale="en" version="v1" />
        </aside>

        {/* Main Area */}
        <div className="flex flex-1 flex-col">
          
          {/* Header */}
          <header className="flex items-center justify-between border-b bg-white p-4">
            <span className="font-semibold">
              Header
            </span>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <VersionSelector />
              <ThemeToggle />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>

        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
