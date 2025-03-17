import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash('Admin123!', 10)
  
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@isg.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin kullanıcısı oluşturuldu:', admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 