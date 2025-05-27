"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import Link from "next/link";

import { useUser } from "@/contexts/UserContext";

interface FormErrors {
  email?: string;
  password?: string;
}

export const LoginClient = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { login } = useUser();

  // Load saved email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem("currentUser");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (currentUser && isLoggedIn === "true") {
      const user = JSON.parse(currentUser);
      if (user.role === "publisher") {
        router.push("/publisher/dashboard");
      } else {
        router.push("/profile");
      }
    }
  }, [router]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    setSubmitError("");

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      // Get users from localStorage
      const usersStr = localStorage.getItem("users");
      const users = usersStr ? JSON.parse(usersStr) : [];
      console.log("Found users:", users);

      const user = users.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );
      console.log("Found user:", user);

      if (!user) {
        setSubmitError("Invalid email or password. Please try again.");
        return;
      }

      // Save current user to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("isLoggedIn", "true");

      console.log("Login successful, redirecting...");

      // Use router.push for client-side navigation
      if (user.role === "publisher") {
        await router.push("/publisher/dashboard");
      } else {
        await router.push("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setSubmitError("");

    try {
      // For demo purposes, create a mock Google user
      const mockGoogleUser = {
        email: "google@example.com",
        name: "Google User",
        role: role,
        provider: "google"
      };

      console.log("Creating mock Google user:", mockGoogleUser);

      // Save to localStorage
      localStorage.setItem("currentUser", JSON.stringify(mockGoogleUser));
      localStorage.setItem("userEmail", mockGoogleUser.email);
      localStorage.setItem("isLoggedIn", "true");

      // Add to users list if not exists
      const usersStr = localStorage.getItem("users");
      const users = usersStr ? JSON.parse(usersStr) : [];
      if (!users.find((u: any) => u.email === mockGoogleUser.email)) {
        users.push(mockGoogleUser);
        localStorage.setItem("users", JSON.stringify(users));
      }

      console.log("Google login successful, redirecting...");

      // Use router.push for client-side navigation
      if (role === "publisher") {
        await router.push("/publisher/dashboard");
      } else {
        await router.push("/profile");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Google login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getIllustration = () => {
    return "/images/auth/login.jpg";
  };

  const getTitle = () => {
    if (role === "publisher") {
      return "Welcome back, Publisher!";
    }
    return "Welcome back to Events";
  };

  const getSubtitle = () => {
    if (role === "publisher") {
      return "Manage your events and reach your audience";
    }
    return "Stay informed with personalized event alerts";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-50 to-background p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left side - Image */}
        <div className="hidden flex-col items-center justify-center md:flex">
          <div className="relative h-[600px] w-full">
            <Image
              src={getIllustration()}
              alt="Authentication"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
              quality={100}
            />
          </div>
          <h2 className="mt-8 text-center text-2xl font-bold">{getTitle()}</h2>
          <p className="mt-2 text-center text-default-500">{getSubtitle()}</p>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full">
          <CardHeader className="flex flex-col gap-1 px-8 pt-8">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-default-500">Login to your {role} account</p>
          </CardHeader>
          <CardBody className="px-8 py-8">
            <div className="flex flex-col gap-8">
              <Button
                className="w-full"
                isLoading={isLoading}
                startContent={
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                }
                variant="bordered"
                onPress={handleGoogleLogin}
              >
                Continue with Google
              </Button>

              <div className="relative flex items-center justify-center">
                <Divider className="absolute w-full" />
                <span className="relative bg-background px-4 text-sm text-default-500">
                  or continue with email
                </span>
              </div>

              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <Input
                      required
                      classNames={{
                        label: "text-sm font-medium mb-3",
                        input: "text-base",
                        description: "text-xs text-default-500 mt-2",
                        inputWrapper: "h-12",
                        errorMessage: "text-danger text-sm mt-1",
                      }}
                      description="We'll never share your email with anyone else"
                      disabled={isLoading}
                      errorMessage={errors.email}
                      isInvalid={!!errors.email}
                      label="Email"
                      name="email"
                      placeholder="Enter your email address"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <Input
                      required
                      classNames={{
                        label: "text-sm font-medium mb-3",
                        input: "text-base",
                        description: "text-xs text-default-500 mt-2",
                        inputWrapper: "h-12",
                        errorMessage: "text-danger text-sm mt-1",
                      }}
                      disabled={isLoading}
                      errorMessage={errors.password}
                      isInvalid={!!errors.password}
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg
                              className="h-5 w-5 text-default-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5 text-default-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      }
                    />
                  </div>
                </div>
                {submitError && (
                  <div className="rounded-md bg-danger-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-danger" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-danger">{submitError}</p>
                      </div>
                    </div>
                  </div>
                )}
                <Button
                  className="w-full"
                  color="primary"
                  isLoading={isLoading}
                  size="lg"
                  type="submit"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </div>
          </CardBody>
          <CardFooter className="px-8 pb-8">
            <div className="flex w-full flex-col gap-2">
              <Button
                as={Link}
                className="w-full"
                disabled={isLoading}
                href={`/signup?role=${role}`}
                variant="light"
              >
                Don&apos;t have an account? Signup
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
