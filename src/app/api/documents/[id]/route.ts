import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: { company: true },
    })

    if (!user?.companyId) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      )
    }

    const document = await db.document.findUnique({
      where: { id: params.id },
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    if (document.companyId !== user.companyId) {
      return NextResponse.json(
        { error: "You don't have permission to delete this document" },
        { status: 403 }
      )
    }

    await db.document.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Document deleted successfully" })
  } catch (error) {
    console.error("Error deleting document:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 