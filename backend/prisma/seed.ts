import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o script de seed...');

  const adminEmail = 'admin@ecommerce.com';
  const adminPassword = 'adminpassword123';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  await prisma.product.createMany({
    data: [
      {
        name: 'Notebook Pro',
        description: 'Um notebook potente para todas as suas necessidades.',
        price: 7500.00,
        imageUrl: 'https://placehold.co/600x400/EEE/31343C?text=Notebook',
      },
      {
        name: 'Smartphone X1',
        description: 'Câmera de alta resolução e bateria de longa duração.',
        price: 3200.50,
        imageUrl: 'https://placehold.co/600x400/EEE/31343C?text=Smartphone',
      },
      {
        name: 'Fone de Ouvido Sem Fio',
        description: 'Cancelamento de ruído e som imersivo.',
        price: 899.90,
        imageUrl: 'https://placehold.co/600x400/EEE/31343C?text=Fone',
      },
    ],
  });

  console.log('Seed concluído com sucesso!');
  console.log(`Usuário Admin criado/verificado: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
