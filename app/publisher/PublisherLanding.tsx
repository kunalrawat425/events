"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import {
  ChartBarIcon,
  UserGroupIcon,
  SparklesIcon,
  CalendarIcon,
  RocketLaunchIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

import { TwitterIcon, FacebookIcon, InstagramIcon } from "@/components/icons";
import { useUser } from "@/contexts/UserContext";

const features = [
  {
    icon: <ChartBarIcon className="h-8 w-8" />,
    title: "Advanced Analytics",
    description: "Track event performance, attendee engagement, and revenue metrics in real-time",
  },
  {
    icon: <UserGroupIcon className="h-8 w-8" />,
    title: "Audience Insights",
    description:
      "Understand your attendees better with AI-powered demographic and behavior analysis",
  },
  {
    icon: <CalendarIcon className="h-8 w-8" />,
    title: "Smart Scheduling",
    description: "Optimize event timing with AI recommendations based on audience availability",
  },
];

const benefits = [
  {
    icon: <RocketLaunchIcon className="h-8 w-8" />,
    title: "Reach More Attendees",
    description: "Our AI-powered platform helps you connect with the right audience",
    stats: "2.5x more attendees",
  },
  {
    icon: <BellAlertIcon className="h-8 w-8" />,
    title: "Smart Notifications",
    description: "Automated reminders and personalized communication with attendees",
    stats: "85% open rate",
  },
  {
    icon: <SparklesIcon className="h-8 w-8" />,
    title: "AI-Powered Marketing",
    description: "Let our AI optimize your event promotion and marketing campaigns",
    stats: "3x ROI",
  },
];

export default function PublisherLanding() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in as a publisher, redirect to dashboard
    if (user?.role === "publisher") {
      router.push("/publisher/dashboard");
    }
  }, [user, router]);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative z-10 w-full px-4 py-32">
          <div className="w-full text-center">
            <h1 className="mb-6 bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Grow Your Event Business
            </h1>
            <p className="mb-12 text-xl text-foreground/80 md:text-2xl">
              Join our platform and leverage AI to create, manage, and grow successful events
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/publisher/signup">
                <Button className="px-8 text-lg" color="primary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button className="px-8 text-lg" size="lg" variant="bordered">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background/50 py-32" id="features">
        <div className="w-full px-4">
          <div className="w-full">
            <div className="mb-20 text-center">
              <h2 className="mb-4 text-4xl font-bold">Powerful Features for Publishers</h2>
              <p className="text-xl text-foreground/60">
                Everything you need to create and manage successful events
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border border-foreground/10 bg-background/50 backdrop-blur-lg"
                >
                  <CardBody className="p-8">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-foreground/60">{feature.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-background to-background/80 py-32">
        <div className="w-full px-4">
          <div className="w-full">
            <div className="mb-20 text-center">
              <h2 className="mb-4 text-4xl font-bold">Why Choose Our Platform?</h2>
              <p className="text-xl text-foreground/60">
                Join thousands of successful event organizers
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border border-foreground/10 bg-background/50 backdrop-blur-lg"
                >
                  <CardBody className="p-8">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {benefit.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                    <p className="mb-4 text-foreground/60">{benefit.description}</p>
                    <p className="font-medium text-primary">{benefit.stats}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/20 via-background to-background py-32">
        <div className="w-full px-4">
          <div className="w-full text-center">
            <h2 className="mb-6 text-4xl font-bold">Ready to Transform Your Event Business?</h2>
            <p className="mb-12 text-xl text-foreground/60">
              Join our platform today and start creating amazing events with AI-powered tools
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/publisher/signup">
                <Button className="px-8 text-lg" color="primary" size="lg">
                  Start Publishing
                </Button>
              </Link>
              <Link href="/publisher/login">
                <Button className="px-8 text-lg" size="lg" variant="bordered">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-divider/50 bg-background/95">
        <div className="w-full px-4 py-12">
          <div className="w-full">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/about">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/careers">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/blog">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/help">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/guides">
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/privacy">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/terms">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link className="text-foreground/80 hover:text-primary" href="/cookies">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Connect</h3>
                <div className="flex space-x-4">
                  <Button isIconOnly aria-label="Twitter" variant="light">
                    <TwitterIcon className="text-foreground/80" />
                  </Button>
                  <Button isIconOnly aria-label="Facebook" variant="light">
                    <FacebookIcon className="text-foreground/80" />
                  </Button>
                  <Button isIconOnly aria-label="Instagram" variant="light">
                    <InstagramIcon className="text-foreground/80" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-divider/50 pt-8 text-center text-foreground/60">
              <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
