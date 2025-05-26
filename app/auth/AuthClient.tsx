"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { LoginForm } from "./LoginForm";

export function AuthClient() {
  const _router = useRouter();
  const searchParams = useSearchParams();
  const _initialTab = searchParams.get("tab") || "login";

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
