"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/publisher/dashboard", icon: HomeIcon },
  { name: "Events", href: "/publisher/events", icon: CalendarIcon },
  { name: "Analytics", href: "/publisher/analytics", icon: ChartBarIcon },
  { name: "Attendees", href: "/publisher/attendees", icon: UserGroupIcon },
  { name: "Settings", href: "/publisher/settings", icon: Cog6ToothIcon },
];

export default function PublisherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background/50 backdrop-blur-sm border-r border-foreground/10 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-foreground/10">
            <Link className="text-xl font-bold" href="/publisher/dashboard">
              EventHub
            </Link>
            <button
              className="p-2 rounded-lg hover:bg-foreground/5"
              onClick={() => setIsSidebarOpen(false)}
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-foreground/70 hover:bg-foreground/5"
                  }`}
                  href={item.href}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-foreground/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-foreground/70">Publisher</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-200 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Top Bar */}
        <header className="h-16 border-b border-foreground/10 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center justify-between h-full px-6">
            <button
              className="p-2 rounded-lg hover:bg-foreground/5"
              onClick={() => setIsSidebarOpen(true)}
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 rotate-180" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-foreground/5">
                <Cog6ToothIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
