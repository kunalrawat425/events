import InterestAlerts from "@/components/InterestAlerts";

export default function AlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Manage Your Interest Alerts</h1>
        <p className="mb-8 text-center text-lg text-default-600">
          Stay updated with events and activities that match your interests. Subscribe to
          personalized alerts and never miss what matters to you.
        </p>
        <InterestAlerts />
      </div>
    </div>
  );
}
