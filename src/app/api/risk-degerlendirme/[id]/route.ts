import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyId = session.user.companyId;
    if (!companyId) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const riskDegerlendirme = await prisma.riskDegerlendirme.findFirst({
      where: {
        id: params.id,
        companyId: companyId,
      },
      include: {
        riskler: true,
      },
    });

    if (!riskDegerlendirme) {
      return NextResponse.json(
        { error: "Risk değerlendirme bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(riskDegerlendirme);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyId = session.user.companyId;
    if (!companyId) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const riskDegerlendirme = await prisma.riskDegerlendirme.findFirst({
      where: {
        id: params.id,
        companyId: companyId,
      },
    });

    if (!riskDegerlendirme) {
      return NextResponse.json(
        { error: "Risk değerlendirme bulunamadı" },
        { status: 404 }
      );
    }

    await prisma.riskDegerlendirme.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Risk değerlendirme silindi" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 