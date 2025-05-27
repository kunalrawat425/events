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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
          <p className="text-foreground/60">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user data
  if (!user) {
    return null;
  }

  const userInterests = interests.filter(
    (interest) => user?.interests?.includes(interest.id) ?? false
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold">Your Profile</h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Personal Information */}
            <Card className="border border-foreground/10 bg-background/50 backdrop-blur-lg">
              <CardBody className="p-8">
                <h2 className="mb-6 text-2xl font-semibold">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium text-foreground/60"
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
                      className="mb-1 block text-sm font-medium text-foreground/60"
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
                      className="mb-1 block text-sm font-medium text-foreground/60"
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
            <Card className="border border-foreground/10 bg-background/50 backdrop-blur-lg">
              <CardBody className="p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Your Interests</h2>
                  <Button color="primary" variant="light" onPress={() => router.push("/")}>
                    Update Interests
                  </Button>
                </div>
                {userInterests.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {userInterests.map((interest) => (
                      <div
                        key={interest.id}
                        className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-primary"
                      >
                        {interest.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="mb-4 text-foreground/60">
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
