"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoginClient } from "../login/LoginClient";
import { SignupClient } from "../signup/SignupClient";

export default function AuthClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "login";
  const role = searchParams.get("role") || "user";

  useEffect(() => {
    if (tab === "login") {
      router.push("/login");
    } else if (tab === "signup") {
      router.push("/signup");
    }
  }, [tab, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-50 to-background p-4">

    </div>
  );
}
