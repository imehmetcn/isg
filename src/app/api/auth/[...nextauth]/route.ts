import { NextRequest } from "next/server"
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

export const runtime = "nodejs"

const auth = NextAuth(authOptions)

export async function GET(request: NextRequest) {
  return auth(request)
}

export async function POST(request: NextRequest) {
  return auth(request)
}
