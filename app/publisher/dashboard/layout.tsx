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

export default function PublisherDashboardLayout({ children }: { children: React.ReactNode }) {
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
          <p className="text-foreground/60">Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <div
        className={`relative border-r border-foreground/10 bg-background/50 backdrop-blur-lg transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-3 top-6 rounded-full border border-foreground/10 bg-background p-1 hover:bg-foreground/5"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </button>

        {/* Logo */}
        <div className="flex h-16 items-center px-4">
          {!isCollapsed && <h1 className="text-xl font-bold">Publisher</h1>}
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                className={`flex items-center rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                }`}
                href={item.href}
              >
                <item.icon className="h-6 w-6" />
                {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 overflow-auto">
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
}
