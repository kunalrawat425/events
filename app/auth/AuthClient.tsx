"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useUser } from "@/contexts/UserContext";

export default function AuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") === "signin"
      ? "login"
      : searchParams.get("tab") || "login",
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (activeTab === "signup") {
      if (formData.password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
    }

    try {
      if (activeTab === "login") {
        await login(formData.email, formData.password);
        router.push("/");
      } else {
        await signup(formData.email, formData.password, {
          name: formData.name,
          role: "user" as const,
        });
        router.push("/");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-background py-12">
      <div className="w-full max-w-md px-4">
        <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10">
          <CardHeader className="pb-0">
            <div className="flex space-x-4 mb-6">
              <Button
                className={`flex-1 ${activeTab === "login" ? "bg-primary" : "bg-transparent"}`}
                variant={activeTab === "login" ? "solid" : "light"}
                onPress={() => setActiveTab("login")}
              >
                Login
              </Button>
              <Button
                className={`flex-1 ${activeTab === "signup" ? "bg-primary" : "bg-transparent"}`}
                variant={activeTab === "signup" ? "solid" : "light"}
                onPress={() => setActiveTab("signup")}
              >
                Sign Up
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {activeTab === "signup" && (
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/60 hover:text-foreground"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {activeTab === "signup" && (
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/60 hover:text-foreground"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-danger/10 text-danger text-sm">
                  {error}
                </div>
              )}

              <Button
                className="w-full"
                color="primary"
                isLoading={isLoading}
                type="submit"
              >
                {activeTab === "login" ? "Login" : "Sign Up"}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
