import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export const handleBookingAuth = (eventId: string) => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    // Store the event ID in sessionStorage to return after login
    sessionStorage.setItem("returnToEvent", eventId);
    router.push("/login");
    return false;
  }

  return true;
}; 