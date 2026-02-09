import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip internal Next.js files and static assets
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api") ||
    pathname.includes(".") // skips images/favicon
  ) {
    return NextResponse.next();
  }

  const userCookie = request.cookies.get("user")?.value;
  let user: any = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (e) {
      console.error("Middleware: Cookie parse error", e);
      user = null;
    }
  }

  const protectedRoutes = ["/admin", "/seller", "/customer"];
  const authRoutes = ["/login", "/register"];

  const isProtected = protectedRoutes.some(r => pathname.startsWith(r));
  const isAuth = authRoutes.includes(pathname);

  // 2. Fix: Use absolute URLs for redirects
  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Fix: Check if user and user.role exist before redirecting
  if (isAuth && user && user.role) {
    const roleBase = `/${user.role}`;
    // Prevent redirecting if already on the correct role page
    if (!pathname.startsWith(roleBase)) {
      return NextResponse.redirect(new URL(roleBase, request.url));
    }
  }

  // 4. Role-based protection
  if (user) {
    if (pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/seller") && user.role !== "seller") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/customer") && user.role !== "customer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*",
    "/customer/:path*",
    "/login",
    "/register",
  ],
};