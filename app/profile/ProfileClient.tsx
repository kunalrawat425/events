"use client";

import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import Image from "next/image";

import { useUser } from "@/contexts/UserContext";

export default function ProfileClient() {
  const { user, logout } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/auth");

    return null;
  }

  // Placeholder interests for demo; replace with user.interests if available
  const userInterests = Array.isArray((user as any).interests)
    ? (user as any).interests
    : ["Tech Conferences", "Music Festivals"];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-50 to-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary-200 bg-default-200">
            <Image
              fill
              priority
              alt="Profile picture"
              className="object-cover"
              src={(user as any).photoURL || "/images/profile-placeholder.png"}
            />
          </div>
          <h2 className="mt-2 text-xl font-bold">{user.name}</h2>
          <p className="text-default-500">{user.email}</p>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">Your Interests</h3>
            <div className="flex flex-wrap gap-2">
              {userInterests.length > 0 ? (
                userInterests.map((interest: string) => (
                  <span
                    key={interest}
                    className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <span className="text-default-400">No interests selected.</span>
              )}
            </div>
          </div>
          <Button
            className="mt-4 w-full"
            color="danger"
            variant="light"
            onPress={async () => {
              await logout();
              router.replace("/");
            }}
          >
            Logout
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
