"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import Image from "next/image";

import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, login } = useUser();

  useEffect(() => {
    if (user) {
      const returnEvent = sessionStorage.getItem("returnEvent");

      if (returnEvent) {
        sessionStorage.removeItem("returnEvent");
        router.push(`/events/${returnEvent}`);
      } else {
        router.push("/events");
      }
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      const returnEvent = sessionStorage.getItem("returnEvent");

      if (returnEvent) {
        sessionStorage.removeItem("returnEvent");
        router.push(`/events/${returnEvent}`);
      } else {
        router.push("/events");
      }
    } catch {
      // Handle error silently or show a toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Implement Google OAuth login
      // This is a placeholder - you'll need to implement the actual Google OAuth flow
      // TODO: Implement Google OAuth login
    } catch {
      // Handle error silently or show a toast notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-background/80 p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Left side - Visual */}
        <div className="relative hidden h-[600px] overflow-hidden rounded-2xl md:block">
          <Image
            fill
            priority
            alt="Login"
            className="object-cover"
            src="/images/login-illustration.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="mb-2 text-3xl font-bold">Welcome Back!</h2>
            <p className="text-white/80">Login to continue your journey</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="mx-auto w-full max-w-md border border-foreground/10 bg-background/50 backdrop-blur-lg">
          <CardBody className="p-8">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold">Login</h1>
              <p className="text-foreground/60">Enter your credentials to continue</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  required
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  required
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input className="rounded border-foreground/20" type="checkbox" />
                  <span className="text-sm text-foreground/60">Remember me</span>
                </label>
                <a className="text-sm text-primary hover:underline" href="/forgot-password">
                  Forgot password?
                </a>
              </div>

              <Button className="w-full" isLoading={isLoading} type="submit">
                Login
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-foreground/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-foreground/60">Or continue with</span>
                </div>
              </div>

              <Button
                className="w-full"
                isLoading={isLoading}
                type="button"
                variant="bordered"
                onClick={handleGoogleLogin}
              >
                <Image
                  alt="Google"
                  className="mr-2"
                  height={20}
                  src="/images/google-icon.svg"
                  width={20}
                />
                Login with Google
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-foreground/60">
              {"Don't have an account? "}
              <a className="text-primary hover:underline" href="/signup">
                Sign up
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
