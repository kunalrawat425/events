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
      console.log("Creating event:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to events list on success
      router.push("/publisher/dashboard/events");
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              Create New Event
            </h1>
            <p className="text-foreground/70 text-lg">
              Fill in the details below to create your amazing event
            </p>
          </div>
          
          <Card className="bg-background/50 backdrop-blur-xl border border-divider/50 shadow-xl">
            <CardBody className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Event Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-lg font-medium text-white">
                    Event Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a catchy title for your event"
                    required
                    className="w-full bg-background/50 border-divider/50 text-white placeholder:text-foreground/50 focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Event Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-lg font-medium text-white">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what makes your event special..."
                    required
                    className="w-full min-h-[200px] px-4 py-3 rounded-lg bg-background/50 border border-divider/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-foreground/50 resize-none"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-lg font-medium text-white">
                      Date
                    </label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-background/50 border-divider/50 text-white focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="time" className="block text-lg font-medium text-white">
                      Time
                    </label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full bg-background/50 border-divider/50 text-white focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-lg font-medium text-white">
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Where will your event take place?"
                    required
                    className="w-full bg-background/50 border-divider/50 text-white placeholder:text-foreground/50 focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Category and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-lg font-medium text-white">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-divider/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
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
                    <label htmlFor="price" className="block text-lg font-medium text-white">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50">$</span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                        className="w-full pl-8 bg-background/50 border-divider/50 text-white placeholder:text-foreground/50 focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <label htmlFor="capacity" className="block text-lg font-medium text-white">
                    Capacity
                  </label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Maximum number of attendees"
                    min="1"
                    required
                    className="w-full bg-background/50 border-divider/50 text-white placeholder:text-foreground/50 focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Event Image */}
                <div className="space-y-2">
                  <label htmlFor="image" className="block text-lg font-medium text-white">
                    Event Image
                  </label>
                  <div className="relative">
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full bg-background/50 border-divider/50 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                    />
                  </div>
                  <p className="text-sm text-foreground/50 mt-2">
                    Recommended size: 1200x630 pixels. Max file size: 5MB
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 text-lg font-semibold bg-gradient-to-r from-primary to-primary-400 hover:from-primary-400 hover:to-primary transition-all duration-300"
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