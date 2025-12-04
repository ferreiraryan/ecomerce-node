import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { items, shippingAddress } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Carrinho vazio.' });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      let total = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });

        if (!product) {
          throw new Error(`Produto ${item.productId} não encontrado.`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Produto ${product.name} sem estoque suficiente.`);
        }

        total += product.price * item.quantity;

        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price
        });

        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      const order = await tx.order.create({
        data: {
          userId,
          total,
          shippingAddress: shippingAddress || "Endereço padrão",
          status: 'PAID',
          items: {
            create: orderItemsData
          }
        },
        include: {
          items: true
        }
      });

      return order;
    });

    return res.status(201).json(result);

  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Erro ao processar pedido.' });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos.' });
  }
};
