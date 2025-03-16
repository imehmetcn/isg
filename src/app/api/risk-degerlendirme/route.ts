import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
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

    const riskDegerlendirmeleri = await prisma.riskDegerlendirme.findMany({
      where: {
        companyId: companyId,
      },
      include: {
        riskler: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(riskDegerlendirmeleri);
  } catch (error) {
    console.error("Error:", error);
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

    const companyId = session.user.companyId;
    if (!companyId) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const data = await request.json();
    const { baslik, tarih, aciklama, riskler } = data;

    const riskDegerlendirme = await prisma.riskDegerlendirme.create({
      data: {
        baslik,
        tarih: new Date(tarih),
        aciklama,
        companyId,
        userId: session.user.id,
        riskler: {
          create: riskler.map((risk: any) => ({
            tehlike: risk.tehlike,
            risk: risk.risk,
            onlem: risk.onlem,
            seviye: risk.seviye,
          })),
        },
      },
      include: {
        riskler: true,
      },
    });

    return NextResponse.json(riskDegerlendirme);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 