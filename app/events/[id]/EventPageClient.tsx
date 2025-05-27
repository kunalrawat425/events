"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  ShareIcon,
  UserIcon,
  BuildingOfficeIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

import { useUser } from "@/contexts/UserContext";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price: number;
  attendees: number;
  category: string;
  organizer: string;
}

interface EventPageClientProps {
  eventId: string;
}

const EventPageClient = ({ eventId }: EventPageClientProps) => {
  const router = useRouter();
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // TODO: Replace with actual API call
        // Mock data for now
        const mockEvent: Event = {
          id: eventId,
          title: "Tech Conference 2024",
          description:
            "Join us for the biggest tech conference of the year, featuring industry leaders, innovative workshops, and networking opportunities.",
          date: "March 15, 2024",
          time: "9:00 AM - 5:00 PM",
          location: "Convention Center",
          imageUrl:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
          price: 299,
          attendees: 234,
          category: "Technology",
          organizer: "Tech Events Inc.",
        };

        setEvent(mockEvent);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleGetTickets = () => {
    if (!user) {
      // Store the current path in localStorage to redirect back after login
      localStorage.setItem("returnTo", `/events/${eventId}/book`);
      router.push("/auth");
    } else {
      router.push(`/events/${eventId}/book`);
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would call an API to save/unsave the event
  };

  const shareEvent = () => {
    if (!event) return;

    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-foreground/80">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-foreground/80">Event not found</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          alt={event.title}
          className="h-full w-full rounded-lg object-cover"
          height={400}
          src={event.imageUrl}
          width={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-4 text-4xl font-bold text-white">{event.title}</h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-5 w-5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="mr-2 h-5 w-5" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="border-white text-white"
                  color="primary"
                  variant="bordered"
                  onPress={toggleSave}
                >
                  <HeartIcon className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                </Button>
                <Button
                  className="border-white text-white"
                  color="primary"
                  variant="bordered"
                  onPress={shareEvent}
                >
                  <ShareIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Event Details */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <CardBody className="p-6">
                <h2 className="mb-4 text-2xl font-bold">About This Event</h2>
                <p className="mb-4 text-foreground/70">{event.description}</p>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-foreground/70">
                    <BuildingOfficeIcon className="mr-2 h-5 w-5" />
                    <span>Organized by {event.organizer}</span>
                  </div>
                  <div className="flex items-center text-foreground/70">
                    <UserIcon className="mr-2 h-5 w-5" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-600">
                    {event.category}
                  </span>
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-600">
                    Conference
                  </span>
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-600">
                    Networking
                  </span>
                </div>
              </CardBody>
            </Card>

            <Card className="border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <CardBody className="p-6">
                <h2 className="mb-4 text-2xl font-bold">Event Schedule</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-20 text-foreground/70">9:00 AM</div>
                    <div>
                      <h3 className="font-semibold">Registration & Breakfast</h3>
                      <p className="text-foreground/70">Check-in and enjoy a light breakfast</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-foreground/70">10:00 AM</div>
                    <div>
                      <h3 className="font-semibold">Opening Keynote</h3>
                      <p className="text-foreground/70">Future of Technology by John Doe</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-foreground/70">11:30 AM</div>
                    <div>
                      <h3 className="font-semibold">Workshop Sessions</h3>
                      <p className="text-foreground/70">Choose from various technical workshops</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <CardBody className="p-6">
                <h2 className="mb-4 text-2xl font-bold">Location</h2>
                <div className="mb-4 aspect-video rounded-lg bg-foreground/10">
                  {/* Add map component here */}
                </div>
                <p className="text-foreground/70">{event.location}</p>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Action Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Price</span>
                    <span className="text-2xl font-bold">${event.price}</span>
                  </div>
                  <Button className="w-full" color="primary" size="lg" onClick={handleGetTickets}>
                    Get Tickets
                  </Button>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <p className="flex items-center">
                      <UserGroupIcon className="mr-2 h-5 w-5" />
                      {event.attendees} people are attending
                    </p>
                    <p className="flex items-center">
                      <TagIcon className="mr-2 h-5 w-5" />
                      Early bird pricing ends in 5 days
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventPageClient;
