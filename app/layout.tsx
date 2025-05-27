import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import ClientLayout from "./ClientLayout";

import { fontSans } from "@/config/fonts";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventHub - Discover and Create Events",
  description: "Your platform for discovering and creating amazing events",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="light" lang="en">
      <head />
      <body
        className={`min-h-screen bg-background font-sans text-foreground antialiased ${fontSans.variable} ${inter.className}`}
      >
        <UserProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
