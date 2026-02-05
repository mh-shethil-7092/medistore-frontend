import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the token or user from cookies (localStorage doesn't work in middleware)
  const userCookie = request.cookies.get('user')?.value;
  const { pathname } = request.nextUrl;

  // 2. Define protected routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/seller') || pathname.startsWith('/customer')) {
    if (!userCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Optional: Check specific roles if you store role in the cookie
    const user = JSON.parse(userCookie);
    if (pathname.startsWith('/admin') && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/customer/:path*'],
};