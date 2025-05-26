"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";

import Footer from "@/components/footer";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  price: number;
  attendees: number;
}

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    // Mock data for demonstration
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Summer Music Festival",
        description:
          "Join us for an unforgettable weekend of music, food, and fun!",
        date: "2024-07-15",
        location: "Central Park",
        category: "Music",
        image:
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        price: 99.99,
        attendees: 500,
      },
      {
        id: "2",
        title: "Tech Conference 2024",
        description:
          "The biggest tech conference of the year with industry leaders and innovators.",
        date: "2024-08-20",
        location: "Convention Center",
        category: "Technology",
        image:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
        price: 299.99,
        attendees: 1000,
      },
      // Add more mock events as needed
    ];

    setEvents(mockEvents);
    setIsLoading(false);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "upcoming" && new Date(event.date) > new Date()) ||
      (dateFilter === "past" && new Date(event.date) < new Date());

    return matchesSearch && matchesCategory && matchesDate;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground/80">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-400/20 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              Discover Amazing Events
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              `$
              {
                "Find and join events that match your interests. From concerts to workshops, we've got something for everyone."
              }
              `
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              className="w-full"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              className="w-full"
              placeholder="Filter by category"
              selectedKeys={[categoryFilter]}
              onSelectionChange={(keys) =>
                setCategoryFilter(Array.from(keys)[0] as string)
              }
            >
              <SelectItem key="all">All Categories</SelectItem>
              <SelectItem key="Music">Music</SelectItem>
              <SelectItem key="Technology">Technology</SelectItem>
              <SelectItem key="Sports">Sports</SelectItem>
              <SelectItem key="Arts">Arts</SelectItem>
              <SelectItem key="Food">Food</SelectItem>
            </Select>
            <Select
              className="w-full"
              placeholder="Filter by date"
              selectedKeys={[dateFilter]}
              onSelectionChange={(keys) =>
                setDateFilter(Array.from(keys)[0] as string)
              }
            >
              <SelectItem key="all">All Dates</SelectItem>
              <SelectItem key="upcoming">Upcoming</SelectItem>
              <SelectItem key="past">Past</SelectItem>
            </Select>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-background/50 backdrop-blur-sm border border-divider/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <CardBody className="p-0">
                  <div className="relative h-48">
                    <Image
                      alt={event.title}
                      className="w-full h-full object-cover rounded-t-lg"
                      height={200}
                      src={event.image}
                      width={300}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background/80 backdrop-blur-sm">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-foreground/80 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
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
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="flex justify-between items-center p-6 pt-0">
                  <div className="text-lg font-semibold">${event.price}</div>
                  <Button
                    color="primary"
                    onClick={() => router.push(`/events/${event.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-foreground/80 mb-4">
                {searchQuery || categoryFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Check back later for new events"}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
