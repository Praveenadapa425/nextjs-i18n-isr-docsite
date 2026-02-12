import "./globals.css";
import SidebarServer from "../components/SidebarServer";
import LanguageSwitcher from "../components/LanguageSwitcher";
import VersionSelector from "../components/VersionSelector";
import ThemeProvider from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import Search from "../components/Search";

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
        <aside className="bg-white border-r flex-shrink-0">
          <SidebarServer locale="en" version="v1" />
        </aside>

        {/* Main Area */}
        <div className="flex flex-1 flex-col">
          
          {/* Header */}
          <header className="flex items-center justify-between border-b bg-white p-4">
            <span className="font-semibold">
              Header
            </span>

            <div className="flex items-center gap-4">
              <Search docs={[
                { title: "Introduction", content: "Welcome to the documentation portal. This is the English version of the documentation." },
                { title: "Getting Started", content: "This project demonstrates incremental static regeneration, internationalization, and versioned documentation." },
                { title: "Introducción", content: "Bienvenido al portal de documentación. Esta es la versión en español." }
              ]} />
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
