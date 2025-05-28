"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useUser } from "@/contexts/UserContext";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "user" | "publisher";
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Store the current path as the redirect destination
        const redirectPath = encodeURIComponent(pathname);
        router.push(`/login?redirect=${redirectPath}`);
      } else if (requiredRole && user.role !== requiredRole) {
        // Redirect to home if user doesn't have required role
        router.push("/");
      }
    }
  }, [user, isLoading, requiredRole, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
      </div>
    );
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
