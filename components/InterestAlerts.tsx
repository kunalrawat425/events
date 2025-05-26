"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

const InterestAlerts = () => {
  const router = useRouter();
  const { user, updateInterests } = useUser();
  const [mounted, setMounted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user?.interests) {
      setSelectedInterests(user.interests);
    }
  }, [user, mounted]);

  useEffect(() => {
    if (!mounted) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  const filteredInterests = interests.filter((interest) => {
    const searchLower = searchQuery.toLowerCase();

    return (
      interest.name.toLowerCase().includes(searchLower) &&
      !selectedInterests.includes(interest.id)
    );
  });

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

      localStorage.setItem(
        "pendingInterests",
        JSON.stringify(selectedInterests),
      );
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
    } catch {
      alert("Failed to update interests. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleInterestSelect = (interestId: string) => {
    if (!selectedInterests.includes(interestId)) {
      setSelectedInterests([...selectedInterests, interestId]);
    }
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const removeInterest = (interestId: string) => {
    setSelectedInterests(selectedInterests.filter((id) => id !== interestId));
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-0">
        <h2 className="text-2xl font-semibold">
          {user
            ? "Manage Your Interest Alerts"
            : "Subscribe to Interest Alerts"}
        </h2>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          <div ref={searchRef}>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="interest-search"
            >
              Search and Add Your Interests
            </label>
            <div className="relative">
              <div className="relative">
                <Input
                  className="w-full pl-10"
                  id="interest-search"
                  placeholder="Type to search interests..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-default-400" />
              </div>
              {showSuggestions && searchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-background border border-divider rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredInterests.length > 0 ? (
                    filteredInterests.map((interest) => (
                      <button
                        key={interest.id}
                        className="w-full px-4 py-2 text-left hover:bg-primary/10 focus:bg-primary/10 focus:outline-none"
                        onClick={() => handleInterestSelect(interest.id)}
                      >
                        {interest.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-default-500">
                      No matching interests found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Selected Interests */}
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interestId) => {
              const interest = interests.find((i) => i.id === interestId);

              return (
                <div
                  key={interestId}
                  className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full"
                >
                  <span>{interest?.name}</span>
                  <button
                    className="text-primary hover:text-primary-600"
                    onClick={() => removeInterest(interestId)}
                  >
                    ×
                  </button>
                </div>
              );
            })}
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
                id="email"
                placeholder="Enter your email"
                required
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
        </div>
      </CardBody>
    </Card>
  );
};

export default InterestAlerts;
