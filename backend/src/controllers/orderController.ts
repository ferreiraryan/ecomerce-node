import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as orderService from '../services/orderService';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'O carrinho não pode estar vazio.' });
    }

    const order = await orderService.createOrderService(userId, items);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erro ao criar pedido.' });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const orders = await orderService.getOrdersByUserService(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos.' });
  }
};
