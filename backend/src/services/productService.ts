import prisma from '../config/prisma';
import { Product } from '@prisma/client';

type CreateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateProductDTO = Partial<CreateProductDTO>;

export const createProductService = (data: CreateProductDTO) => {
  return prisma.product.create({ data });
};

export const getAllProductsService = () => {
  return prisma.product.findMany();
};

export const getProductByIdService = (id: string) => {
  return prisma.product.findUnique({ where: { id } });
};

export const updateProductService = (id: string, data: UpdateProductDTO) => {
  return prisma.product.update({ where: { id }, data });
};

export const deleteProductService = (id: string) => {
  return prisma.product.delete({ where: { id } });
};
