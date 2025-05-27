"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  PhoneIcon,
  GlobeAltIcon,
  TicketIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

// Mock data - replace with actual data fetching
const eventData = {
  id: "1",
  title: "Tech Conference 2024",
  description:
    "Join us for the biggest tech conference of the year, featuring industry leaders, innovative workshops, and networking opportunities. Learn about the latest trends in technology and connect with like-minded professionals.",
  date: "March 15, 2024",
  time: "9:00 AM - 5:00 PM",
  location: "Convention Center",
  address: "123 Tech Street, San Francisco, CA 94105",
  image:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  price: "$299",
  attendees: 500,
  category: "Technology",
  venue: {
    name: "San Francisco Convention Center",
    description:
      "A state-of-the-art venue in the heart of San Francisco, perfect for large-scale tech events and conferences.",
    amenities: [
      "High-speed WiFi",
      "AV Equipment",
      "Catering Services",
      "Parking Available",
      "Wheelchair Accessible",
      "Meeting Rooms",
    ],
    contact: {
      phone: "+1 (555) 123-4567",
      email: "events@sfconvention.com",
      website: "www.sfconvention.com",
    },
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  schedule: [
    {
      time: "9:00 AM",
      title: "Registration & Breakfast",
      description: "Check-in and networking breakfast",
    },
    {
      time: "10:00 AM",
      title: "Opening Keynote",
      description: "Future of Technology",
    },
    {
      time: "11:30 AM",
      title: "Workshop Sessions",
      description: "Multiple tracks available",
    },
  ],
};

export default function EventDetails() {
  const [isSaved, setIsSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section aria-label="Event hero" className="relative h-[60vh] w-full">
        <Image
          fill
          priority
          alt={`${eventData.title} - Event Banner`}
          className="object-cover"
          src={
            imageError
              ? "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
              : eventData.image
          }
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-primary/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {eventData.category}
              </span>
              <span className="rounded-full bg-background/90 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-sm">
                {eventData.price}
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{eventData.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <CalendarIcon aria-hidden="true" className="mr-2 h-5 w-5" />
                <time dateTime={eventData.date}>{eventData.date}</time>
              </div>
              <div className="flex items-center">
                <ClockIcon aria-hidden="true" className="mr-2 h-5 w-5" />
                <time dateTime={eventData.time}>{eventData.time}</time>
              </div>
              <div className="flex items-center">
                <MapPinIcon aria-hidden="true" className="mr-2 h-5 w-5" />
                <address className="not-italic">{eventData.location}</address>
              </div>
              <div className="flex items-center">
                <UserGroupIcon aria-hidden="true" className="mr-2 h-5 w-5" />
                <span>{eventData.attendees} attending</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Event Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <Card className="border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <CardBody className="p-6">
                <h2 className="mb-4 text-2xl font-bold">About This Event</h2>
                <p className="leading-relaxed text-foreground/70">{eventData.description}</p>
              </CardBody>
            </Card>

            {/* Schedule */}
            <Card className="border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <CardBody className="p-6">
                <h2 className="mb-6 text-2xl font-bold">Schedule</h2>
                <div className="space-y-6">
                  {eventData.schedule.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-24 flex-shrink-0">
                        <time className="font-medium text-primary" dateTime={item.time}>
                          {item.time}
                        </time>
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">{item.title}</h3>
                        <p className="text-sm text-foreground/70">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Venue Details */}
            <Card className="border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <CardBody className="p-6">
                <h2 className="mb-6 text-2xl font-bold">Venue</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{eventData.venue.name}</h3>
                    <p className="mb-4 text-foreground/70">{eventData.venue.description}</p>
                    <div className="mb-2 flex items-center text-foreground/70">
                      <MapPinIcon aria-hidden="true" className="mr-2 h-5 w-5 text-primary" />
                      <address className="not-italic">{eventData.address}</address>
                    </div>
                    <div className="mb-2 flex items-center text-foreground/70">
                      <PhoneIcon aria-hidden="true" className="mr-2 h-5 w-5 text-primary" />
                      <a
                        className="hover:text-primary"
                        href={`tel:${eventData.venue.contact.phone}`}
                      >
                        {eventData.venue.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <GlobeAltIcon aria-hidden="true" className="mr-2 h-5 w-5 text-primary" />
                      <a className="hover:text-primary" href={eventData.venue.contact.website}>
                        {eventData.venue.contact.website}
                      </a>
                    </div>
                  </div>

                  {/* Venue Images */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Venue Photos</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {eventData.venue.images.map((image, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer overflow-hidden rounded-lg ${
                            activeImage === index ? "ring-2 ring-primary" : ""
                          }`}
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveImage(index)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setActiveImage(index);
                            }
                          }}
                        >
                          <Image
                            fill
                            alt={`${eventData.venue.name} - Photo ${index + 1}`}
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            src={image}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;

                              target.src =
                                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="mb-4 font-semibold">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {eventData.venue.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-foreground/70">
                          <span
                            aria-hidden="true"
                            className="mr-2 h-2 w-2 rounded-full bg-primary"
                          />
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <Card className="sticky top-24 border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <CardBody className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{eventData.price}</span>
                    <Button
                      isIconOnly
                      aria-label={isSaved ? "Remove from saved events" : "Save event"}
                      className={isSaved ? "text-danger" : "text-foreground/70"}
                      variant="light"
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <HeartIcon aria-hidden="true" className="h-6 w-6" />
                    </Button>
                  </div>
                  <Button
                    className="w-full"
                    color="primary"
                    size="lg"
                    startContent={<TicketIcon aria-hidden="true" className="h-5 w-5" />}
                  >
                    Get Tickets
                  </Button>
                  <Button
                    className="w-full"
                    startContent={<ShareIcon aria-hidden="true" className="h-5 w-5" />}
                    variant="bordered"
                  >
                    Share Event
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
