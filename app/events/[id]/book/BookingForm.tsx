"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

// Mock event data - replace with actual data fetching
const eventData = {
  id: "1",
  title: "Tech Conference 2024",
  date: "March 15, 2024",
  time: "9:00 AM - 5:00 PM",
  location: "Convention Center",
  address: "123 Tech Street, San Francisco, CA 94105",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  tickets: [
    {
      id: "1",
      name: "Early Bird",
      price: 299,
      available: 50,
      description: "Access to all sessions and workshops",
    },
    {
      id: "2",
      name: "VIP",
      price: 499,
      available: 20,
      description: "Access to all sessions, workshops, and exclusive networking events",
    },
  ],
};

interface BookingFormProps {
  eventId: string;
}

export default function BookingForm({ eventId }: BookingFormProps) {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !agreeToTerms) return;

    setIsLoading(true);
    try {
      // Add your booking logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      router.push(`/events/${eventId}/confirmation`);
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTicketData = eventData.tickets.find(t => t.id === selectedTicket);
  const totalPrice = selectedTicketData ? selectedTicketData.price * quantity : 0;

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Book Your Tickets</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10">
                <CardBody className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{eventData.title}</h2>
                  <div className="space-y-4">
                    <div className="flex items-center text-foreground/70">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      <span>{eventData.date}</span>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      <span>{eventData.time}</span>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      <span>{eventData.location}</span>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <UserGroupIcon className="w-5 h-5 mr-2" />
                      <span>{selectedTicketData?.available} tickets available</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10">
                  <CardHeader className="p-6">
                    <h3 className="text-xl font-semibold">Select Tickets</h3>
                  </CardHeader>
                  <CardBody className="p-6">
                    <RadioGroup
                      value={selectedTicket}
                      onValueChange={setSelectedTicket}
                      className="space-y-4"
                    >
                      {eventData.tickets.map((ticket) => (
                        <Radio
                          key={ticket.id}
                          value={ticket.id}
                          className="w-full"
                        >
                          <div className="flex justify-between items-start w-full">
                            <div>
                              <p className="font-medium">{ticket.name}</p>
                              <p className="text-sm text-foreground/70">{ticket.description}</p>
                            </div>
                            <p className="font-semibold">${ticket.price}</p>
                          </div>
                        </Radio>
                      ))}
                    </RadioGroup>

                    {selectedTicket && (
                      <div className="mt-6">
                        <label className="block text-sm font-medium mb-2">Quantity</label>
                        <Input
                          type="number"
                          min={1}
                          max={selectedTicketData?.available}
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value))}
                          className="w-24"
                        />
                      </div>
                    )}
                  </CardBody>
                </Card>

                <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10">
                  <CardHeader className="p-6">
                    <h3 className="text-xl font-semibold">Payment Method</h3>
                  </CardHeader>
                  <CardBody className="p-6">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <Radio value="card" className="w-full">
                        <div className="flex items-center">
                          <CreditCardIcon className="w-5 h-5 mr-2" />
                          <span>Credit Card</span>
                        </div>
                      </Radio>
                      <Radio value="paypal" className="w-full">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.067 8.478c.492.315.844.825.844 1.522 0 1.845-1.534 3.373-3.373 3.373h-.674c-.315 0-.674.315-.674.674v1.348c0 .315-.315.674-.674.674h-1.348c-.315 0-.674-.315-.674-.674v-1.348c0-.315-.315-.674-.674-.674h-.674c-1.839 0-3.373-1.528-3.373-3.373 0-.697.352-1.207.844-1.522.315-.315.844-.315 1.348 0 .315.315.674.315.844 0 .315-.315.844-.315 1.348 0z"/>
                          </svg>
                          <span>PayPal</span>
                        </div>
                      </Radio>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="mt-6 space-y-4">
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          type="text"
                          maxLength={19}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiry Date"
                            placeholder="MM/YY"
                            type="text"
                            maxLength={5}
                          />
                          <Input
                            label="CVV"
                            placeholder="123"
                            type="text"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>

                <div className="space-y-4">
                  <Checkbox
                    isSelected={agreeToTerms}
                    onValueChange={setAgreeToTerms}
                  >
                    I agree to the terms and conditions
                  </Checkbox>

                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    disabled={!selectedTicket || !agreeToTerms}
                  >
                    Complete Booking
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10 sticky top-24">
                <CardHeader className="p-6">
                  <h3 className="text-xl font-semibold">Order Summary</h3>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Ticket Price</span>
                      <span>${selectedTicketData?.price || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Quantity</span>
                      <span>{quantity}</span>
                    </div>
                    <Divider />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 