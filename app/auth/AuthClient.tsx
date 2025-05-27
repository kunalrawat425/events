"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";

import { useUser } from "@/contexts/UserContext";

export default function AuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "signup") {
      setActiveTab("signup");
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/auth?tab=${tab}`);
  };

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-50 to-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative hidden h-[600px] overflow-hidden rounded-2xl lg:block">
            <Image
              src="/images/auth/login.jpg"
              alt="Authentication"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
              quality={100}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <Card className="border border-foreground/10 bg-background/50 backdrop-blur-sm p-8 h-[600px] flex flex-col">
                <CardHeader className="pb-0">
                  <div className="mb-6 flex space-x-4">
                    <Button
                      className={`flex-1 ${activeTab === "login" ? "bg-primary" : "bg-transparent"}`}
                      variant={activeTab === "login" ? "solid" : "light"}
                      onPress={() => handleTabChange("login")}
                    >
                      Login
                    </Button>
                    <Button
                      className={`flex-1 ${activeTab === "signup" ? "bg-primary" : "bg-transparent"}`}
                      variant={activeTab === "signup" ? "solid" : "light"}
                      onPress={() => handleTabChange("signup")}
                    >
                      Sign Up
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="flex-1 flex flex-col">
                  <form className="space-y-8 flex-1 flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex-1 space-y-6">
                      {activeTab === "signup" && (
                        <div>
                          <label className="mb-2 block text-sm font-medium" htmlFor="name">
                            Full Name
                          </label>
                          <Input
                            required
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      )}

                      <div>
                        <label className="mb-2 block text-sm font-medium" htmlFor="email">
                          Email Address
                        </label>
                        <Input
                          required
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium" htmlFor="password">
                          Password
                        </label>
                        <div className="relative">
                          <Input
                            required
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <button
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground/60 hover:text-foreground"
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
                          <label className="mb-2 block text-sm font-medium" htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Input
                              required
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder="Confirm your password"
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                              className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground/60 hover:text-foreground"
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    </div>

                    {error && (
                      <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>
                    )}

                    <Button className="w-full" color="primary" isLoading={isLoading} type="submit">
                      {activeTab === "login" ? "Login" : "Sign Up"}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
