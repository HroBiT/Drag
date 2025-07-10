import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email i hasło są wymagane" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Nieprawidłowe dane logowania" },
        { status: 401 }
      );
    }

    // Ustaw sesję jako JSON string
    const cookieStore = await cookies();
    const sessionData = JSON.stringify({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    cookieStore.set("session", sessionData, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 godziny
      secure: process.env.NODE_ENV === "production",
    });

    const token = Buffer.from(
      `${user.id}:${user.email}:${Date.now()}`
    ).toString("base64");

    return NextResponse.json({
      message: "Zalogowano pomyślnie",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera" },
      { status: 500 }
    );
  }
}
