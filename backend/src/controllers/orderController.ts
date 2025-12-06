import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { updateOrderStatusService } from '../services/orderService';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const createOrder = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;
  const { items, shippingAddress } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Carrinho vazio.' });
  }

  if (!shippingAddress) {
    return res.status(400).json({ error: 'Endereço de entrega é obrigatório.' });
  }

  try {
    const order = await orderService.createOrderService({
      userId,
      items,
      shippingAddress
    });

    return res.status(201).json(order);

  } catch (error: any) {
    if (error.message.includes('estoque') || error.message.includes('encontrado')) {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao processar pedido.' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  try {
    const orders = await orderService.getUserOrdersService(userId);
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;
  const orderId = req.params.id;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  try {
    const order = await orderService.getOrderByIdService(userId, orderId);

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    return res.status(200).json(order);
  } catch (error: any) {
    if (error.message === 'Acesso negado.') {
      return res.status(403).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar o pedido.' });
  }
};

export const getAllOrdersAdmin = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrdersAdminService();

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar pedidos.' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await updateOrderStatusService(id, status);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar status.' });
  }
};
