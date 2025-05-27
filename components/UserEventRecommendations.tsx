"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button, Chip, Input } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  organizer: string;
  price: number;
  image?: string;
}

interface Interest {
  id: string;
  name: string;
  selected: boolean;
}

export default function UserEventRecommendations() {
  const [events, setEvents] = useState<Event[]>([]);
  const [interests, setInterests] = useState<Interest[]>([
    { id: "1", name: "Technology", selected: false },
    { id: "2", name: "Music", selected: false },
    { id: "3", name: "Sports", selected: false },
    { id: "4", name: "Food", selected: false },
    { id: "5", name: "Art", selected: false },
    { id: "6", name: "Business", selected: false },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchEvents = async () => {
      // Mock data for now
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Tech Conference 2024",
          description: "Annual technology conference featuring the latest innovations",
          date: "2024-06-15",
          location: "San Francisco",
          category: "Technology",
          organizer: "Tech Events Inc",
          price: 299,
          image: "/images/events/tech-conference.jpg",
        },
        {
          id: "2",
          title: "Summer Music Festival",
          description: "Three days of amazing music and entertainment",
          date: "2024-07-20",
          location: "Los Angeles",
          category: "Music",
          organizer: "Music Festivals Co",
          price: 199,
          image: "/images/events/music-festival.jpg",
        },
      ];

      setEvents(mockEvents);
    };

    fetchEvents();
  }, []);

  const toggleInterest = (interestId: string) => {
    setInterests(
      interests.map((interest) =>
        interest.id === interestId ? { ...interest, selected: !interest.selected } : interest
      )
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesInterests =
      interests.some((interest) => interest.selected) &&
      interests.some(
        (interest) =>
          interest.selected && event.category.toLowerCase().includes(interest.name.toLowerCase())
      );

    return (
      matchesSearch && matchesCategory && (!interests.some((i) => i.selected) || matchesInterests)
    );
  });

  const selectItems = [
    <SelectItem key="all" textValue="all">
      All Categories
    </SelectItem>,
    ...interests.map((interest) => (
      <SelectItem key={interest.id} textValue={interest.name}>
        {interest.name}
      </SelectItem>
    )),
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          className="max-w-xs"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          className="max-w-xs"
          placeholder="Select Category"
          selectedKeys={[selectedCategory]}
          onSelectionChange={(keys) => setSelectedCategory(Array.from(keys)[0] as string)}
        >
          {selectItems}
        </Select>
      </div>

      {/* Interest Tags */}
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Chip
            key={interest.id}
            className="cursor-pointer"
            color={interest.selected ? "primary" : "default"}
            variant={interest.selected ? "solid" : "flat"}
            onClick={() => toggleInterest(interest.id)}
            onClose={() => toggleInterest(interest.id)}
          >
            {interest.name}
          </Chip>
        ))}
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="transition-transform hover:scale-105">
            {event.image && (
              <div className="relative h-48">
                <Image
                  alt={event.title}
                  className="h-full w-full rounded-t-lg object-cover"
                  height={200}
                  src={event.image}
                  width={300}
                />
              </div>
            )}
            <CardHeader>
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p className="text-sm text-default-500">{event.organizer}</p>
            </CardHeader>
            <CardBody>
              <p className="text-default-600">{event.description}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-sm">
                  <strong>Price:</strong> ${event.price}
                </p>
              </div>
            </CardBody>
            <CardFooter>
              <Button className="w-full" color="primary">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
