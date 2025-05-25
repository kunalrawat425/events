"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { EventTable } from "@/components/EventTable";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

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

export default function PublisherEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

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
            organizer: user?.name || "Your Organization",
          },
          {
            id: "2",
            title: "Music Festival",
            description: "Summer music festival",
            date: "2024-07-20",
            location: "Los Angeles",
            status: "upcoming",
            category: "Music",
            organizer: user?.name || "Your Organization",
          },
        ];
        setEvents(mockEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  const handleEdit = async (event: Event) => {
    try {
      // TODO: Replace with actual API call
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? event : e))
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      // TODO: Replace with actual API call
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleStatusChange = async (eventId: string, status: Event["status"]) => {
    try {
      // TODO: Replace with actual API call
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId ? { ...e, status } : e
        )
      );
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const handleCreateEvent = () => {
    router.push("/publisher/dashboard/events/create");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <Button color="primary" onPress={handleCreateEvent}>
            Create New Event
          </Button>
        </CardHeader>
        <CardBody>
          <EventTable
            events={events}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            isPublisher={true}
          />
        </CardBody>
      </Card>
    </div>
  );
} 