"use client";

import { LoginForm } from "./LoginForm";

export function AuthClient() {
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
