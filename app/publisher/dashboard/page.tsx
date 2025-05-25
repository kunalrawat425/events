"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Pagination } from "@heroui/pagination";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "draft" | "published" | "cancelled";
  attendees: number;
  revenue: number;
}

const ITEMS_PER_PAGE = 10;

// Mock data - replace with actual data fetching
const stats = [
  {
    name: "Total Events",
    value: "12",
    change: "+2",
    changeType: "increase",
    icon: CalendarIcon,
  },
  {
    name: "Total Attendees",
    value: "1,234",
    change: "+123",
    changeType: "increase",
    icon: UserGroupIcon,
  },
  {
    name: "Revenue",
    value: "$12,345",
    change: "+$1,234",
    changeType: "increase",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    change: "+0.4%",
    changeType: "increase",
    icon: ChartBarIcon,
  },
];

const recentEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    date: "March 15, 2024",
    attendees: 234,
    revenue: "$23,400",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Workshop: Web Development",
    date: "March 10, 2024",
    attendees: 45,
    revenue: "$4,500",
    status: "completed",
  },
  {
    id: "3",
    title: "Networking Mixer",
    date: "March 5, 2024",
    attendees: 89,
    revenue: "$8,900",
    status: "completed",
  },
];

export default function PublisherDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "all");
  const [dateFilter, setDateFilter] = useState<string>(searchParams.get("date") || "all");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    // Update URL with current filters and pagination
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (dateFilter !== "all") params.set("date", dateFilter);
    if (currentPage > 1) params.set("page", currentPage.toString());
    
    router.push(`/publisher/dashboard?${params.toString()}`);
  }, [searchQuery, statusFilter, dateFilter, currentPage]);

  const fetchEvents = async () => {
    // Mock data for demonstration
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Summer Music Festival",
        date: "2024-07-15",
        location: "Central Park",
        status: "published",
        attendees: 500,
        revenue: 25000,
      },
      {
        id: "2",
        title: "Tech Conference 2024",
        date: "2024-08-20",
        location: "Convention Center",
        status: "draft",
        attendees: 0,
        revenue: 0,
      },
      {
        id: "3",
        title: "Food & Wine Festival",
        date: "2024-09-10",
        location: "Downtown Square",
        status: "published",
        attendees: 300,
        revenue: 15000,
      },
      {
        id: "4",
        title: "Art Exhibition",
        date: "2024-10-05",
        location: "Modern Art Museum",
        status: "draft",
        attendees: 0,
        revenue: 0,
      },
      {
        id: "5",
        title: "Sports Tournament",
        date: "2024-11-15",
        location: "Sports Complex",
        status: "cancelled",
        attendees: 0,
        revenue: 0,
      },
      // Add more mock events for pagination testing
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 6}`,
        title: `Event ${i + 6}`,
        date: new Date(2024, 11, i + 1).toISOString().split('T')[0],
        location: `Venue ${i + 1}`,
        status: ["draft", "published", "cancelled"][Math.floor(Math.random() * 3)] as Event["status"],
        attendees: Math.floor(Math.random() * 1000),
        revenue: Math.floor(Math.random() * 50000),
      })),
    ];
    setEvents(mockEvents);
    setIsLoading(false);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesDate = dateFilter === "all" || 
      (dateFilter === "upcoming" && new Date(event.date) > new Date()) ||
      (dateFilter === "past" && new Date(event.date) < new Date());
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (eventId: string) => {
    // TODO: Implement actual delete functionality
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleStatusChange = async (eventId: string, newStatus: Event["status"]) => {
    // TODO: Implement actual status update functionality
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground/80">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-foreground/70">Welcome back! Here's an overview of your events.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-background/50 backdrop-blur-sm border border-foreground/10">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/70">{stat.name}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-foreground/70 ml-2">from last month</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Events */}
      <Card className="bg-background/50 backdrop-blur-sm border border-foreground/10">
        <CardHeader className="px-6 py-4">
          <h2 className="text-lg font-semibold">Recent Events</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-foreground/10">
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground/70">Event</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground/70">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground/70">Attendees</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground/70">Revenue</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground/70">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {recentEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-foreground/5">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{event.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground/70">{event.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground/70">{event.attendees}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground/70">{event.revenue}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <div className="min-h-screen p-8 bg-gradient-to-b from-background to-background/95">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                Publisher Dashboard
              </h1>
              <p className="text-foreground/80 mt-2">
                Manage your events and track their performance
              </p>
            </div>
            <Button
              color="primary"
              onClick={() => router.push("/publisher/dashboard/events/create")}
              className="px-6"
            >
              Create New Event
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-divider/50">
              <div className="text-2xl font-bold text-primary mb-1">{events.length}</div>
              <div className="text-foreground/80">Total Events</div>
            </div>
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-divider/50">
              <div className="text-2xl font-bold text-success mb-1">
                {events.filter(e => e.status === "published").length}
              </div>
              <div className="text-foreground/80">Published Events</div>
            </div>
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-divider/50">
              <div className="text-2xl font-bold text-warning mb-1">
                {events.filter(e => e.status === "draft").length}
              </div>
              <div className="text-foreground/80">Draft Events</div>
            </div>
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-divider/50">
              <div className="text-2xl font-bold text-primary mb-1">
                ${events.reduce((sum, event) => sum + event.revenue, 0).toLocaleString()}
              </div>
              <div className="text-foreground/80">Total Revenue</div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full"
            />
            <Select
              placeholder="Filter by status"
              selectedKeys={[statusFilter]}
              onSelectionChange={(keys) => {
                setStatusFilter(Array.from(keys)[0] as string);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className="w-full"
            >
              <SelectItem key="all">All Status</SelectItem>
              <SelectItem key="draft">Draft</SelectItem>
              <SelectItem key="published">Published</SelectItem>
              <SelectItem key="cancelled">Cancelled</SelectItem>
            </Select>
            <Select
              placeholder="Filter by date"
              selectedKeys={[dateFilter]}
              onSelectionChange={(keys) => {
                setDateFilter(Array.from(keys)[0] as string);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className="w-full"
            >
              <SelectItem key="all">All Dates</SelectItem>
              <SelectItem key="upcoming">Upcoming</SelectItem>
              <SelectItem key="past">Past</SelectItem>
            </Select>
          </div>

          {/* Events Table */}
          <div className="bg-background/50 backdrop-blur-sm border border-divider/50 rounded-xl overflow-hidden">
            <Table aria-label="Events table">
              <TableHeader>
                <TableColumn>EVENT</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>LOCATION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ATTENDEES</TableColumn>
                <TableColumn>REVENUE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="font-semibold">{event.title}</div>
                    </TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        event.status === "published" ? "bg-success/20 text-success" :
                        event.status === "draft" ? "bg-warning/20 text-warning" :
                        "bg-danger/20 text-danger"
                      }`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{event.attendees}</TableCell>
                    <TableCell>${event.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light" size="sm">
                            Actions
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Event actions">
                          <DropdownItem
                            key="edit"
                            onClick={() => router.push(`/publisher/dashboard/events/${event.id}/edit`)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            key="view"
                            onClick={() => router.push(`/publisher/dashboard/events/${event.id}`)}
                          >
                            View Details
                          </DropdownItem>
                          {event.status === "draft" ? (
                            <DropdownItem
                              key="publish"
                              onClick={() => handleStatusChange(event.id, "published")}
                            >
                              Publish
                            </DropdownItem>
                          ) : event.status === "published" ? (
                            <DropdownItem
                              key="cancel"
                              onClick={() => handleStatusChange(event.id, "cancelled")}
                              color="danger"
                            >
                              Cancel
                            </DropdownItem>
                          ) : null}
                          <DropdownItem
                            key="delete"
                            onClick={() => handleDelete(event.id)}
                            color="danger"
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
                classNames={{
                  cursor: "bg-primary text-primary-foreground",
                }}
              />
            </div>
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-foreground/80 mb-4">
                {searchQuery || statusFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first event to get started"}
              </p>
              <Button
                color="primary"
                onClick={() => router.push("/publisher/dashboard/events/create")}
              >
                Create New Event
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 