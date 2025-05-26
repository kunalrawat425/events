import { Metadata } from "next";

import PublisherLanding from "./PublisherLanding";

export const metadata: Metadata = {
  title: "Become a Publisher | EventHub",
  description:
    "Join EventHub as a publisher and start creating amazing events. Reach thousands of attendees, manage your events efficiently, and grow your business.",
  openGraph: {
    title: "Become a Publisher | EventHub",
    description:
      "Join EventHub as a publisher and start creating amazing events. Reach thousands of attendees, manage your events efficiently, and grow your business.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Publisher | EventHub",
    description:
      "Join EventHub as a publisher and start creating amazing events. Reach thousands of attendees, manage your events efficiently, and grow your business.",
  },
};

export default function PublisherPage() {
  return <PublisherLanding />;
}
