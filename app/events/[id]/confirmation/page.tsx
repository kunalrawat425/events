import { Metadata } from "next";

import BookingConfirmation from "./BookingConfirmation";

import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Booking Confirmation | EventHub",
  description: "Your event booking has been confirmed",
};

export default function ConfirmationPage({
  params,
}: {
  params: any;
}) {
  return (
    <AuthGuard>
      <BookingConfirmation eventId={params.id} />
    </AuthGuard>
  );
}
