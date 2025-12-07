import { Request, Response } from 'express';
import * as categorieService from '../services/categoryService';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const category = await categorieService.getAllCategoriesService()

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar categorias.' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categorieService.createCategoryService(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar categoria.' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await categorieService.deleteCategoryService(req.params.id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar categoria.' });
  }
};

