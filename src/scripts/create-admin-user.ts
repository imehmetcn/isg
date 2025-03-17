import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // Önce eski kullanıcıyı silelim
    await prisma.user.deleteMany({
      where: {
        email: 'admin@isg.com'
      }
    })

    // Yeni şifre: 123456
    const hashedPassword = await bcrypt.hash('123456', 10)
    
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@isg.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    })

    console.log('Admin kullanıcısı başarıyla oluşturuldu:', admin)
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 