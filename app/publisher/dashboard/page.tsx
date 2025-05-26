import { Suspense } from "react";
import PublisherDashboardClient from "./PublisherDashboardClient";

export default function PublisherDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublisherDashboardClient />
    </Suspense>
  );
}
