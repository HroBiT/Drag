import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  
  // Ścieżki wymagające autoryzacji
  const protectedPaths = ['/tables'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Sprawdź czy userId w URL odpowiada zalogowanemu użytkownikowi
  const userIdMatch = request.nextUrl.pathname.match(/\/tables\/(\d+)/);
  if (userIdMatch && session) {
    try {
      const sessionData = JSON.parse(session);
      const urlUserId = parseInt(userIdMatch[1]);
      
      if (sessionData.userId !== urlUserId) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tables/:path*']
};