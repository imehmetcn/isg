import { Role } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: Role
    companyId: string | null
  }

  interface Session {
    user: User & {
      id: string
      role: Role
      companyId: string | null
    }
  }
} 