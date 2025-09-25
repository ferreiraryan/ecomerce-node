import { PrismaClient } from '@prisma/client';

// Força o Prisma a usar a variável de ambiente `DATABASE_URL`
// que é injetada pelo Docker Compose no container,
// ignorando o arquivo .env local que é usado apenas para migrations.
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default prisma;
