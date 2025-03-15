import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  
  // Admin sayfalarına erişim kontrolü
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token.role !== "ADMIN") {
      // Kullanıcı admin değilse ana sayfaya yönlendir
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Login sayfasına erişim kontrolü
  if (request.nextUrl.pathname === "/login" && token) {
    // Kullanıcı zaten giriş yapmışsa
    if (token.role === "ADMIN") {
      // Admin ise admin paneline yönlendir
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Normal kullanıcı ise ana sayfaya yönlendir
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}; 