"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import Image from "next/image";

import { useUser } from "@/context/UserContext";

export default function PublisherLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      router.push("/publisher/dashboard");
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
      // TODO: Implement Google OAuth login
    } catch {
      // Handle error silently or show a toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-background/80 p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Left side - Visual */}
        <div className="relative hidden h-[600px] overflow-hidden rounded-2xl md:block">
          <Image
            fill
            priority
            alt="Publisher Login"
            className="object-cover"
            src="/images/publisher-login-illustration.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="mb-2 text-3xl font-bold">Welcome Back!</h2>
            <p className="text-white/80">Manage your events and grow your business</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="mx-auto w-full max-w-md border border-foreground/10 bg-background/50 backdrop-blur-lg">
          <CardBody className="p-8">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold">Publisher Login</h1>
              <p className="text-foreground/60">Access your event management dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  required
                  label="Business Email"
                  name="email"
                  placeholder="Enter your business email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="relative">
                  <Input
                    required
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    className="absolute right-3 top-[38px] text-foreground/60 hover:text-foreground"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input className="form-checkbox h-4 w-4 text-primary" type="checkbox" />
                  <span className="ml-2 text-sm text-foreground/60">Remember me</span>
                </label>
                <a
                  className="text-sm text-primary hover:underline"
                  href="/publisher/forgot-password"
                >
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
              Don&apos;t have a publisher account?{" "}
              <a className="text-primary hover:underline" href="/publisher/signup">
                Login
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
