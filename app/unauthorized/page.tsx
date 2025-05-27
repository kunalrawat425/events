"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-50 to-background p-4">
      <Card className="w-full max-w-md">
        <CardBody className="py-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Unauthorized Access</h1>
          <p className="text-lg text-foreground/70">
            You don&apos;t have permission to access this page. This area is restricted to
            publishers only.
          </p>
          <div className="flex flex-col gap-4">
            <Button color="primary" size="lg" onClick={() => router.push("/")}>
              Return to Home
            </Button>
            <Button size="lg" variant="bordered" onClick={() => router.push("/publisher")}>
              Learn About Publishing
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
