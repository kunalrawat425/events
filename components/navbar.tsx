"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { Logo } from "./icons";

import { useUser } from "@/contexts/UserContext";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/events", label: "Discover Events" },
    { href: "/publisher", label: "Are you a Publisher?" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isActive("/")
          ? "bg-background/80 backdrop-blur-xl border-b border-foreground/10 shadow-lg"
          : "bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link className="flex items-center space-x-2" href="/">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              isIconOnly
              className="text-foreground/70 hover:text-primary hover:bg-foreground/5"
              variant="light"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </Button>
            {user ? (
              <>
                {user.role === "publisher" && (
                  <Link href="/publisher/dashboard">
                    <Button
                      className="text-foreground/70 hover:text-primary hover:bg-foreground/5"
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
                      className="text-foreground/70 hover:text-primary hover:bg-foreground/5"
                      variant="light"
                    >
                      <Avatar className="w-8 h-8" name={user.name} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions">
                    <DropdownItem key="profile" className="gap-2">
                      <Link className="flex items-center gap-2" href="/profile">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        View Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      className="text-danger"
                      color="danger"
                      onClick={handleLogout}
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        Logout
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    className={`${
                      isActive("/login")
                        ? "text-white bg-primary hover:bg-primary-400"
                        : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
                    }`}
                    variant="light"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    className={`${
                      isActive("/signup")
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-90"
                    }`}
                    color="primary"
                    disabled={isActive("/signup")}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              isIconOnly
              className="text-foreground/70 hover:text-primary hover:bg-foreground/5"
              variant="light"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </Button>
            <button
              className="p-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-foreground/5 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
        <div className="md:hidden bg-background/80 backdrop-blur-xl border-t border-foreground/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? "text-primary bg-foreground/5"
                    : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
                }`}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                {user.role === "publisher" && (
                  <Link
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-foreground/5"
                    href="/publisher/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-foreground/5"
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Profile
                </Link>
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-danger hover:bg-foreground/5"
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
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/login")
                      ? "text-primary bg-foreground/5"
                      : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
                  }`}
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/signup")
                      ? "text-primary bg-foreground/5"
                      : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
                  }`}
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
};

export default Navbar;
