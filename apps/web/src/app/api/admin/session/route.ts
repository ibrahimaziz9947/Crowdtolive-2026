import { NextResponse } from "next/server";
import { getAdminAuthCookieName } from "@/features/admin/lib/admin-cookie";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    accessToken?: string;
  };

  if (!body.accessToken) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing access token.",
      },
      { status: 400 },
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set(getAdminAuthCookieName(), body.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.delete(getAdminAuthCookieName());

  return response;
}
