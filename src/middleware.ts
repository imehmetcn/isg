import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Public sayfaları middleware'den muaf tut
export default function middleware(req) {
  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/forgot-password"];
  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Diğer tüm sayfalar için auth kontrolü
  const authMiddleware = withAuth(
    function auth(req) {
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
        authorized: ({ token }) => !!token,
      },
      pages: {
        signIn: "/login",
      },
    }
  );

  return authMiddleware(req);
}

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