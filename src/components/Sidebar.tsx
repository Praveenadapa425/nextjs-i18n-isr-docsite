"use client";

import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  navItems: { slug: string; title: string }[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav 
      data-testid="sidebar" 
      className={`h-full flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Sidebar Header with Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="font-bold text-lg">Docs</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-200"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>
      
      {/* Navigation Links */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => {
            const slug = item.slug.split('/').pop() || '';
            return (
              <Link
                key={item.slug}
                href={item.slug}
                data-testid={`sidebar-nav-link-${slug}`}
                className={`block text-sm hover:bg-gray-100 rounded px-2 py-1 ${isCollapsed ? 'text-center' : 'text-left'}`}
                title={isCollapsed ? item.title : undefined}
              >
                {isCollapsed ? item.title.charAt(0).toUpperCase() : item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}