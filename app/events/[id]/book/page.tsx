import { Metadata } from "next";

import BookingForm from "./BookingForm";

import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Book Event | EventHub",
  description: "Book your tickets for this amazing event",
};

export default function BookingPage({ params }: { params: { id: string } }) {
  return (
    <AuthGuard>
      <BookingForm eventId={params.id} />
    </AuthGuard>
  );
}
