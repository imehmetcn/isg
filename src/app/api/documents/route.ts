import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const documents = await db.document.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { companyId: session.user.companyId },
        ],
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("[DOCUMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, filePath, fileSize, fileType } = body;

    if (!title || !category || !filePath || !fileSize || !fileType) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const document = await db.document.create({
      data: {
        title,
        description,
        category,
        filePath,
        fileSize,
        fileType,
        userId: session.user.id,
        companyId: session.user.companyId,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("[DOCUMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 