import "./globals.css";

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
    <html lang="en">
      <body className="flex h-screen bg-gray-50">
        
        {/* Sidebar */}
        <aside
          className="w-64 border-r bg-white p-4"
          data-testid="sidebar"
        >
          <h2 className="font-bold text-lg mb-4">
            Docs
          </h2>
          <p className="text-sm text-gray-500">
            Sidebar placeholder
          </p>
        </aside>

        {/* Main Area */}
        <div className="flex flex-1 flex-col">
          
          {/* Header */}
          <header className="flex items-center justify-between border-b bg-white p-4">
            <span className="font-semibold">
              Header
            </span>

            <div className="flex gap-4">
              {/* Language Switcher Placeholder */}
              <div data-testid="language-switcher">
                🌐
              </div>

              {/* Theme Toggle Placeholder */}
              <button data-testid="theme-toggle">
                🌓
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
