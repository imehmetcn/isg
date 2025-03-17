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
      // URL'i decode et
      const decodedUrl = decodeURIComponent(url);
      
      // Callback URL'i kontrol et
      if (decodedUrl.includes('callbackUrl')) {
        const callbackUrl = new URL(decodedUrl).searchParams.get('callbackUrl');
        if (callbackUrl) {
          // Eğer callback URL bir path ise
          if (callbackUrl.startsWith('/')) {
            return `${baseUrl}${callbackUrl}`;
          }
        }
      }

      // Eğer URL aynı origin'den geliyorsa
      if (decodedUrl.startsWith(baseUrl)) {
        return decodedUrl;
      }

      // Eğer URL bir path ise
      if (decodedUrl.startsWith('/')) {
        return `${baseUrl}${decodedUrl}`;
      }

      // Varsayılan olarak dashboard'a yönlendir
      return `${baseUrl}/dashboard`;
    },
  },
  debug: process.env.NODE_ENV === 'development',
} 