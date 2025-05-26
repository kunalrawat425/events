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
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@heroui/react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  category: string;
  organizer: string;
}

interface EventTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  isPublisher?: boolean;
}

export const EventTable = ({
  events,
  onEdit,
  onDelete,
  isPublisher = false,
}: EventTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setEditMode(true);
    onOpen();
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete(eventId);
    }
  };

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "primary";
      case "ongoing":
        return "success";
      case "completed":
        return "default";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const columns = [
    { name: "Title", uid: "title" },
    { name: "Date", uid: "date" },
    { name: "Location", uid: "location" },
    { name: "Category", uid: "category" },
    { name: "Status", uid: "status" },
    { name: "Organizer", uid: "organizer" },
    { name: "Actions", uid: "actions" },
  ];

  return (
    <>
      <Table aria-label="Events table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {events.map((event) => (
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
              <TableCell>{event.organizer}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="light"
                    onPress={() => handleEdit(event)}
                  >
                    Edit
                  </Button>
                  {isPublisher && (
                    <Button
                      color="danger"
                      size="sm"
                      variant="light"
                      onPress={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  )}
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
              <ModalHeader>
                {editMode ? "Edit Event" : "Event Details"}
              </ModalHeader>
              <ModalBody>
                {selectedEvent && (
                  <div className="flex flex-col gap-4">
                    <Input
                      disabled={!editMode}
                      label="Title"
                      value={selectedEvent.title}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          title: e.target.value,
                        })
                      }
                    />
                    <Textarea
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
                      label="Category"
                      value={selectedEvent.category}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {editMode ? (
                  <>
                    <Button
                      color="primary"
                      onPress={() => {
                        if (selectedEvent) {
                          onEdit(selectedEvent);
                          onClose();
                        }
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="light" onPress={onClose}>
                    Close
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
