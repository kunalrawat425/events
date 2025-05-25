"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { AuthClient } from "./AuthClient";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (user) {
      // If user is already logged in, redirect to the return URL or dashboard
      const returnTo = localStorage.getItem("returnTo") || redirect || "/dashboard";
      localStorage.removeItem("returnTo"); // Clean up
      router.push(returnTo);
    }
  }, [user, redirect, router]);

  return <AuthClient />;
} 