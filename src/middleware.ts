import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Public paths that don't require authentication
    const publicPaths = ["/login", "/register", "/forgot-password"];
    if (publicPaths.includes(req.nextUrl.pathname)) {
      // Eğer kullanıcı giriş yapmışsa ve login sayfasına erişmeye çalışıyorsa
      if (req.nextauth.token && req.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // Ana sayfa kontrolü - token yoksa login'e yönlendir
    if (req.nextUrl.pathname === "/" && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Kullanıcı giriş yapmışsa ana sayfayı dashboard'a yönlendir
    if (req.nextUrl.pathname === "/" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Admin sayfaları kontrolü
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth?.token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public paths kontrolü
        const publicPaths = ["/login", "/register", "/forgot-password"];
        if (publicPaths.includes(req.nextUrl.pathname)) {
          return true;
        }
        
        // Token varsa erişime izin ver
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