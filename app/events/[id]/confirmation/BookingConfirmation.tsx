"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  CheckCircleIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Mock booking data - replace with actual data fetching
const bookingData = {
  id: "BK123456",
  event: {
    id: "1",
    title: "Tech Conference 2024",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center",
    address: "123 Tech Street, San Francisco, CA 94105",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  },
  tickets: [
    {
      name: "Early Bird",
      quantity: 2,
      price: 299,
    },
  ],
  totalAmount: 598,
  status: "confirmed",
  purchaseDate: "March 1, 2024",
};

interface BookingConfirmationProps {
  eventId: string;
}

export default function BookingConfirmation({
  eventId,
}: BookingConfirmationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading booking data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-foreground/70">
              Your booking has been successfully confirmed. Here are your
              booking details.
            </p>
          </div>

          <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10 mb-8">
            <CardBody className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    {bookingData.event.title}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center text-foreground/70">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      <span>{bookingData.event.date}</span>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      <span>{bookingData.event.time}</span>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      <span>{bookingData.event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-foreground/10 pt-6">
                  <h3 className="font-semibold mb-4">Booking Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Booking ID</span>
                      <span className="font-medium">{bookingData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Purchase Date</span>
                      <span>{bookingData.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Status</span>
                      <span className="text-green-600 font-medium">
                        Confirmed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-foreground/10 pt-6">
                  <h3 className="font-semibold mb-4">Ticket Details</h3>
                  {bookingData.tickets.map((ticket, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <div>
                        <p className="font-medium">{ticket.name}</p>
                        <p className="text-sm text-foreground/70">
                          Quantity: {ticket.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${ticket.price * ticket.quantity}
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-foreground/10 mt-4 pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>${bookingData.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="space-y-4">
            <Button
              as={Link}
              className="w-full"
              color="primary"
              href={`/events/${eventId}`}
            >
              View Event Details
            </Button>
            <Button
              as={Link}
              className="w-full"
              href="/dashboard"
              variant="bordered"
            >
              Go to Dashboard
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-foreground/70">
            <p>
              A confirmation email has been sent to your registered email
              address.
            </p>
            <p className="mt-2">
              Need help?{" "}
              <Link className="text-primary hover:underline" href="/support">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
