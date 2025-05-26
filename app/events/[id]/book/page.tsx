import { Metadata } from "next";

import BookingForm from "./BookingForm";

import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Book Event | EventHub",
  description: "Book your tickets for this amazing event",
};

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function BookingPage(props: Props) {
  return (
    <AuthGuard>
      <BookingForm eventId={props.params.id} />
    </AuthGuard>
  );
}
