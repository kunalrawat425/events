import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

// Add paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/events/create",
  "/events/edit",
  "/bookings",
  "/profile",
];

// Add paths that require publisher role
const publisherPaths = [
  "/publisher/dashboard",
  "/publisher/events",
  "/publisher/analytics",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isPublisherPath = publisherPaths.some((path) =>
    pathname.startsWith(path),
  );

  // Redirect to login if accessing protected path without token
  if (isProtectedPath && !token) {
    const url = new URL("/auth", request.url);

    url.searchParams.set("redirect", pathname);

    return NextResponse.redirect(url);
  }

  // Redirect to home if accessing publisher path without publisher role
  if (isPublisherPath && userRole !== "publisher") {
    return NextResponse.redirect(new URL("/", request.url));
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
  ],
};
