const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Önce bir şirket oluşturalım
    const company = await prisma.company.create({
      data: {
        name: 'Demo Şirket',
        address: 'İstanbul, Türkiye',
        phoneNumber: '+90 555 123 4567',
        taxNumber: '1234567890',
        website: 'www.demosirket.com'
      }
    });
    
    console.log('Şirket oluşturuldu:', company);
    
    // Admin kullanıcısını bulalım
    const adminUser = await prisma.user.findUnique({
      where: {
        email: 'admin@example.com'
      }
    });
    
    if (!adminUser) {
      console.error('Admin kullanıcısı bulunamadı!');
      return;
    }
    
    // Kullanıcıyı şirkete atayalım
    const companyUser = await prisma.companyUser.create({
      data: {
        userId: adminUser.id,
        companyId: company.id,
        role: 'ADMIN'
      }
    });
    
    console.log('Kullanıcı şirkete atandı:', companyUser);
    
  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 