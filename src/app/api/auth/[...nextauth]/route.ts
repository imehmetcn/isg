import { type NextRequest } from "next/server"
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const handler = NextAuth(authOptions)

export const GET = (request: NextRequest) => handler(request)
export const POST = (request: NextRequest) => handler(request)
