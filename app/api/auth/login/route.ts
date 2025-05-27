import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role = "user" } = body;

    // TODO: Replace with actual authentication logic
    // This is a mock implementation
    if (email === "test@example.com" && password === "password") {
      return NextResponse.json({
        user: {
          id: "1",
          name: "Test User",
          email: email,
          role: role,
        },
        token: "mock-jwt-token",
      });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
