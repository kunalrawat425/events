"use client";

import { useUser } from "@/contexts/UserContext";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import {
  UserCircleIcon,
  CalendarIcon,
  TicketIcon,
  HeartIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { user, logout } = useUser();

  // Mock data for user's events
  const userEvents = [
    {
      id: "1",
      title: "Tech Conference 2024",
      date: "March 15, 2024",
      status: "upcoming",
      ticketType: "VIP Pass",
    },
    {
      id: "2",
      title: "Music Festival",
      date: "April 20, 2024",
      status: "upcoming",
      ticketType: "General Admission",
    },
    {
      id: "3",
      title: "Food & Wine Expo",
      date: "February 10, 2024",
      status: "past",
      ticketType: "Weekend Pass",
    },
  ];

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardBody className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserCircleIcon className="w-16 h-16 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
                  <p className="text-foreground/70 mb-4">{user?.email}</p>
                  <Button
                    variant="bordered"
                    color="danger"
                    onPress={logout}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Profile Content */}
          <Tabs aria-label="Profile sections">
            <Tab
              key="events"
              title={
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>My Events</span>
                </div>
              }
            >
              <div className="space-y-4 mt-4">
                {userEvents.map((event) => (
                  <Card key={event.id}>
                    <CardBody className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-foreground/70">
                            <div className="flex items-center">
                              <CalendarIcon className="w-5 h-5 mr-2" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <TicketIcon className="w-5 h-5 mr-2" />
                              <span>{event.ticketType}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          event.status === "upcoming" 
                            ? "bg-success-100 text-success-600"
                            : "bg-foreground/10 text-foreground/70"
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </Tab>

            <Tab
              key="saved"
              title={
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-5 h-5" />
                  <span>Saved Events</span>
                </div>
              }
            >
              <div className="mt-4 text-center text-foreground/70">
                <p>You haven't saved any events yet.</p>
                <Button
                  variant="light"
                  className="mt-4"
                  onPress={() => window.location.href = "/events"}
                >
                  Browse Events
                </Button>
              </div>
            </Tab>

            <Tab
              key="notifications"
              title={
                <div className="flex items-center gap-2">
                  <BellIcon className="w-5 h-5" />
                  <span>Notifications</span>
                </div>
              }
            >
              <div className="mt-4 text-center text-foreground/70">
                <p>You have no new notifications.</p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </main>
  );
} 