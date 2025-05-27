"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";

import { EventTable } from "@/components/EventTable";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  category: string;
  organizer: string;
}

export default function UserEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchEvents = async () => {
      try {
        // Mock data for now
        const mockEvents: Event[] = [
          {
            id: "1",
            title: "Tech Conference 2024",
            description: "Annual technology conference",
            date: "2024-06-15",
            location: "San Francisco",
            status: "upcoming",
            category: "Technology",
            organizer: "Tech Events Inc",
          },
          {
            id: "2",
            title: "Music Festival",
            description: "Summer music festival",
            date: "2024-07-20",
            location: "Los Angeles",
            status: "upcoming",
            category: "Music",
            organizer: "Music Festivals Co",
          },
        ];

        setEvents(mockEvents);
      } catch {
        // Handle error silently or show a toast notification
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = async (event: Event) => {
    try {
      // TODO: Replace with actual API call
      setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
    } catch {
      // Handle error silently or show a toast notification
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      // TODO: Replace with actual API call
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch {
      // Handle error silently or show a toast notification
    }
  };

  const handleStatusChange = async (eventId: string, status: Event["status"]) => {
    try {
      // TODO: Replace with actual API call
      setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, status } : e)));
    } catch {
      // Handle error silently or show a toast notification
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Events</h1>
        </CardHeader>
        <CardBody>
          <EventTable
            events={events}
            isPublisher={false}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
          />
        </CardBody>
      </Card>
    </div>
  );
}
