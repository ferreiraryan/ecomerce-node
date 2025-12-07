import { Category } from '@prisma/client';
import prisma from '../config/prisma';
type CreateCategoryDTO = Omit<Category, 'id' | 'createdAt'>;


export const getAllCategoriesService = () => {
  return prisma.category.findMany();
};

export const createCategoryService = (data: CreateCategoryDTO) => {
  return prisma.category.create({ data });
};

export const deleteCategoryService = (id: string) => {
  return prisma.category.delete({ where: { id } });
};
