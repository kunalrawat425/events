"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import Link from "next/link";
import {
  RocketLaunchIcon,
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  BellAlertIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    title: "AI-Powered Discovery",
    description:
      "Find events tailored to your interests with our intelligent recommendation system",
  },
  {
    icon: <BellAlertIcon className="w-6 h-6" />,
    title: "Smart Notifications",
    description:
      "Get personalized alerts about events you'll love, right when you need them",
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: "Smart Scheduling",
    description:
      "Let AI help you manage your event calendar and never miss an opportunity",
  },
];

const painPoints = [
  {
    icon: <UserGroupIcon className="w-6 h-6" />,
    title: "Finding the Right Events",
    description: "Tired of scrolling through endless event listings?",
    solution:
      "Our AI learns your preferences and shows you exactly what you'll love",
  },
  {
    icon: <ChartBarIcon className="w-6 h-6" />,
    title: "Missing Out",
    description: "Worried about missing important events?",
    solution: "Get smart notifications based on your interests and schedule",
  },
  {
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    title: "Event Discovery",
    description: "Struggling to find events that match your interests?",
    solution: "Our AI-powered search understands what you're looking for",
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              Your AI Event Companion
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-12">
              Discover, explore, and never miss the events that matter to you.
              Powered by artificial intelligence.
            </p>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex gap-4">
                <Input
                  className="flex-1"
                  placeholder="Search events, interests, or locations..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button color="primary" size="lg">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button className="text-lg px-8" color="primary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/events">
                <Button className="text-lg px-8" size="lg" variant="bordered">
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-32 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">AI-Powered Features</h2>
            <p className="text-xl text-foreground/60">
              Experience the future of event discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-background/50 backdrop-blur-lg border border-foreground/10"
              >
                <CardBody className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="w-full py-32 bg-gradient-to-br from-background to-background/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">
              Your Event Journey, Simplified
            </h2>
            <p className="text-xl text-foreground/60">
              We understand your challenges and have the solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <Card
                key={index}
                className="bg-background/50 backdrop-blur-lg border border-foreground/10"
              >
                <CardBody className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                  <p className="text-foreground/60 mb-4">{point.description}</p>
                  <p className="text-primary font-medium">{point.solution}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 bg-gradient-to-br from-primary/20 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Event Experience?
            </h2>
            <p className="text-xl text-foreground/60 mb-12">
              Join thousands of users who are already discovering events in a
              smarter way
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button className="text-lg px-8" color="primary" size="lg">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/publisher">
                <Button className="text-lg px-8" size="lg" variant="bordered">
                  Become a Publisher
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
