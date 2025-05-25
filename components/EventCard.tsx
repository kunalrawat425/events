import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { CalendarIcon, MapPinIcon, UserGroupIcon, ClockIcon, HeartIcon } from "@heroicons/react/24/outline";
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
    <Card className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-foreground/10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageError ? "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" : event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-white backdrop-blur-sm">
            {event.category}
          </span>
        </div>
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-background/90 text-foreground backdrop-blur-sm">
            {event.price}
          </span>
        </div>
        {/* Save Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground/70 hover:text-danger transition-colors duration-200"
        >
          <HeartIcon className={`w-5 h-5 ${isSaved ? 'text-danger fill-danger' : ''}`} />
        </button>
      </div>

      <CardBody className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-foreground/70">
            <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <ClockIcon className="w-4 h-4 mr-2 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <MapPinIcon className="w-4 h-4 mr-2 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <UserGroupIcon className="w-4 h-4 mr-2 text-primary" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
      </CardBody>

      <CardFooter className="p-6 pt-0">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button
            color="primary"
            className="w-full group-hover:scale-[1.02] transition-transform duration-200"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 