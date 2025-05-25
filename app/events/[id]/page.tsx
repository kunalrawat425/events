import { Metadata } from "next";
import EventPageClient from "./EventPageClient";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, fetch event data here
  const eventData = {
    title: "Tech Conference 2024",
    description: "Join us for the biggest tech conference of the year, featuring industry leaders, innovative workshops, and networking opportunities.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    startDate: "2024-03-15T09:00:00",
    endDate: "2024-03-15T17:00:00",
    location: "Convention Center, San Francisco",
  };

  return {
    title: `${eventData.title} | EventHub`,
    description: eventData.description,
    openGraph: {
      title: eventData.title,
      description: eventData.description,
      images: [eventData.image],
      type: "website",
      siteName: "EventHub",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: eventData.title,
      description: eventData.description,
      images: [eventData.image],
    },
    other: {
      "event:start_time": eventData.startDate,
      "event:end_time": eventData.endDate,
      "event:location": eventData.location,
    },
  };
}

export default function EventPage({ params }: { params: { id: string } }) {
  return <EventPageClient eventId={params.id} />;
} 