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
    description:
      "Receive instant notifications about new events and opportunities.",
    icon: "⚡",
  },
];

export const FeaturesSection = () => {
  const router = useRouter();

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Journey to Never Missing Out
          </h2>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            Stay connected with what matters to you through our comprehensive
            alert system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <CardBody className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-default-600">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <h3 className="text-2xl font-semibold">Ready to Get Started?</h3>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-default-600">
                Create your profile, add your interests, and start receiving
                personalized alerts today.
              </p>
              <div className="flex gap-4">
                <Button
                  color="primary"
                  size="lg"
                  onPress={() => router.push("/auth")}
                >
                  Create Profile
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  onPress={() => router.push("/profile")}
                >
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
