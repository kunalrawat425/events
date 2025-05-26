"use client";

import { useState } from "react";
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
  const { user } = useUser();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      // Store the selected interests in localStorage
      localStorage.setItem(
        "pendingInterests",
        JSON.stringify(selectedInterests),
      );
      localStorage.setItem("pendingEmail", email);
      router.push("/auth?tab=signup");

      return;
    }

    setIsSubscribing(true);
    try {
      // TODO: Implement actual subscription logic with your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      // Mock successful subscription
      alert("Successfully subscribed to alerts for your selected interests!");
      setSelectedInterests([]);
      setEmail("");
    } catch (error) {
      alert("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedInterests(selected);
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-b from-primary-50 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Never Miss What Matters to You
          </h1>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            Stay updated with events, summits, and activities that match your
            interests. Subscribe to personalized alerts and be the first to
            know.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-0">
            <h2 className="text-2xl font-semibold">
              {user ? "Manage Your Interests" : "Subscribe to Alerts"}
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="interests"
                >
                  Select Your Interests
                </label>
                <select
                  multiple
                  className="w-full px-4 py-2 rounded-lg bg-background border border-divider focus:outline-none focus:ring-2 focus:ring-primary"
                  id="interests"
                  value={selectedInterests}
                  onChange={handleInterestChange}
                >
                  {interests.map((interest) => (
                    <option key={interest.id} value={interest.id}>
                      {interest.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-default-500 mt-1">
                  Hold Ctrl (Windows) or Command (Mac) to select multiple
                  interests
                </p>
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
                {user ? "Update Interests" : "Subscribe to Alerts"}
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
