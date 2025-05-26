"use client";

import { useState } from "react";
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

interface EventPageClientProps {
  eventId: string;
}

const EventPageClient = ({ eventId }: EventPageClientProps) => {
  const router = useRouter();
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(false);

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
    if (navigator.share) {
      navigator.share({
        title: "Tech Conference 2024",
        text: "Check out this amazing tech conference!",
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          alt={event.title}
          className="w-full h-full object-cover rounded-lg"
          height={400}
          src={event.imageUrl}
          width={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Tech Conference 2024
                </h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    <span>March 15, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span>Convention Center</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="text-white border-white"
                  color="primary"
                  variant="bordered"
                  onPress={toggleSave}
                >
                  <HeartIcon
                    className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                  />
                </Button>
                <Button
                  className="text-white border-white"
                  color="primary"
                  variant="bordered"
                  onPress={shareEvent}
                >
                  <ShareIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10">
              <CardBody className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-foreground/70 mb-4">
                  Join us for the biggest tech conference of the year, featuring
                  industry leaders, innovative workshops, and networking
                  opportunities. This event brings together technology
                  enthusiasts, professionals, and thought leaders from around
                  the world.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-foreground/70">
                    <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                    <span>Organized by Tech Events Inc.</span>
                  </div>
                  <div className="flex items-center text-foreground/70">
                    <UserIcon className="w-5 h-5 mr-2" />
                    <span>234 attendees</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-600 text-sm">
                    Technology
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-600 text-sm">
                    Conference
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-600 text-sm">
                    Networking
                  </span>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10">
              <CardBody className="p-6">
                <h2 className="text-2xl font-bold mb-4">Event Schedule</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-20 text-foreground/70">9:00 AM</div>
                    <div>
                      <h3 className="font-semibold">
                        Registration & Breakfast
                      </h3>
                      <p className="text-foreground/70">
                        Check-in and enjoy a light breakfast
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-foreground/70">10:00 AM</div>
                    <div>
                      <h3 className="font-semibold">Opening Keynote</h3>
                      <p className="text-foreground/70">
                        Future of Technology by John Doe
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-foreground/70">11:30 AM</div>
                    <div>
                      <h3 className="font-semibold">Workshop Sessions</h3>
                      <p className="text-foreground/70">
                        Choose from various technical workshops
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10">
              <CardBody className="p-6">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="aspect-video bg-foreground/10 rounded-lg mb-4">
                  {/* Add map component here */}
                </div>
                <p className="text-foreground/70">
                  Convention Center
                  <br />
                  123 Tech Street
                  <br />
                  San Francisco, CA 94105
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Action Card */}
          <div className="lg:col-span-1">
            <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10 sticky top-24">
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Price</span>
                    <span className="text-2xl font-bold">$299</span>
                  </div>
                  <Button
                    className="w-full"
                    color="primary"
                    size="lg"
                    onClick={handleGetTickets}
                  >
                    Get Tickets
                  </Button>
                  <div className="text-sm text-foreground/70 space-y-2">
                    <p className="flex items-center">
                      <UserGroupIcon className="w-5 h-5 mr-2" />
                      234 people are attending
                    </p>
                    <p className="flex items-center">
                      <TagIcon className="w-5 h-5 mr-2" />
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
