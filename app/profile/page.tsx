"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

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

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          router.replace("/auth?tab=login");
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        if (!parsedUser || !parsedUser.id) {
          localStorage.removeItem("user");
          router.replace("/auth?tab=login");
          return;
        }

        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
        router.replace("/auth?tab=login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user data
  if (!user) {
    return null;
  }

  const userInterests = interests.filter((interest) =>
    user?.interests?.includes(interest.id) ?? false
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Your Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card className="bg-background/50 backdrop-blur-lg border border-foreground/10">
              <CardBody className="p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground/60 mb-1"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <p className="text-lg" id="name">
                      {user.name}
                    </p>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground/60 mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <p className="text-lg" id="email">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground/60 mb-1"
                      htmlFor="role"
                    >
                      Account Type
                    </label>
                    <p className="text-lg capitalize" id="role">
                      {user.role}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Interests */}
            <Card className="bg-background/50 backdrop-blur-lg border border-foreground/10">
              <CardBody className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Your Interests</h2>
                  <Button
                    color="primary"
                    variant="light"
                    onPress={() => router.push("/")}
                  >
                    Update Interests
                  </Button>
                </div>
                {userInterests.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {userInterests.map((interest) => (
                      <div
                        key={interest.id}
                        className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/20"
                      >
                        {interest.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-foreground/60 mb-4">
                      You haven&apos;t selected any interests yet.
                    </p>
                    <Button color="primary" onPress={() => router.push("/")}>
                      Select Interests
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
