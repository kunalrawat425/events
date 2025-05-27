"use client";

import { useState } from "react";
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { login, user } = useUser();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    setSubmitError("");

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Authentication failed");
      }

      const userData = await response.json();
      
      // Update the user state with the response data
      await login(userData.email, userData.password);
      
      // Redirect based on role
      router.push(role === "publisher" ? "/publisher/dashboard" : "/profile");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Authentication failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/auth/google", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(error.message || "Google login failed");
      }

      const userData = await response.json();

      await login(userData.email, userData.password);
      router.push(role === "publisher" ? "/publisher/dashboard" : "/profile");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Google login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getIllustration = () => {
    if (role === "publisher") {
      return "/images/auth/login.png";
    }

    return "/images/auth/login.png";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left side - Image */}
        <div className="hidden md:flex flex-col justify-center items-center">
          <div className="relative w-full h-[600px]">
            <Image
              fill
              priority
              alt={`${role} login illustration`}
              className="object-contain"
              src={getIllustration()}
            />
          </div>
          <h2 className="text-2xl font-bold mt-8 text-center">{getTitle()}</h2>
          <p className="text-default-500 text-center mt-2">{getSubtitle()}</p>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full">
          <CardHeader className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-default-500">Login to your {role} account</p>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              <Button
                className="w-full"
                isLoading={isLoading}
                startContent={
                  <svg
                    className="w-5 h-5"
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

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  required
                  classNames={{
                    label: "text-sm font-medium",
                    input: "text-base",
                    description: "text-xs text-default-500",
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
                    label: "text-sm font-medium",
                    input: "text-base",
                    description: "text-xs text-default-500",
                  }}
                  disabled={isLoading}
                  errorMessage={errors.password}
                  isInvalid={!!errors.password}
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {submitError && (
                  <p className="text-danger text-sm">{submitError}</p>
                )}
                <Button
                  className="w-full"
                  color="primary"
                  isLoading={isLoading}
                  size="lg"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex flex-col gap-2 w-full">
              <Button
                as={Link}
                className="w-full"
                disabled={isLoading}
                href={`/signup?role=${role}`}
                variant="light"
              >
                Don&apos;t have an account?Login
              </Button>


              
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
