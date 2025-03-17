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
    companyId: string | null;
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
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email ve şifre gerekli");
          }

          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            }
          });

          if (!user || !user.password) {
            throw new Error("Kullanıcı bulunamadı");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Geçersiz şifre");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
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
      // Eğer URL aynı origin'den geliyorsa, olduğu gibi kullan
      if (url.startsWith(baseUrl)) return url;
      // Eğer URL bir path ise (/ ile başlıyorsa), baseUrl ile birleştir
      else if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Diğer durumda dashboard'a yönlendir
      return `${baseUrl}/dashboard`;
    },
  },
  debug: process.env.NODE_ENV === 'development',
} 