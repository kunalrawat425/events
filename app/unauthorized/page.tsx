"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-background p-4">
      <Card className="w-full max-w-md">
        <CardBody className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
          <p className="text-foreground/60 mb-8">
            You don't have permission to access this page. This area is restricted to publishers only.
          </p>
          <div className="flex flex-col gap-4">
            <Button
              color="primary"
              size="lg"
              onClick={() => router.push("/")}
            >
              Return to Home
            </Button>
            <Button
              variant="bordered"
              size="lg"
              onClick={() => router.push("/publisher")}
            >
              Learn About Publishing
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 