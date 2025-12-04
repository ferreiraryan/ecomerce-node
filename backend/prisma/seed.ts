import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o script de seed...');

  console.log('🧹 Limpando banco de dados...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const adminEmail = 'admin@ecommerce.com';
  const adminPassword = 'adminpassword123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin Master',
      email: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log(`👤 Admin garantido: ${admin.email}`);

  // 3. Criar Categorias
  console.log('📦 Criando categorias...');

  const catEletronicos = await prisma.category.create({
    data: { name: 'Eletrônicos', slug: 'eletronicos' },
  });

  const catModa = await prisma.category.create({
    data: { name: 'Moda', slug: 'moda' },
  });

  const catSetup = await prisma.category.create({
    data: { name: 'Setup Gamer', slug: 'setup-gamer' },
  });

  console.log('🛒 Criando produtos...');

  await prisma.product.createMany({
    data: [
      {
        name: 'MacBook Pro M2',
        description: 'Potência absurda para profissionais. Chip M2 Pro, 16GB RAM, SSD 512GB.',
        price: 12500.00,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stock: 10,
        categoryId: catEletronicos.id,
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Titânio. Tão robusto. Tão leve. Tão Pro.',
        price: 8200.50,
        imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stock: 25,
        categoryId: catEletronicos.id,
      },
      {
        name: 'Fone Sony WH-1000XM5',
        description: 'O melhor cancelamento de ruído do mercado com som cristalino.',
        price: 2100.00,
        imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stock: 15,
        categoryId: catEletronicos.id,
      },

      {
        name: 'Teclado Mecânico RGB',
        description: 'Switches Blue, iluminação RGB customizável e layout compacto.',
        price: 450.00,
        imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stock: 50,
        categoryId: catSetup.id,
      },
      {
        name: 'Monitor Ultrawide 34"',
        description: 'Imersão total para seus jogos e produtividade em 144Hz.',
        price: 2800.00,
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stock: 5,
        categoryId: catSetup.id,
      },

      {
        name: 'Camiseta Dev Minimalista',
        description: '100% Algodão, perfeita para codar com conforto.',
        price: 89.90,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stock: 100,
        categoryId: catModa.id,
      },
      {
        name: 'Mochila Tech Impermeável',
        description: 'Proteja seu notebook e gadgets com estilo e segurança.',
        price: 350.00,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stock: 20,
        categoryId: catModa.id,
      },
    ],
  });

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
