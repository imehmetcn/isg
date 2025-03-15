import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const document = await db.document.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!document) {
      return new NextResponse("Document not found", { status: 404 })
    }

    if (document.companyId !== session.user.companyId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await db.document.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[DOCUMENT_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 