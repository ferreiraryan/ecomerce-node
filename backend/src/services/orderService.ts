import prisma from '../config/prisma';

interface CartItemDTO {
  productId: string;
  quantity: number;
}

interface CreateOrderDTO {
  userId: string;
  items: CartItemDTO[];
  shippingAddress: string;
}

export const createOrderService = async ({ userId, items, shippingAddress }: CreateOrderDTO) => {
  return prisma.$transaction(async (tx) => {
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });

      if (!product) {
        throw new Error(`Produto com ID ${item.productId} não encontrado.`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Produto ${product.name} sem estoque suficiente (Restam: ${product.stock}).`);
      }

      total += product.price * item.quantity;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        total,
        shippingAddress,
        status: 'PAID', // Simulação
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: { product: true }
        }
      },
    });

    return order;
  });
};

export const getUserOrdersService = (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getOrderByIdService = async (userId: string, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return null;

  if (order.userId !== userId) {
    throw new Error('Acesso negado.');
  }

  return order;
};
