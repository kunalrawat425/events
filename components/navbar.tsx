import { cookies } from "next/headers";

import { NavbarClient } from "./navbar-client";

export default async function Navbar() {
  // Get user data from cookies
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  let user = null;

  if (userCookie?.value) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      // Silently handle parsing error
    }
  }

  // Navigation links based on user role and login status
  const navLinks = [];

  // Only show Discover Events for non-publishers
  if (!user || (user && user.role !== "publisher")) {
    navLinks.push({ href: "/events", label: "Discover Events" });
  }

  // Only show Become a Publisher for non-logged in users
  if (!user) {
    navLinks.push({ href: "/publisher", label: "Become a Publisher" });
  }

  return <NavbarClient initialUser={user} navLinks={navLinks} />;
}
