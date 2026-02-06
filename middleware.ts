import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const userCookie = request.cookies.get("user")?.value;
  let user: any = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch {
      user = null;
    }
  }

  const protectedRoutes = ["/admin", "/seller", "/customer"];
  const authRoutes = ["/login", "/register"];

  const isProtected = protectedRoutes.some(r => pathname.startsWith(r));
  const isAuth = authRoutes.includes(pathname);

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuth && user?.role) {
    return NextResponse.redirect(
      new URL(`/${user.role}`, request.url)
    );
  }

  if (pathname.startsWith("/admin") && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/seller") && user?.role !== "seller") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/customer") && user?.role !== "customer") {
    return NextResponse.redirect(new URL("/", request.url));
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
