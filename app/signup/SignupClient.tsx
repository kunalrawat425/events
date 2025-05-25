"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  organization?: string;
}

export const SignupClient = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'user';
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { login } = useUser();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    setSubmitError("");

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Organization validation for publishers
    if (role === 'publisher' && !formData.organization.trim()) {
      newErrors.organization = "Organization name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      const userData = await response.json();
      login(userData);
      router.push(role === 'publisher' ? "/publisher/dashboard" : "/profile");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetch('/api/auth/google', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Google login failed');
      }

      const userData = await response.json();
      login(userData);
      router.push(role === 'publisher' ? "/publisher/dashboard" : "/profile");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getIllustration = () => {
    if (role === 'publisher') {
      return "/images/auth/signup.png";
    }
    return "/images/auth/login.png";
  };

  const getTitle = () => {
    if (role === 'publisher') {
      return "Join as a Publisher";
    }
    return "Join Events Today";
  };

  const getSubtitle = () => {
    if (role === 'publisher') {
      return "Create your publisher account and start managing events";
    }
    return "Create your account and start discovering events";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left side - Image */}
        <div className="hidden md:flex flex-col justify-center items-center">
          <div className="relative w-full h-[600px]">
            <Image
              src={getIllustration()}
              alt={`${role} signup illustration`}
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold mt-8 text-center">
            {getTitle()}
          </h2>
          <p className="text-default-500 text-center mt-2">
            {getSubtitle()}
          </p>
        </div>

        {/* Right side - Signup Form */}
        <Card className="w-full">
          <CardHeader className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-default-500">Sign up as a {role}</p>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              <Button
                className="w-full"
                variant="bordered"
                onPress={handleGoogleLogin}
                isLoading={isLoading}
                startContent={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
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
              >
                Continue with Google
              </Button>

              <div className="relative flex items-center justify-center">
                <Divider className="absolute w-full" />
                <span className="relative bg-background px-4 text-sm text-default-500">
                  or continue with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label={role === 'publisher' ? "Organization Name" : "Full Name"}
                  name="name"
                  placeholder={role === 'publisher' ? "Enter your organization name" : "Enter your full name"}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  errorMessage={errors.name}
                  isInvalid={!!errors.name}
                  description={role === 'publisher' ? "Enter your organization name" : "Enter your full name as you'd like it to appear"}
                  classNames={{
                    label: "text-sm font-medium",
                    input: "text-base",
                    description: "text-xs text-default-500",
                  }}
                />
                {role === 'publisher' && (
                  <Input
                    label="Contact Person"
                    name="organization"
                    placeholder="Enter contact person's name"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    errorMessage={errors.organization}
                    isInvalid={!!errors.organization}
                    description="Enter the name of the person who will manage this account"
                    classNames={{
                      label: "text-sm font-medium",
                      input: "text-base",
                      description: "text-xs text-default-500",
                    }}
                  />
                )}
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  errorMessage={errors.email}
                  isInvalid={!!errors.email}
                  description="We'll never share your email with anyone else"
                  classNames={{
                    label: "text-sm font-medium",
                    input: "text-base",
                    description: "text-xs text-default-500",
                  }}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  errorMessage={errors.password}
                  isInvalid={!!errors.password}
                  description="Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
                  classNames={{
                    label: "text-sm font-medium",
                    input: "text-base",
                    description: "text-xs text-default-500",
                  }}
                />
                {submitError && (
                  <p className="text-danger text-sm">{submitError}</p>
                )}
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={isLoading}
                  size="lg"
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex flex-col gap-2 w-full">
              <Button
                variant="light"
                as={Link}
                href={`/login?role=${role}`}
                disabled={isLoading}
                className="w-full"
              >
                Already have an account? Sign In
              </Button>
              {role === 'user' && (
                <Link href="/signup?role=publisher" className="text-primary underline font-medium text-center">
                  Are you a publisher?
                </Link>
              )}
              {role === 'publisher' && (
                <Link href="/signup?role=user" className="text-primary underline font-medium text-center">
                  Are you a user?
                </Link>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}; 