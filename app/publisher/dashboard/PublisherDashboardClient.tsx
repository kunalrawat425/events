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
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Pagination } from "@heroui/pagination";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "draft" | "published" | "cancelled";
  attendees: number;
  revenue: number;
  category: string;
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

const statusOptions = [
  { key: "all", label: "All Status" },
  { key: "draft", label: "Draft" },
  { key: "published", label: "Published" },
  { key: "cancelled", label: "Cancelled" },
];

const dateOptions = [
  { key: "all", label: "All Dates" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "today", label: "Today" },
  { key: "thisWeek", label: "This Week" },
  { key: "thisMonth", label: "This Month" },
];

const categoryOptions = [
  { key: "all", label: "All Categories" },
  { key: "technology", label: "Technology" },
  { key: "music", label: "Music" },
  { key: "business", label: "Business" },
  { key: "arts", label: "Arts & Culture" },
  { key: "sports", label: "Sports" },
  { key: "food", label: "Food & Drink" },
];

const sortOptions = [
  { key: "dateAsc", label: "Date (Oldest First)" },
  { key: "dateDesc", label: "Date (Newest First)" },
  { key: "attendeesAsc", label: "Attendees (Low to High)" },
  { key: "attendeesDesc", label: "Attendees (High to Low)" },
  { key: "revenueAsc", label: "Revenue (Low to High)" },
  { key: "revenueDesc", label: "Revenue (High to Low)" },
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

export default function PublisherDashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "all");
  const [dateFilter, setDateFilter] = useState<string>(searchParams.get("date") || "all");
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sort") || "dateDesc");
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
    if (categoryFilter !== "all") params.set("category", categoryFilter);
    if (sortBy !== "dateDesc") params.set("sort", sortBy);
    if (currentPage > 1) params.set("page", currentPage.toString());
    
    router.push(`/publisher/dashboard?${params.toString()}`);
  }, [searchQuery, statusFilter, dateFilter, categoryFilter, sortBy, currentPage]);

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
        category: "Music",
      },
      {
        id: "2",
        title: "Tech Conference 2024",
        date: "2024-08-20",
        location: "Convention Center",
        status: "draft",
        attendees: 0,
        revenue: 0,
        category: "Technology",
      },
      // Add more mock events as needed
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
                       (dateFilter === "past" && new Date(event.date) < new Date()) ||
                       (dateFilter === "today" && new Date(event.date).toDateString() === new Date().toDateString()) ||
                       (dateFilter === "thisWeek" && isThisWeek(new Date(event.date))) ||
                       (dateFilter === "thisMonth" && isThisMonth(new Date(event.date)));
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesDate && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "dateAsc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "dateDesc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "attendeesAsc":
        return a.attendees - b.attendees;
      case "attendeesDesc":
        return b.attendees - a.attendees;
      case "revenueAsc":
        return a.revenue - b.revenue;
      case "revenueDesc":
        return b.revenue - a.revenue;
      default:
        return 0;
    }
  });

  // Helper functions for date filtering
  const isThisWeek = (date: Date) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return date >= startOfWeek && date <= endOfWeek;
  };

  const isThisMonth = (date: Date) => {
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

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
      <div className="h-full flex items-center justify-center">
        <div className="text-foreground/80">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-background/50 backdrop-blur-lg">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60">{stat.name}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === "increase" ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
          startContent={<MagnifyingGlassIcon className="w-4 h-4 text-foreground/50" />}
        />
        <div className="flex flex-wrap gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                endContent={<ChevronDownIcon className="w-4 h-4" />}
              >
                Status: {statusOptions.find(opt => opt.key === statusFilter)?.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Status filter"
              onAction={(key) => setStatusFilter(key as string)}
            >
              {statusOptions.map((option) => (
                <DropdownItem key={option.key}>{option.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                endContent={<ChevronDownIcon className="w-4 h-4" />}
              >
                Date: {dateOptions.find(opt => opt.key === dateFilter)?.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Date filter"
              onAction={(key) => setDateFilter(key as string)}
            >
              {dateOptions.map((option) => (
                <DropdownItem key={option.key}>{option.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                endContent={<ChevronDownIcon className="w-4 h-4" />}
              >
                Category: {categoryOptions.find(opt => opt.key === categoryFilter)?.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Category filter"
              onAction={(key) => setCategoryFilter(key as string)}
            >
              {categoryOptions.map((option) => (
                <DropdownItem key={option.key}>{option.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                endContent={<ChevronDownIcon className="w-4 h-4" />}
              >
                Sort: {sortOptions.find(opt => opt.key === sortBy)?.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Sort options"
              onAction={(key) => setSortBy(key as string)}
            >
              {sortOptions.map((option) => (
                <DropdownItem key={option.key}>{option.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button
            color="primary"
            onClick={() => router.push("/publisher/events/create")}
          >
            Create Event
          </Button>
        </div>
      </div>

      {/* Events Table */}
      <Card className="bg-background/50 backdrop-blur-lg w-full">
        <CardBody className="p-0">
          <Table 
            aria-label="Events table"
            className="w-full"
          >
            <TableHeader>
              <TableColumn>Title</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Location</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Attendees</TableColumn>
              <TableColumn>Revenue</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          variant={event.status === "published" ? "solid" : "bordered"}
                          color={
                            event.status === "published"
                              ? "success"
                              : event.status === "cancelled"
                              ? "danger"
                              : "default"
                          }
                        >
                          {event.status}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        onAction={(key) =>
                          handleStatusChange(event.id, key as Event["status"])
                        }
                      >
                        <DropdownItem key="draft">Draft</DropdownItem>
                        <DropdownItem key="published">Published</DropdownItem>
                        <DropdownItem key="cancelled">Cancelled</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                  <TableCell>{event.attendees}</TableCell>
                  <TableCell>${event.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="bordered"
                        onClick={() => router.push(`/publisher/events/${event.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="bordered"
                        onClick={() => handleDelete(event.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center p-4">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
} 