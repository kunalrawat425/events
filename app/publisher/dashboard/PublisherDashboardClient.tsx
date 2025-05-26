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

export default function PublisherDashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get("status") || "all",
  );
  const [dateFilter, setDateFilter] = useState<string>(
    searchParams.get("date") || "all",
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
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
        date: new Date(2024, 11, i + 1).toISOString().split("T")[0],
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
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "upcoming" && new Date(event.date) > new Date()) ||
      (dateFilter === "past" && new Date(event.date) < new Date());

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (eventId: string) => {
    // TODO: Implement actual delete functionality
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleStatusChange = async (
    eventId: string,
    newStatus: Event["status"],
  ) => {
    // TODO: Implement actual status update functionality
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event,
      ),
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground/80">Loading...</div>
      </div>
    );
  }

  return (
    // ... (copy the full return JSX from the original page.tsx)
    // For brevity, you can copy the entire JSX from the original file here.
    <></>
  );
} 