import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategoriesService();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar categorias.' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nome é obrigatório.' });
  }

  try {
    const category = await categoryService.createCategoryService(name);
    return res.status(201).json(category);
  } catch (error: any) {
    if (error.message === 'Categoria já existe.') {
      return res.status(409).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar categoria.' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await categoryService.deleteCategoryService(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error.message.includes('produtos')) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: 'Erro ao deletar categoria.' });
  }
};

