import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Görev listesi
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Görev listesi getirme hatası:', error)
    return NextResponse.json(
      { error: 'Görevler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni görev oluşturma
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const data = await req.json()

    // Validasyon
    if (!data.title || !data.description || !data.type || !data.priority || !data.dueDate || !data.assignedTo) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const task = await prisma.task.create({
      data: {
        ...data,
        createdBy: session.user?.email || 'unknown',
        dueDate: new Date(data.dueDate)
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Görev oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Görev oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
} 