"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Never Miss Summits",
    description:
      "Get notified about upcoming tech summits, conferences, and workshops in your area.",
    icon: "🎯",
  },
  {
    title: "Event Alerts",
    description:
      "Stay updated with events that match your interests, from concerts to sports games.",
    icon: "🎉",
  },
  {
    title: "Personalized Interests",
    description:
      "Customize your profile with interests and get relevant alerts and recommendations.",
    icon: "🎨",
  },
  {
    title: "Real-time Updates",
    description: "Receive instant notifications about new events and opportunities.",
    icon: "⚡",
  },
];

export const FeaturesSection = () => {
  const router = useRouter();

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Your Journey to Never Missing Out</h2>
          <p className="mx-auto max-w-2xl text-xl text-default-600">
            Stay connected with what matters to you through our comprehensive alert system
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <CardBody className="text-center">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-default-600">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <h3 className="text-2xl font-semibold">Ready to Get Started?</h3>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-default-600">
                Create your profile, add your interests, and start receiving personalized alerts
                today.
              </p>
              <div className="flex gap-4">
                <Button color="primary" size="lg" onPress={() => router.push("/auth")}>
                  Create Profile
                </Button>
                <Button size="lg" variant="bordered" onPress={() => router.push("/profile")}>
                  View Profile
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
