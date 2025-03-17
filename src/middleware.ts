import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Public paths that don't require authentication
    const publicPaths = ["/login", "/register", "/forgot-password"];
    if (publicPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // Admin sayfaları kontrolü
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth?.token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Eğer token yoksa ve login sayfasında değilsek, otomatik giriş yap
        if (!token && !req.nextUrl.pathname.includes('/login')) {
          return true;
        }
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