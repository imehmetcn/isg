import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

// ActionType enum'u henüz Prisma Client'ta oluşturulmadığı için string olarak tanımlıyoruz
const ActionType = {
  VIEW_DOCUMENT: "VIEW_DOCUMENT",
  CREATE_DOCUMENT: "CREATE_DOCUMENT",
  UPDATE_DOCUMENT: "UPDATE_DOCUMENT",
  DELETE_DOCUMENT: "DELETE_DOCUMENT",
} as const;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    });

    if (!userWithCompanies?.companies || userWithCompanies.companies.length === 0) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    // Kullanıcının bağlı olduğu şirketlerin ID'lerini al
    const companyIds = userWithCompanies.companies.map(cu => cu.companyId);

    // Kullanıcının şirketlerine ait belgeleri getir
    const documents = await db.document.findMany({
      where: { 
        companyId: { in: companyIds },
        deletedAt: null // Silinmemiş belgeler
      },
      include: {
        versions: {
          orderBy: {
            versionNumber: 'desc'
          },
          take: 1
        }
      },
      orderBy: { createdAt: "desc" },
    });

    // Aktivite günlüğüne kaydet
    await db.activityLog.create({
      data: {
        action: ActionType.VIEW_DOCUMENT,
        description: "Belge listesi görüntülendi",
        userId: session.user.id,
        companyId: companyIds[0], // İlk şirket ID'sini kullan
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    });

    if (!userWithCompanies?.companies || userWithCompanies.companies.length === 0) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    // İlk şirketi kullan (varsayılan olarak)
    const companyId = userWithCompanies.companies[0].companyId;

    const { title, description, fileUrl, fileSize, mimeType, tags } = await request.json();

    if (!title || !fileUrl) {
      return NextResponse.json(
        { error: "Title and fileUrl are required" },
        { status: 400 }
      );
    }

    // Belgeyi oluştur
    const document = await db.document.create({
      data: {
        title,
        description,
        fileUrl,
        fileSize,
        mimeType,
        tags: tags || [],
        userId: session.user.id,
        companyId,
      },
    });

    // İlk versiyon oluştur
    await db.documentVersion.create({
      data: {
        versionNumber: 1,
        fileUrl,
        fileSize,
        changeNote: "İlk versiyon",
        documentId: document.id,
        userId: session.user.id,
        companyId,
      },
    });

    // Aktivite günlüğüne kaydet
    await db.activityLog.create({
      data: {
        action: ActionType.CREATE_DOCUMENT,
        description: `"${title}" başlıklı belge oluşturuldu`,
        userId: session.user.id,
        companyId,
        metadata: { documentId: document.id },
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Belgeleri toplu silme (soft delete)
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { documentIds } = await request.json();

    if (!documentIds || !Array.isArray(documentIds) || documentIds.length === 0) {
      return NextResponse.json(
        { error: "Valid document IDs are required" },
        { status: 400 }
      );
    }

    // Kullanıcının şirketlerini bul
    const userWithCompanies = await db.user.findUnique({
      where: { id: session.user.id },
      include: { 
        companies: {
          include: {
            company: true
          }
        }
      },
    });

    if (!userWithCompanies?.companies || userWithCompanies.companies.length === 0) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    // Kullanıcının bağlı olduğu şirketlerin ID'lerini al
    const companyIds = userWithCompanies.companies.map(cu => cu.companyId);

    // Belgeleri soft delete ile güncelle
    const now = new Date();
    const result = await db.document.updateMany({
      where: {
        id: { in: documentIds },
        companyId: { in: companyIds }, // Sadece kullanıcının şirketlerine ait belgeleri sil
      },
      data: {
        deletedAt: now,
      },
    });

    // Aktivite günlüğüne kaydet
    await db.activityLog.create({
      data: {
        action: ActionType.DELETE_DOCUMENT,
        description: `${result.count} belge silindi`,
        userId: session.user.id,
        companyId: companyIds[0], // İlk şirket ID'sini kullan
        metadata: { documentIds },
      },
    });

    return NextResponse.json({ 
      success: true,
      count: result.count
    });
  } catch (error) {
    console.error("Error deleting documents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 