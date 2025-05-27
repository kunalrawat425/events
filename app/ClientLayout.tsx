"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/app/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth" || pathname === "/login" || pathname === "/signup";
  const isLandingPage = pathname === "/";

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main
        className={`${
          isLandingPage ? "pt-16" : isAuthPage ? "" : "container mx-auto max-w-7xl pt-16"
        } flex-grow`}
      >
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
