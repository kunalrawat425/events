"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { TwitterIcon, FacebookIcon, InstagramIcon } from "@/components/icons";
import {
  ChartBarIcon,
  UserGroupIcon,
  TicketIcon,
  SparklesIcon,
  CalendarIcon,
  RocketLaunchIcon,
  BellAlertIcon
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: <ChartBarIcon className="w-8 h-8" />,
    title: "Advanced Analytics",
    description: "Track event performance, attendee engagement, and revenue metrics in real-time",
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: "Audience Insights",
    description: "Understand your attendees better with AI-powered demographic and behavior analysis",
  },
  {
    icon: <CalendarIcon className="w-8 h-8" />,
    title: "Smart Scheduling",
    description: "Optimize event timing with AI recommendations based on audience availability",
  },
];

const benefits = [
  {
    icon: <RocketLaunchIcon className="w-8 h-8" />,
    title: "Reach More Attendees",
    description: "Our AI-powered platform helps you connect with the right audience",
    stats: "2.5x more attendees",
  },
  {
    icon: <BellAlertIcon className="w-8 h-8" />,
    title: "Smart Notifications",
    description: "Automated reminders and personalized communication with attendees",
    stats: "85% open rate",
  },
  {
    icon: <SparklesIcon className="w-8 h-8" />,
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
      <section className="min-h-[80vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              Grow Your Event Business
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-12">
              Join our platform and leverage AI to create, manage, and grow successful events
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/publisher/signup">
                <Button color="primary" size="lg" className="text-lg px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="bordered" size="lg" className="text-lg px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Publishers</h2>
            <p className="text-xl text-foreground/60">
              Everything you need to create and manage successful events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-lg border border-foreground/10">
                <CardBody className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-foreground/60">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-gradient-to-br from-background to-background/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-foreground/60">
              Join thousands of successful event organizers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-lg border border-foreground/10">
                <CardBody className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-foreground/60 mb-4">{benefit.description}</p>
                  <p className="text-primary font-medium">{benefit.stats}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary/20 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Event Business?</h2>
            <p className="text-xl text-foreground/60 mb-12">
              Join our platform today and start creating amazing events with AI-powered tools
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/publisher/signup">
                <Button color="primary" size="lg" className="text-lg px-8">
                  Start Publishing
                </Button>
              </Link>
              <Link href="/publisher/login">
                <Button variant="bordered" size="lg" className="text-lg px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/95 border-t border-divider/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-foreground/80 hover:text-primary">About Us</Link></li>
                <li><Link href="/careers" className="text-foreground/80 hover:text-primary">Careers</Link></li>
                <li><Link href="/contact" className="text-foreground/80 hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-foreground/80 hover:text-primary">Blog</Link></li>
                <li><Link href="/help" className="text-foreground/80 hover:text-primary">Help Center</Link></li>
                <li><Link href="/guides" className="text-foreground/80 hover:text-primary">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-foreground/80 hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-foreground/80 hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-foreground/80 hover:text-primary">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Button isIconOnly variant="light" aria-label="Twitter">
                  <TwitterIcon className="text-foreground/80" />
                </Button>
                <Button isIconOnly variant="light" aria-label="Facebook">
                  <FacebookIcon className="text-foreground/80" />
                </Button>
                <Button isIconOnly variant="light" aria-label="Instagram">
                  <InstagramIcon className="text-foreground/80" />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-divider/50 text-center text-foreground/60">
            <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 