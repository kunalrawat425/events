import { Suspense } from "react";
import PublisherAuthClient from "./PublisherAuthClient";

export default function PublisherAuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublisherAuthClient />
    </Suspense>
  );
}
