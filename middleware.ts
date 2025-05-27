import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

// Add paths that require authentication
const protectedPaths = ["/dashboard", "/events/create", "/events/edit", "/bookings", "/profile"];

// Add paths that require publisher role
const publisherPaths = ["/publisher/dashboard", "/publisher/events", "/publisher/analytics"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isPublisherPath = publisherPaths.some((path) => pathname.startsWith(path));

  // For protected paths, we'll let the client-side handle the auth check
  if (isProtectedPath) {
    return NextResponse.next();
  }

  // For publisher paths, we'll let the client-side handle the role check
  if (isPublisherPath) {
    const user = request.cookies.get("user")?.value;

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const userData = JSON.parse(user);

      if (userData.role !== "publisher") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    "/profile/:path*",
    "/publisher/:path*",
  ],
};
