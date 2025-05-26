"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import Image from "next/image";

import { useUser } from "@/context/UserContext";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, signup } = useUser();

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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");

      return;
    }
    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name);
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

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      // Implement Google OAuth signup
      // TODO: Implement Google OAuth signup
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
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - Visual */}
        <div className="hidden md:block relative h-[600px] rounded-2xl overflow-hidden">
          <Image
            fill
            priority
            alt="Sign Up"
            className="object-cover"
            src="/images/auth/signup.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Join Us Today!</h2>
            <p className="text-white/80">
              Create your account and start exploring events
            </p>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <Card className="w-full max-w-md mx-auto bg-background/50 backdrop-blur-lg border border-foreground/10">
          <CardBody className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-foreground/60">
                Fill in your details to get started
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  required
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  required
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="relative">
                  <Input
                    required
                    label="Password"
                    name="password"
                    placeholder="Create a password"
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
                        className="w-5 h-5"
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
                        className="w-5 h-5"
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
                <div className="relative">
                  <Input
                    required
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    className="absolute right-3 top-[38px] text-foreground/60 hover:text-foreground"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-5 h-5"
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
                        className="w-5 h-5"
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

              <Button className="w-full" isLoading={isLoading} type="submit">
                Create Account
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-foreground/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-foreground/60">
                    Or sign up with
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                isLoading={isLoading}
                type="button"
                variant="bordered"
                onClick={handleGoogleSignup}
              >
                <Image
                  alt="Google"
                  className="mr-2"
                  height={20}
                  src="/images/google-icon.svg"
                  width={20}
                />
                Sign up with Google
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-foreground/60">
              Already have an account?{" "}
              <a className="text-primary hover:underline" href="/login">
                Sign in
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
