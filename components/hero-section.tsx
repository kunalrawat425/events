"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useRouter } from "next/navigation";
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
      router.push("/auth?tab=signup");
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
    } catch (error) {
      alert("Failed to update interests. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-b from-primary-50 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Subscribe to Interest Alerts
          </h1>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            Stay updated with events and activities that match your interests.
            Get notified when new events are posted in your areas of interest.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-0">
            <h2 className="text-2xl font-semibold">
              {user ? "Manage Your Interest Alerts" : "Select Your Interests"}
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedInterests.includes(interest.id)
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-primary/10 border-divider"
                    }`}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    {interest.name}
                  </button>
                ))}
              </div>

              {!user && (
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <Input
                    className="w-full"
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
                size="lg"
                onPress={handleSubscribe}
              >
                {user ? "Update Interest Alerts" : "Subscribe to Alerts"}
              </Button>

              {!user && (
                <p className="text-center text-sm text-default-500">
                  Already have an account?{" "}
                  <Button
                    className="p-0 h-auto"
                    variant="light"
                    onPress={() => router.push("/auth?tab=login")}
                  >
                    Sign In
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