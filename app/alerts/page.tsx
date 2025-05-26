import InterestAlerts from "@/components/InterestAlerts";

export default function AlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Manage Your Interest Alerts
        </h1>
        <p className="text-lg text-default-600 mb-8 text-center">
          Stay updated with events and activities that match your interests.
          Subscribe to personalized alerts and never miss what matters to you.
        </p>
        <InterestAlerts />
      </div>
    </div>
  );
}
