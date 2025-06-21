import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email i hasło są wymagane' },
        { status: 400 }
      );
    }

    // Znajdź użytkownika
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Nieprawidłowe dane logowania' },
        { status: 401 }
      );
    }

    // Sprawdź hasło (tymczasowo bez hashowania)
    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Nieprawidłowe dane logowania' },
        { status: 401 }
      );
    }

    // Wygeneruj prosty token
    const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      message: 'Zalogowano pomyślnie',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}