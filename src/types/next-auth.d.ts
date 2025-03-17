import { Role } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: Role
    companyId?: string | null
    companies?: Array<{id: string, name: string, role: Role}>
  }

  interface Session {
    user: User & {
      id: string
      role: Role
      companyId?: string | null
      companies?: Array<{id: string, name: string, role: Role}>
    }
  }
} 