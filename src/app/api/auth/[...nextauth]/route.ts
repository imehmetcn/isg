import NextAuth from "next-auth"
import { config } from "@/lib/auth"

export const runtime = "nodejs"

const handler = NextAuth(config)

export const GET = handler
export const POST = handler
