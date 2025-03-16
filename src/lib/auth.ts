import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"
import { RequestInternal } from "next-auth"

// ActionType enum'u henüz Prisma Client'ta oluşturulmadığı için string olarak tanımlıyoruz
const ActionType = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
} as const;

// User tipini tanımlayalım
type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  companyId: string | null;
  companies: Array<{id: string, name: string, role: Role}>;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
      async authorize(credentials, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          console.log("Looking for user with email:", credentials.email);

          // Kullanıcıyı basit sorgu ile bul
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            }
          });

          console.log("User found:", user ? "yes" : "no");

          if (!user || !user.password) {
            console.log("User not found or no password");
            return null;
          }

          console.log("Found user:", { email: user.email, role: user.role });

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            return null;
          }

          // Basitleştirilmiş yaklaşım - şirket ilişkilerini daha sonra yükleyeceğiz
          return {
            id: user.id,
            email: user.email || "",
            name: user.name || "User",
            role: user.role,
            companyId: null, // Şimdilik null olarak ayarlıyoruz
            companies: [], // Boş dizi olarak başlatıyoruz
          } as User;
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
        token.companyId = user.companyId;
        token.companies = user.companies;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.companyId = token.companyId as string | null;
        session.user.companies = token.companies as Array<{id: string, name: string, role: Role}> || [];
      }
      return session;
    },
  },
  debug: true, // Hata ayıklama için logları açıyoruz
} 