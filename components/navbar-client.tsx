"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@heroui/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";

import { Logo } from "./icons";

import { useUser } from "@/contexts/UserContext";

interface NavbarClientProps {
  initialUser: any;
  navLinks: { href: string; label: string }[];
}

export function NavbarClient({ initialUser, navLinks }: NavbarClientProps) {
  const router = useRouter();
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Use client-side user state if available, otherwise fall back to initialUser
  const currentUser = user || initialUser;

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isActive("/")
          ? "border-b border-foreground/10 bg-background/80 shadow-lg backdrop-blur-xl"
          : "bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center space-x-2" href="/">
            <Logo className="h-8 w-8" />
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-xl font-bold text-transparent">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href) ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons and Theme Toggle */}
          <div className="hidden items-center space-x-4 md:flex">
            <Button
              isIconOnly
              className="text-foreground/70 hover:bg-foreground/5 hover:text-primary"
              variant="light"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
            {currentUser ? (
              <>
                {currentUser.role === "publisher" && (
                  <Link href="/publisher/dashboard">
                    <Button
                      className="text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                      variant="light"
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      className="text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                      variant="light"
                    >
                      <Avatar className="h-8 w-8" name={currentUser.name} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User menu">
                    <DropdownItem key="profile">
                      <Link href="/profile">View Profile</Link>
                    </DropdownItem>
                    <DropdownItem key="logout" className="text-danger" onClick={handleLogout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    className="text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                    variant="light"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button color="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              isIconOnly
              className="text-foreground/70 hover:bg-foreground/5 hover:text-primary"
              variant="light"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
            <button
              className="rounded-lg p-2 text-foreground/70 transition-colors duration-200 hover:bg-foreground/5 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-foreground/10 bg-background/80 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActive(link.href)
                    ? "bg-foreground/5 text-primary"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                }`}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <>
                {currentUser.role === "publisher" && (
                  <Link
                    className="block rounded-md px-3 py-2 text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                    href="/publisher/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Profile
                </Link>
                <button
                  className="w-full rounded-md px-3 py-2 text-left text-base font-medium text-danger hover:bg-foreground/5"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
