"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/contexts/UserContext";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "user" | "publisher";
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push(
          "/auth?redirect=" + encodeURIComponent(window.location.pathname),
        );
      } else if (requiredRole && user.role !== requiredRole) {
        // Redirect to home if user doesn't have required role
        router.push("/");
      }
    }
  }, [user, isLoading, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
