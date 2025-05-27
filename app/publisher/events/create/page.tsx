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
      router.push("/publisher/dashboard");
    } catch (error) {
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold">Create New Event</h1>
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground/70">
                  Event Title
                </label>
                <Input
                  id="title"
                  required
                  className="mt-1"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-foreground/80">
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  className="min-h-[100px] w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  name="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-foreground/70">
                    Date
                  </label>
                  <Input
                    id="date"
                    required
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-foreground/70">
                    Time
                  </label>
                  <Input
                    id="time"
                    required
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-foreground/70">
                  Location
                </label>
                <Input
                  id="location"
                  required
                  name="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-foreground/70">
                    Capacity
                  </label>
                  <Input
                    id="capacity"
                    required
                    name="capacity"
                    placeholder="Enter maximum capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-foreground/70">
                    Price
                  </label>
                  <Input
                    id="price"
                    required
                    name="price"
                    placeholder="Enter ticket price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground/70">
                  Image URL
                </label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="bordered" onClick={() => router.push("/publisher/dashboard")}>
                Cancel
              </Button>
              <Button color="primary" isLoading={isLoading} type="submit">
                Create Event
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
