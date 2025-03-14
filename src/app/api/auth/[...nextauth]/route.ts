import NextAuth from "next-auth"
import { config } from "@/lib/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const handler = NextAuth(config)

export const GET = async (req: Request) => {
  return handler(req)
}

export const POST = async (req: Request) => {
  return handler(req)
}
