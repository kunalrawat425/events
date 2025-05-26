import { useRouter } from "next/navigation";

import { useUser } from "@/contexts/UserContext";

export const useBookingAuth = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleBookingAuth = async (eventId: string) => {
    if (!user) {
      router.push(`/login?redirect=/events/${eventId}/book`);

      return false;
    }

    return true;
  };

  return { handleBookingAuth };
};
