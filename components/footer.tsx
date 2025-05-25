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
              Connecting people through amazing events. Discover, create, and share
              unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <Button
                isIconOnly
                variant="light"
                className="text-foreground/70 hover:text-white"
              >
                <TwitterIcon />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className="text-foreground/70 hover:text-white"
              >
                <FacebookIcon />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className="text-foreground/70 hover:text-white"
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
                  href="/events"
                  className="text-foreground/70 hover:text-white transition-colors"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href="/publisher"
                  className="text-foreground/70 hover:text-white transition-colors"
                >
                  Become a Publisher
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-foreground/70 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground/70 hover:text-white transition-colors"
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
                  href="/help"
                  className="text-foreground/70 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-foreground/70 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-foreground/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-foreground/70 hover:text-white transition-colors"
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
                type="email"
                placeholder="Enter your email"
                className="bg-background/50 border-divider/50 text-white placeholder:text-foreground/50"
              />
              <Button
                color="primary"
                className="w-full text-white hover:text-white/90"
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
                href="/privacy"
                className="text-foreground/70 hover:text-white text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-foreground/70 hover:text-white text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-foreground/70 hover:text-white text-sm transition-colors"
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