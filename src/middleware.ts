import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Public paths that don't require authentication
    const publicPaths = ["/login", "/register", "/forgot-password"];
    
    // Eğer public path'te isek ve kullanıcı giriş yapmışsa
    if (publicPaths.includes(req.nextUrl.pathname) && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Eğer public path'te isek ve kullanıcı giriş yapmamışsa
    if (publicPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // Kullanıcı giriş yapmamışsa ve korumalı bir sayfaya erişmeye çalışıyorsa
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Ana sayfa kontrolü - her zaman dashboard'a yönlendir
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

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