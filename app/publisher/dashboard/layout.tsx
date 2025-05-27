"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/publisher/dashboard", icon: HomeIcon },
  { name: "Events", href: "/publisher/events", icon: CalendarIcon },
  { name: "Attendees", href: "/publisher/attendees", icon: UserGroupIcon },
  { name: "Analytics", href: "/publisher/analytics", icon: ChartBarIcon },
  { name: "Users", href: "/publisher/users", icon: UsersIcon },
];

export default function PublisherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkPublisherAccess = () => {
      try {
        const storedUser = localStorage.getItem("user");
        
        if (!storedUser) {
          router.replace("/auth?tab=login");
          return;
        }

        const user = JSON.parse(storedUser);
        
        if (!user || user.role !== "publisher") {
          router.replace("/unauthorized");
          return;
        }
      } catch {
        router.replace("/auth?tab=login");
      } finally {
        setIsLoading(false);
      }
    };

    checkPublisherAccess();
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-foreground/60">Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <div
        className={`relative bg-background/50 backdrop-blur-lg border-r border-foreground/10 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-background border border-foreground/10 rounded-full p-1 hover:bg-foreground/5"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>

        {/* Logo */}
        <div className="h-16 flex items-center px-4">
          {!isCollapsed && (
            <h1 className="font-bold text-xl">Publisher</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                <item.icon className="w-6 h-6" />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-auto">
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
}
