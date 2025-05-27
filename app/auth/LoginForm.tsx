"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import { useUser } from "@/contexts/UserContext";

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-default-500">Login to your account</p>
      </CardHeader>
      <CardBody>
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
            label="Email"
            name="email"
            placeholder="Enter your email"
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
            description="Must be at least 8 characters"
            disabled={isLoading}
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {error && <p className="text-sm text-danger">{error}</p>}
          <Button className="w-full" color="primary" isLoading={isLoading} size="lg" type="submit">
            Login
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-sm text-default-500">
            Don&apos;t have an account?{" "}
            <Button
              className="h-auto p-0"
              variant="light"
              onPress={() => router.push("/auth?tab=signup")}
            >
              Login
            </Button>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
