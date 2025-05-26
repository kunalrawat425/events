"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { TwitterIcon, FacebookIcon, InstagramIcon } from "@/components/icons";

export default function Footer() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (!isLandingPage) return null;

  return (
    <footer className="bg-background/95 backdrop-blur-xl border-t border-divider/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">EventHub</h3>
            <p className="text-foreground/70">
              Connecting people through amazing events. Discover, create, and
              share unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <Button
                isIconOnly
                className="text-foreground/70 hover:text-white"
                variant="light"
              >
                <TwitterIcon />
              </Button>
              <Button
                isIconOnly
                className="text-foreground/70 hover:text-white"
                variant="light"
              >
                <FacebookIcon />
              </Button>
              <Button
                isIconOnly
                className="text-foreground/70 hover:text-white"
                variant="light"
              >
                <InstagramIcon />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-foreground/70 hover:text-white transition-colors"
                  href="/events"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-white transition-colors"
                  href="/publisher"
                >
                  Become a Publisher
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-white transition-colors"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-white transition-colors"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-foreground/70 hover:text-white transition-colors"
                  href="/help"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-white transition-colors"
                  href="/faq"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-white transition-colors"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-white transition-colors"
                  href="/terms"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-foreground/70">
              Subscribe to our newsletter for the latest updates and event
              recommendations.
            </p>
            <form className="space-y-2">
              <Input
                className="bg-background/50 border-divider/50 text-white placeholder:text-foreground/50"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                className="w-full text-white hover:text-white/90"
                color="primary"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-divider/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-foreground/70 text-sm">
              © {new Date().getFullYear()} EventHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                className="text-foreground/70 hover:text-white text-sm transition-colors"
                href="/privacy"
              >
                Privacy
              </Link>
              <Link
                className="text-foreground/70 hover:text-white text-sm transition-colors"
                href="/terms"
              >
                Terms
              </Link>
              <Link
                className="text-foreground/70 hover:text-white text-sm transition-colors"
                href="/cookies"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
