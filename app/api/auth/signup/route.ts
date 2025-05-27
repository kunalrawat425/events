import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // TODO: Implement actual signup logic with your backend
    // This is a placeholder that should be replaced with your actual signup logic
    if (name && email && password) {
      // Mock successful signup
      return NextResponse.json({
        id: "1",
        name: name,
        email: email,
      });
    }

    return NextResponse.json({ message: "Invalid signup data" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
