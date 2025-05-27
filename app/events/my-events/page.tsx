"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useUser } from "@/contexts/UserContext";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  status: "upcoming" | "past" | "cancelled";
  image: string;
}

export default function MyEventsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not logged in
    if (!user) {
      router.push("/login");

      return;
    }

    // Fetch user's events (mock data for now)
    const fetchUserEvents = async () => {
      // TODO: Replace with actual API call
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Tech Conference 2024",
          description: "Join us for the biggest tech conference of the year",
          date: "2024-06-15",
          location: "San Francisco, CA",
          category: "Technology",
          status: "upcoming",
          image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
          id: "2",
          title: "Music Festival",
          description: "A three-day music festival featuring top artists",
          date: "2024-07-20",
          location: "Los Angeles, CA",
          category: "Music",
          status: "upcoming",
          image:
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
      ];

      setEvents(mockEvents);
      setLoading(false);
    };

    fetchUserEvents();
  }, [user, router]);

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "text-success";
      case "past":
        return "text-default-500";
      case "cancelled":
        return "text-danger";
      default:
        return "text-default-500";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Button color="primary" onClick={() => router.push("/events")}>
          Discover More Events
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="transition-shadow hover:shadow-lg">
            <CardHeader className="p-0">
              <Image
                alt={event.title}
                className="h-48 w-full rounded-lg object-cover"
                height={200}
                src={event.image}
                width={300}
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
              <p className="mb-4 text-default-600">{event.description}</p>
              <div className="flex flex-col gap-2 text-sm text-default-500">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  {event.category}
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                className="w-full"
                color="primary"
                onClick={() => router.push(`/events/${event.id}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
