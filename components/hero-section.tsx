"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Card, CardBody, CardHeader } from "@heroui/card";

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
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // TODO: Implement subscription logic
    console.log("Subscribing with:", { email, interests: selectedInterests });
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-b from-primary-50 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Never Miss What Matters to You
          </h1>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            Stay updated with events, summits, and activities that match your interests.
            Subscribe to personalized alerts and be the first to know.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-0">
            <h2 className="text-2xl font-semibold">Subscribe to Alerts</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Your Interests
                </label>
                <Autocomplete
                  label="Choose interests"
                  placeholder="Select multiple interests"
                  selectionMode="multiple"
                  selectedKeys={selectedInterests}
                  onSelectionChange={(keys) => setSelectedInterests(Array.from(keys) as string[])}
                  className="w-full"
                >
                  {interests.map((interest) => (
                    <AutocompleteItem key={interest.id} value={interest.id}>
                      {interest.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button
                color="primary"
                size="lg"
                className="w-full"
                onPress={handleSubscribe}
              >
                Subscribe to Alerts
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}; 