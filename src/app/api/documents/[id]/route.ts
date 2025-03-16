import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"

// ActionType enum'u string olarak tanımlıyoruz
const ActionType = {
  DELETE_DOCUMENT: "DELETE_DOCUMENT",
} as const;

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Kullanıcının şirketlerini bul
    const userWithCompanies = await db.user.findUnique({
      where: { 
        id: session.user.id,
        deletedAt: null // Silinmemiş kullanıcılar
      },
      include: { 
        companies: {
          include: {
            company: true
          }
        }
      },
    })

    if (!userWithCompanies?.companies || userWithCompanies.companies.length === 0) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      )
    }

    // Kullanıcının bağlı olduğu şirketlerin ID'lerini al
    const companyIds = userWithCompanies.companies.map(cu => cu.companyId)

    const document = await db.document.findUnique({
      where: { id: params.id },
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Kullanıcının belgeyi silme yetkisi var mı kontrol et
    if (!companyIds.includes(document.companyId)) {
      return NextResponse.json(
        { error: "You don't have permission to delete this document" },
        { status: 403 }
      )
    }

    // Soft delete kullan
    const now = new Date()
    await db.document.update({
      where: { id: params.id },
      data: { deletedAt: now },
    })

    // Aktivite günlüğüne kaydet
    await db.activityLog.create({
      data: {
        action: ActionType.DELETE_DOCUMENT,
        description: `"${document.title}" başlıklı belge silindi`,
        userId: session.user.id,
        companyId: document.companyId,
        metadata: { documentId: document.id },
      },
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