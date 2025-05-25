"use client";

import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth" || pathname === "/login" || pathname === "/signup";

  return (
    <div className="relative flex flex-col min-h-screen">
      <NavbarComponent />
      <main className={`container mx-auto max-w-7xl ${isAuthPage ? "" : "pt-16"} px-6 flex-grow`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
} 