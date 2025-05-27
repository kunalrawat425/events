"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  imageUrl: string;
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchEvent();
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      // TODO: Implement actual event fetching
      // const response = await fetch(`/api/events/${params.id}`);
      // if (!response.ok) throw new Error("Failed to fetch event");
      // const event: Event = await response.json();

      // Mock data for demonstration
      const mockEvent: Event = {
        id: params.id,
        title: "Sample Event",
        description: "This is a sample event description",
        date: "2024-12-31",
        time: "18:00",
        location: "Sample Location",
        capacity: 100,
        price: 50,
        imageUrl: "https://example.com/image.jpg",
      };

      setFormData({
        title: mockEvent.title,
        description: mockEvent.description,
        date: mockEvent.date,
        time: mockEvent.time,
        location: mockEvent.location,
        capacity: mockEvent.capacity.toString(),
        price: mockEvent.price.toString(),
        imageUrl: mockEvent.imageUrl,
      });
    } catch (error) {
      console.error("Error fetching event:", error);
      // TODO: Show error toast
      router.push("/publisher/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual event update
      // const response = await fetch(`/api/events/${params.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error("Failed to update event");

      router.push("/publisher/dashboard");
    } catch (error) {
      console.error("Error updating event:", error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold">Edit Event</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              required
              label="Event Title"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
            />

            <div className="relative">
              <label className="block text-sm font-medium text-foreground/80 mb-1">
                Description
              </label>
              <textarea
                required
                name="description"
                placeholder="Enter event description"
                value={formData.description}
                onChange={handleChange}
                className="w-full min-h-[100px] px-3 py-2 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                required
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />

              <Input
                required
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <Input
              required
              label="Location"
              name="location"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                required
                label="Capacity"
                name="capacity"
                type="number"
                placeholder="Enter maximum capacity"
                value={formData.capacity}
                onChange={handleChange}
              />

              <Input
                required
                label="Price"
                name="price"
                type="number"
                placeholder="Enter ticket price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Image URL"
              name="imageUrl"
              placeholder="Enter image URL"
              value={formData.imageUrl}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-4">
              <Button
                variant="bordered"
                onClick={() => router.push("/publisher/dashboard")}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                Update Event
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
} 