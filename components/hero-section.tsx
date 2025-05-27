"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";

import { useUser } from "@/contexts/UserContext";

const interests = [
  { id: "food", name: "Food & Dining" },
  { id: "music", name: "Music & Concerts" },
  { id: "movies", name: "Movies & Theater" },
  { id: "sports", name: "Sports & Games" },
  { id: "arts", name: "Arts & Culture" },
  { id: "tech", name: "Technology" },
  { id: "business", name: "Business & Networking" },
  { id: "fashion", name: "Fashion & Style" },
  { id: "health", name: "Health & Wellness" },
  { id: "education", name: "Education & Learning" },
];

export const HeroSection = () => {
  const router = useRouter();
  const { user, updateInterests } = useUser();
  const [mounted, setMounted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user?.interests) {
      setSelectedInterests(user.interests);
    }
  }, [user, mounted]);

  const handleSubscribe = async () => {
    if (!user) {
      if (!email) {
        alert("Please enter your email address");

        return;
      }

      if (selectedInterests.length === 0) {
        alert("Please select at least one interest");

        return;
      }

      localStorage.setItem("pendingInterests", JSON.stringify(selectedInterests));
      localStorage.setItem("pendingEmail", email);
      router.push("/signup");

      return;
    }

    if (selectedInterests.length === 0) {
      alert("Please select at least one interest");

      return;
    }

    setIsSubscribing(true);

    try {
      await updateInterests(selectedInterests);
      alert("Successfully subscribed to alerts for your interests!");
    } catch {
      alert("Failed to update interests. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId]
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative flex min-h-[600px] items-center justify-center bg-gradient-to-b from-primary-50 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">Subscribe to Interest Alerts</h1>
          <p className="mx-auto max-w-2xl text-xl text-default-600">
            Stay updated with events and activities that match your interests. Get notified when new
            events are posted in your areas of interest.
          </p>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader className="pb-0">
            <h2 className="text-2xl font-semibold">
              {user ? "Manage Your Interest Alerts" : "Select Your Interests"}
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    className={`rounded-lg border p-3 text-left transition-colors ${
                      selectedInterests.includes(interest.id)
                        ? "border-primary bg-primary text-white"
                        : "border-divider hover:bg-primary/10"
                    }`}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    {interest.name}
                  </button>
                ))}
              </div>

              {!user && (
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <Input
                    required
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              <Button
                className="w-full"
                color="primary"
                isLoading={isSubscribing}
                onPress={handleSubscribe}
              >
                {user ? "Update Interest Alerts" : "Subscribe to Alerts"}
              </Button>

              {!user && (
                <p className="text-center text-sm text-default-500">
                  Already have an account?{" "}
                  <Button
                    className="h-auto p-0"
                    variant="light"
                    onPress={() => router.push("/login")}
                  >
                    Login
                  </Button>
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
