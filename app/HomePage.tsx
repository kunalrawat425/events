"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RocketLaunchIcon,
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  BellAlertIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

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

const features = [
  {
    icon: <SparklesIcon className="h-6 w-6" />,
    title: "AI-Powered Discovery",
    description:
      "Find events tailored to your interests with our intelligent recommendation system",
  },
  {
    icon: <BellAlertIcon className="h-6 w-6" />,
    title: "Smart Notifications",
    description: "Get personalized alerts about events you'll love, right when you need them",
  },
  {
    icon: <CalendarIcon className="h-6 w-6" />,
    title: "Smart Scheduling",
    description: "Let AI help you manage your event calendar and never miss an opportunity",
  },
];

const painPoints = [
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: "Finding the Right Events",
    description: "Tired of scrolling through endless event listings?",
    solution: "Our AI learns your preferences and shows you exactly what you'll love",
  },
  {
    icon: <ChartBarIcon className="h-6 w-6" />,
    title: "Missing Out",
    description: "Worried about missing important events?",
    solution: "Get smart notifications based on your interests and schedule",
  },
  {
    icon: <RocketLaunchIcon className="h-6 w-6" />,
    title: "Event Discovery",
    description: "Struggling to find events that match your interests?",
    solution: "Our AI-powered search understands what you're looking for",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { user, updateInterests } = useUser();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [hasStoredInterests, setHasStoredInterests] = useState(false);

  // Initialize selected interests from user's interests if logged in
  useEffect(() => {
    if (user?.interests) {
      setSelectedInterests(user.interests);
      setHasStoredInterests(user.interests.length > 0);
    }
  }, [user]);

  const handleSubscribe = async () => {
    if (!user) {
      if (selectedInterests.length > 0) {
        localStorage.setItem("pendingInterests", JSON.stringify(selectedInterests));
      }

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
      setHasStoredInterests(true);
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

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Interest Alerts Section */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative z-10 w-full px-4 py-32">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              {hasStoredInterests ? "Update Your Interest Alerts" : "Subscribe to Interest Alerts"}
            </h1>
            <p className="mb-12 text-xl text-foreground/80 md:text-2xl">
              {hasStoredInterests
                ? "Modify your interests to receive different event alerts."
                : "Stay updated with events and activities that match your interests. Get notified when new events are posted in your areas of interest."}
            </p>

            <Card className="mx-auto max-w-2xl">
              <CardBody className="p-8">
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

                  <Button
                    className="w-full"
                    color="primary"
                    isLoading={isSubscribing}
                    size="lg"
                    onPress={handleSubscribe}
                  >
                    {user
                      ? hasStoredInterests
                        ? "Update Interest Alerts"
                        : "Subscribe to Alerts"
                      : "Subscribe to Alerts"}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-background/50 py-32">
        <div className="w-full px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="mb-4 text-4xl font-bold">AI-Powered Features</h2>
              <p className="text-xl text-foreground/60">Experience the future of event discovery</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border border-foreground/10 bg-background/50 backdrop-blur-lg"
                >
                  <CardBody className="p-8">
                    <div className="mb-4 text-primary">{feature.icon}</div>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-foreground/60">{feature.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="w-full py-32">
        <div className="w-full px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="mb-4 text-4xl font-bold">We Understand Your Pain Points</h2>
              <p className="text-xl text-foreground/60">
                Let us help you solve your event discovery challenges
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {painPoints.map((point, index) => (
                <Card
                  key={index}
                  className="border border-foreground/10 bg-background/50 backdrop-blur-lg"
                >
                  <CardBody className="p-8">
                    <div className="mb-4 text-primary">{point.icon}</div>
                    <h3 className="mb-2 text-xl font-semibold">{point.title}</h3>
                    <p className="mb-4 text-foreground/60">{point.description}</p>
                    <p className="font-medium text-primary">{point.solution}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
