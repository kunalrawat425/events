import { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";
import BookingConfirmation from "./BookingConfirmation";

export const metadata: Metadata = {
  title: "Booking Confirmation | EventHub",
  description: "Your event booking has been confirmed",
};

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <AuthGuard>
      <BookingConfirmation eventId={params.id} />
    </AuthGuard>
  );
} 