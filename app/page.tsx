import { Metadata } from "next";

import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "EventHub - Discover and Create Amazing Events",
  description:
    "Find and create the best events in your area. From concerts to conferences, sports to workshops - discover events that match your interests.",
  openGraph: {
    title: "EventHub - Discover and Create Amazing Events",
    description:
      "Find and create the best events in your area. From concerts to conferences, sports to workshops - discover events that match your interests.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventHub - Discover and Create Amazing Events",
    description:
      "Find and create the best events in your area. From concerts to conferences, sports to workshops - discover events that match your interests.",
  },
};

export default function Home() {
  return <HomePage />;
}
