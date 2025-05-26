"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useUser } from "@/contexts/UserContext";

export default function PublisherAuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "login",
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    organization: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (activeTab === "login") {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, {
          name: formData.name,
          role: "publisher" as const,
          companyName: formData.organization,
        });
      }
      router.push("/publisher/dashboard");
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
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Publisher Portal</h1>
              <p className="text-default-500">
                Manage your events and reach your audience
              </p>
            </div>
            <div className="flex space-x-4">
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
                Sign up
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {activeTab === "signup" && (
                <>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="name"
                    >
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
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="organization"
                    >
                      Organization Name
                    </label>
                    <Input
                      required
                      id="organization"
                      name="organization"
                      placeholder="Enter your organization name"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
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
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  required
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <Button
                className="w-full"
                color="primary"
                isLoading={isLoading}
                size="lg"
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