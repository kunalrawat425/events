import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    price: string;
    attendees: number;
    category: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="group relative overflow-hidden border border-foreground/10 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          fill
          alt={event.title}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={
            imageError
              ? "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
              : event.image
          }
          onError={() => setImageError(true)}
        />
        {/* Category Badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {event.category}
          </span>
        </div>
        {/* Price Badge */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-background/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">
            {event.price}
          </span>
        </div>
        {/* Save Button */}
        <button
          className="absolute bottom-4 right-4 rounded-full bg-background/90 p-2 text-foreground/70 backdrop-blur-sm transition-colors duration-200 hover:text-danger"
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
        >
          <HeartIcon className={`h-5 w-5 ${isSaved ? "fill-danger text-danger" : ""}`} />
        </button>
      </div>

      <CardBody className="p-6">
        {/* Title */}
        <h3 className="mb-2 line-clamp-1 text-xl font-bold transition-colors duration-200 group-hover:text-primary">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-foreground/70">{event.description}</p>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-foreground/70">
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <ClockIcon className="mr-2 h-4 w-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <MapPinIcon className="mr-2 h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <UserGroupIcon className="mr-2 h-4 w-4 text-primary" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
      </CardBody>

      <CardFooter className="p-6 pt-0">
        <Link className="w-full" href={`/events/${event.id}`}>
          <Button
            className="w-full transition-transform duration-200 group-hover:scale-[1.02]"
            color="primary"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
