"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";

export default function CreateEventPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual event creation
      // const response = await fetch("/api/events", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error("Failed to create event");

      router.push("/publisher/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
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
          <h1 className="text-2xl font-bold">Create New Event</h1>
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
                Create Event
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
} 