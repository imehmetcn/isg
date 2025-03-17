import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db"
import bcrypt from "bcryptjs"
import { RequestInternal } from "next-auth"
import { Role } from "@prisma/client"

// User tipini next-auth'un beklediği şekilde genişletelim
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    companyId?: string | null; // Opsiyonel olarak işaretlendi
  }

  interface Session {
    user: User & {
      id: string;
      role: Role;
    };
  }
}

// JWT için tip tanımlaması
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  pages: {
    signIn: "/dashboard", // Login sayfası yerine doğrudan dashboard'a yönlendir
    signOut: "/dashboard",
    error: "/dashboard",
    verifyRequest: "/dashboard",
    newUser: "/dashboard"
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Her durumda otomatik giriş yap
        return {
          id: "guest",
          email: "guest@example.com",
          name: "Misafir Kullanıcı",
          role: "VIEWER" as Role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Her durumda dashboard'a yönlendir
      return `${baseUrl}/dashboard`;
    },
  },
  debug: process.env.NODE_ENV === 'development',
} 