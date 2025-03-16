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

          // Kullanıcıyı bul
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
              // deletedAt: null, // Sadece silinmemiş kullanıcılar - Henüz oluşturulmadı
            },
            // include: { // Henüz oluşturulmadı
            //   companies: {
            //     include: {
            //       company: {
            //         select: {
            //           id: true,
            //           name: true,
            //         }
            //       }
            //     }
            //   }
            // }
          });

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

          if (!user.email) {
            console.log("User email is null");
            return null;
          }

          // Son giriş zamanını güncelle - Henüz oluşturulmadı
          // await db.user.update({
          //   where: { id: user.id },
          //   data: { lastLoginAt: new Date() }
          // });

          // Aktivite günlüğüne kaydet - Henüz oluşturulmadı
          // try {
          //   await db.activityLog.create({
          //     data: {
          //       action: ActionType.LOGIN,
          //       description: "Kullanıcı giriş yaptı",
          //       userId: user.id,
          //       companyId: user.companyId,
          //       ipAddress: req.headers?.["x-forwarded-for"] as string || "127.0.0.1",
          //       userAgent: req.headers?.["user-agent"] as string || "",
          //     }
          //   });
          // } catch (logError) {
          //   console.error("Failed to log activity:", logError);
          //   // Loglama hatası oturum açmayı engellememelidir
          // }

          // Geriye dönük uyumluluk için
          return {
            id: user.id,
            email: user.email,
            name: user.name || "User",
            role: user.role,
            companyId: user.companyId,
            // Çoklu şirket desteği - Henüz oluşturulmadı
            // companies: user.companies?.map(cu => ({
            //   id: cu.company.id,
            //   name: cu.company.name,
            //   role: cu.role
            // })) || [],
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
        token.companyId = user.companyId;
        // Çoklu şirket desteği - Henüz oluşturulmadı
        // token.companies = user.companies;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.companyId = token.companyId as string | null;
        // Çoklu şirket desteği - Henüz oluşturulmadı
        // session.user.companies = token.companies as Array<{id: string, name: string, role: Role}>;
      }
      return session;
    },
  },
  debug: true, // Hata ayıklama için logları açıyoruz
} 