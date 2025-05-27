"use client";

import { NavbarClient } from "./navbar-client";

import { useUser } from "@/contexts/UserContext";

export function Navbar() {
  const { user } = useUser();

  const navLinks = [
    {
      href: "/events",
      label: "Discover Events",
    },
  ];

  if (!user) {
    navLinks.push({
      href: "/publisher",
      label: "Become a Publisher",
    });
  }

  return <NavbarClient navLinks={navLinks} user={user} />;
}
