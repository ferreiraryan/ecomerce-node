import { Request, Response } from 'express';
import * as productService from '../services/productService';


export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProductService(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto.' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos.' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto.' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProductService(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProductService(req.params.id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto.' });
  }
};
