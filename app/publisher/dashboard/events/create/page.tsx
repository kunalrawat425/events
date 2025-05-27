"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    price: "",
    capacity: "",
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement event creation logic

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to events list on success
      router.push("/publisher/dashboard/events");
    } catch {
      // Handle error silently or show a toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-12 space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-4xl font-bold text-transparent">
              Create New Event
            </h1>
            <p className="text-lg text-foreground/70">
              Fill in the details below to create your amazing event
            </p>
          </div>

          <Card className="border border-divider/50 bg-background/50 shadow-xl backdrop-blur-xl">
            <CardBody className="p-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Event Title */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white" htmlFor="title">
                    Event Title
                  </label>
                  <Input
                    required
                    className="w-full border-divider/50 bg-background/50 text-white placeholder:text-foreground/50 focus:ring-2 focus:ring-primary/50"
                    id="title"
                    name="title"
                    placeholder="Enter a catchy title for your event"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                {/* Event Description */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    required
                    className="min-h-[200px] w-full resize-none rounded-lg border border-divider/50 bg-background/50 px-4 py-3 text-white placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    id="description"
                    name="description"
                    placeholder="Describe what makes your event special..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-lg font-medium text-white" htmlFor="date">
                      Date
                    </label>
                    <Input
                      required
                      className="w-full border-divider/50 bg-background/50 text-white focus:ring-2 focus:ring-primary/50"
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-lg font-medium text-white" htmlFor="time">
                      Time
                    </label>
                    <Input
                      required
                      className="w-full border-divider/50 bg-background/50 text-white focus:ring-2 focus:ring-primary/50"
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white" htmlFor="location">
                    Location
                  </label>
                  <Input
                    required
                    className="w-full border-divider/50 bg-background/50 text-white placeholder:text-foreground/50 focus:ring-2 focus:ring-primary/50"
                    id="location"
                    name="location"
                    placeholder="Where will your event take place?"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                {/* Category and Price */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-lg font-medium text-white" htmlFor="category">
                      Category
                    </label>
                    <select
                      required
                      className="w-full rounded-lg border border-divider/50 bg-background/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      <option value="conference">Conference</option>
                      <option value="workshop">Workshop</option>
                      <option value="concert">Concert</option>
                      <option value="exhibition">Exhibition</option>
                      <option value="networking">Networking</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-lg font-medium text-white" htmlFor="price">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50">
                        $
                      </span>
                      <Input
                        required
                        className="w-full border-divider/50 bg-background/50 pl-8 text-white placeholder:text-foreground/50 focus:ring-2 focus:ring-primary/50"
                        id="price"
                        min="0"
                        name="price"
                        placeholder="0.00"
                        step="0.01"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white" htmlFor="capacity">
                    Capacity
                  </label>
                  <Input
                    required
                    className="w-full border-divider/50 bg-background/50 text-white placeholder:text-foreground/50 focus:ring-2 focus:ring-primary/50"
                    id="capacity"
                    min="1"
                    name="capacity"
                    placeholder="Maximum number of attendees"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </div>

                {/* Event Image */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white" htmlFor="image">
                    Event Image
                  </label>
                  <div className="relative">
                    <Input
                      accept="image/*"
                      className="w-full border-divider/50 bg-background/50 text-white file:mr-4 file:rounded-full file:border-0 file:bg-primary/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/30"
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>
                  <p className="mt-2 text-sm text-foreground/50">
                    Recommended size: 1200x630 pixels. Max file size: 5MB
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary-400 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:from-primary-400 hover:to-primary md:w-auto"
                    color="primary"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Creating Event..." : "Create Event"}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
