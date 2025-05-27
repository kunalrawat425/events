"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@heroui/react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  status: "draft" | "published" | "cancelled";
  capacity: number;
  price: number;
}

export default function PublisherEventList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateEvent = () => {
    setSelectedEvent({
      id: Date.now().toString(),
      title: "",
      description: "",
      date: "",
      location: "",
      category: "",
      status: "draft",
      capacity: 0,
      price: 0,
    });
    setIsEditing(true);
    onOpen();
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    onOpen();
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      if (isEditing) {
        setEvents(events.map((event) => (event.id === selectedEvent.id ? selectedEvent : event)));
      } else {
        setEvents([...events, selectedEvent]);
      }
      onClose();
    }
  };

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          className="max-w-xs"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button color="primary" onPress={handleCreateEvent}>
          Create New Event
        </Button>
      </div>

      <Table aria-label="Events table">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Capacity</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell>
                <Chip color={getStatusColor(event.status)} variant="flat">
                  {event.status}
                </Chip>
              </TableCell>
              <TableCell>{event.capacity}</TableCell>
              <TableCell>${event.price}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="light" onPress={() => handleEditEvent(event)}>
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="light"
                    onPress={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{isEditing ? "Edit Event" : "Create New Event"}</ModalHeader>
              <ModalBody>
                {selectedEvent && (
                  <div className="space-y-4">
                    <Input
                      label="Title"
                      value={selectedEvent.title}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          title: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Description"
                      value={selectedEvent.description}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          description: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Date"
                      type="date"
                      value={selectedEvent.date}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          date: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Location"
                      value={selectedEvent.location}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          location: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Category"
                      value={selectedEvent.category}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          category: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Capacity"
                      type="number"
                      value={selectedEvent.capacity.toString()}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          capacity: parseInt(e.target.value),
                        })
                      }
                    />
                    <Input
                      label="Price"
                      type="number"
                      value={selectedEvent.price.toString()}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                    <select
                      className="w-full rounded border p-2"
                      value={selectedEvent.status}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          status: e.target.value as Event["status"],
                        })
                      }
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSaveEvent}>
                  Save
                </Button>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
