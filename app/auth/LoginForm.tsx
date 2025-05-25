"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Call login with credentials
      await login(formData.email, formData.password);
      
      // Get the return URL from localStorage or default to dashboard
      const returnTo = localStorage.getItem("returnTo") || "/dashboard";
      localStorage.removeItem("returnTo"); // Clean up
      router.push(returnTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-default-500">Sign in to your account</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
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
            description="Must be at least 8 characters"
            classNames={{
              label: "text-sm font-medium",
              input: "text-base",
              description: "text-xs text-default-500",
            }}
          />
          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}
          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isLoading}
            size="lg"
          >
            Sign In
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-sm text-default-500">
            Don't have an account?{" "}
            <Button
              variant="light"
              onPress={() => router.push("/auth?tab=signup")}
              className="p-0 h-auto"
            >
              Sign Up
            </Button>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
} 