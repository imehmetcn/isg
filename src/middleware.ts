import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Mevcut yanıtı al veya yeni bir yanıt oluştur
    const response = NextResponse.next();
    
    // Pathname'i header'a ekle
    response.headers.set('x-pathname', req.nextUrl.pathname);

    // Auth ile ilgili sayfaları kontrol etme
    const publicPaths = ["/login", "/register", "/forgot-password"];
    if (publicPaths.includes(req.nextUrl.pathname)) {
      return response;
    }

    // Admin sayfaları kontrolü
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return response;
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