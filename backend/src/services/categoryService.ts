import prisma from '../config/prisma';

export const getAllCategoriesService = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
};

export const createCategoryService = async (name: string) => {
  const slug = name.toLowerCase().trim().replace(/\s+/g, '-');

  const existing = await prisma.category.findUnique({ where: { slug } });

  if (existing) {
    throw new Error('Categoria já existe.');
  }

  return prisma.category.create({
    data: { name, slug }
  });
};

export const deleteCategoryService = async (id: string) => {
  /*
  const category = await prisma.category.findUnique({ 
    where: { id },
    include: { _count: { select: { products: true } } }
  });
  
  if (category && category._count.products > 0) {
    throw new Error('Não é possível deletar categorias com produtos.');
  }
  */

  return prisma.category.delete({ where: { id } });
};
